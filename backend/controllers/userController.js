const {
  genarateToken,
} = require("../config/jwtToken.js");
const {
  genarateRefreshToken,
} = require("../config/refreshToken.js");
const userModel = require("../models/userModel.js");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cartModel = require("../models/cartModel.js");
const productModel = require("../models/productModel.js");
const orderModel = require("../models/orderModel.js");
const bcrypt = require("bcrypt");
const packageProductModel = require("../models/packageProduct.js");
const nodemailer = require("nodemailer");
const generateOTP = require("../utils/generateOTP.js");
const notificationModel = require("../models/notificationModel.js");
require("dotenv").config();

// XÁC NHẬN MÃ OTP
let transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tuan_2051220002@dau.edu.vn",
      pass: "ikbtmqhjdxhahznd",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

const sendEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);

  const otp = generateOTP();

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "NHẬN MÃ XÁC THỰC OTP",
    text: `Mã xác thục OTP của bạn là: ${otp}`,
  };

  transporter.sendMail(
    mailOptions,
    function (error, info) {
      if (error) {
        console.log(error);
        res
          .status(500)
          .send("Error sending email");
      } else {
        console.log(
          "Email sent successfully!"
        );
        res.status(200).json({
          OTP: otp,
        });
      }
    }
  );
};

// create user
const addUser = async (req, res) => {
  const { email } = req.body;
  const exisitingUser =
    await userModel.findOne({ email }); // kiểm tra có email nào chưa
  if (exisitingUser) {
    return res.status(500).send({
      success: true,
      message: "Email này đã tồn tại", // nếu tìm thấy có tồn tại
    });
  }
  try {
    const newUser = new userModel(
      req.body
    ).save();
    res.status(201).send({
      newUser: req.body,
      success: true,
      message:
        "Đăng ký tài khoản thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Đăng ký tài khoản thất bại",
      success: false,
      error: error,
    });
  }
};

// login user
const loginUser = asyncHandle(
  async (req, res) => {
    const { email, password } =
      req.body;

    const findUser =
      await userModel.findOne({
        email,
      });
    if (
      findUser &&
      (await findUser.isPasswordMatched(
        password
      ))
    ) {
      const refreshToken =
        await genarateRefreshToken(
          findUser?._id
        ); // tạo taoken trong 3 ngày
      const updateUser =
        await userModel.findByIdAndUpdate(
          findUser?._id,
          {
            refreshToken: refreshToken,
          },
          {
            new: true,
          }
        );
      res.cookie(
        "refreshToken",
        refreshToken,
        {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000, // thơi gian sống của cookie và có tên là refreshtoken (72 giờ)
        }
      );
      res.status(201).send({
        success: true,
        message: "Đăng nhập thành công",
        _id: findUser?._id,
        name: findUser?.name,
        email: findUser?.email,
        address: findUser?.address,
        mobile: findUser?.mobile,
        avt: findUser?.avt,
        password: findUser?.password,
        role: findUser?.role,
        token: genarateToken(
          findUser?._id
        ), // hiển thị ra token
      });
    } else {
      return res.status(500).send({
        success: true,
        message:
          "Hãy tạo tài khoản, tài khoản không tồn tại", // nếu tìm thấy có tồn tại
      });
    }
  }
);

// login admin
const loginAdmin = asyncHandle(
  async (req, res) => {
    const { email, password } =
      req.body;
    const findAdmin =
      await userModel.findOne({
        email,
      });
    if (findAdmin.role !== "admin") {
      return res.status(500).send({
        success: false,
        message: "not authorised", // nếu tìm thấy có tồn tại
      });
    }
    if (
      findAdmin &&
      (await findAdmin.isPasswordMatched(
        password
      ))
    ) {
      const refreshToken =
        await genarateRefreshToken(
          findAdmin?._id
        );
      const updateUser =
        await userModel.findByIdAndUpdate(
          findAdmin?._id,
          {
            refreshToken: refreshToken,
          },
          {
            new: true,
          }
        );
      res.cookie(
        "refreshToken",
        refreshToken,
        {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        }
      );
      res.status(201).send({
        success: true,
        message: "Login successfully",
        _id: findAdmin?._id,
        name: findAdmin?.name,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        password: findAdmin?.password,
        role: findAdmin?.role,
        token: genarateToken(
          findAdmin?._id
        ), // hiển thị ra token
      });
    } else {
      return res.status(500).send({
        success: true,
        message:
          "please create new user, Invalid", // nếu tìm thấy có tồn tại
      });
    }
  }
);

// handle refresh token
const handleRefreshToken = asyncHandle(
  async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.refreshToken) {
      res.send({
        success: false,
        message:
          "No refresh token in cookies",
      });
    }
    const refreshToken =
      cookie?.refreshToken;
    console.log(refreshToken);
    const user =
      await userModel.findOne({
        refreshToken,
      });
    if (!user) {
      res.status(401).send({
        success: false,
        message:
          "No refresh token present in db or not matched",
        user,
      });
    }
    jwt.verify(
      refreshToken,
      "SECRET",
      (err, decoded) => {
        if (
          err ||
          user.id !== decoded.id
        ) {
          res.status(401).send({
            success: false,
            message:
              "there is something wrong with refresh token",
          });
        }
        const accessToken =
          genarateToken(user.id);
        res.status(200).send({
          success: true,
          message:
            "refresh token success",
          accessToken,
        });
      }
    );
  }
);

// logout func
const logout = asyncHandle(
  async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken)
      throw new Error(
        "No Refresh Token in Cookies"
      );
    const refreshToken =
      cookie.refreshToken;
    const user =
      await userModel.findOne({
        refreshToken,
      });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).send({
        success: true,
        message:
          "clear cookies success",
      }); // forbidden
    }
    await userModel.findOneAndUpdate(
      { refreshToken },
      {
        $set: { refreshToken: "" },
      }
    );
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).send({
      success: true,
      message: "clear cookies success",
    }); // forbidden
  }
);

// get all users
const getAllUsers = async (
  req,
  res
) => {
  try {
    const user = await userModel.find(
      {}
    );
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Get all users error !",
    });
  }
};

// get a user
const getsignUser = async (
  req,
  res
) => {
  const { _id } = req.params;
  try {
    const getUser =
      await userModel.findById(_id);
    res.status(200).json({
      success: true,
      message:
        "Get user successfully !",
      getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Get user error !",
    });
  }
};

// update user
const updateUser = asyncHandle(
  async (req, res) => {
    const { _id } = req.params;
    try {
      // Hash lại mật khẩu mới nếu có
      if (req.body.password) {
        const salt =
          await bcrypt.genSaltSync(10);
        req.body.password =
          await bcrypt.hash(
            req.body.password,
            salt
          );
      }

      const user =
        await userModel.findByIdAndUpdate(
          _id,
          {
            name: req?.body?.name,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
            password:
              req?.body?.password,
            role: req?.body?.role,
          },
          {
            new: true,
          }
        );
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Update user error !",
      });
    }
  }
);

// delete a user
const deletesignUser = async (
  req,
  res
) => {
  const { _id } = req.params;
  try {
    const user =
      await userModel.findByIdAndDelete(
        _id
      );
    res.status(200).json({
      success: true,
      message:
        "delete user successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "delete user error !",
    });
  }
};
const updatePassword = asyncHandle(
  async (req, res) => {
    const { _id } = req.user;
    const password = req.body.password;
    validateMongooseDbId(_id);
    const user =
      await userModel.findById(_id);
    console.log(password);
    if (password) {
      user.password = password;
      const updatedPassword =
        await user.save();
      res.status(200).send({
        success: true,
        message:
          "Update password success",
        updatedPassword,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Update password ...",
        user,
      });
    }
  }
);

// cart
const userCart = asyncHandle(
  async (req, res) => {
    const {
      productId,
      quantity,
      price,
    } = req.body;
    console.log(req.body);
    const { _id } = req.user;
    try {
      const existingCartItem =
        await cartModel.findOne({
          userId: _id,
          productId: productId,
        });

      if (existingCartItem) {
        const newQuantity =
          parseInt(
            existingCartItem.quantity
          ) + parseInt(quantity);
        existingCartItem.quantity =
          newQuantity;
        existingCartItem.price = price;
        await existingCartItem.save();

        res.json({
          success: true,
          message:
            "Cart updated successfully",
          updatedCart: existingCartItem,
        });
      } else {
        let newCart =
          await new cartModel({
            userId: _id,
            productId,
            quantity,
            price,
          }).save();
        res.json({
          success: true,
          message:
            "Cart created successfully",
          newCart,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Cart user error!",
      });
    }
  }
);

// get user cart
const getUserCart = asyncHandle(
  async (req, res) => {
    const { _id } = req.user;
    try {
      const cart = await cartModel
        .find({ userId: _id })
        .populate("productId");
      res.json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message:
          "get cart user error !",
      });
    }
  }
);

const removeProductCart = asyncHandle(
  async (req, res) => {
    const { _id } = req.user;
    const { cartItemId } = req.params;
    try {
      const deleteProductCart =
        await cartModel.deleteOne({
          userId: _id,
          _id: cartItemId,
        });
      res.json(deleteProductCart);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message:
          "delete product cart user error !",
      });
    }
  }
);

const updateProductQuantityCart =
  asyncHandle(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId, newQuantity } =
      req.params;
    try {
      const cartItem =
        await cartModel.findOne({
          userId: _id,
          _id: cartItemId,
        });
      cartItem.quantity = newQuantity;
      cartItem.save();
      res.json(cartItem);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message:
          "delete product cart user error !",
      });
    }
  });
  const sendRestockRequestEmail = async (productName, quantity) => {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: "tranquocthinh2002gl@gmail.com",
      subject: "Yêu Cầu Cung Cấp Thêm Sản Phẩm",
      text: `Cần cung cấp thêm sản phẩm: ${productName}. Số lượng hiện có dưới 20: ${quantity}.`,
    };
  
    return transporter.sendMail(mailOptions);
  };
const createOrder = asyncHandle(
  async (req, res) => {
    const {
      shippingInfo,
      orderItems,
      totalPrice,
      paymentMethod,
    } = req.body;
    const { _id } = req.user;
    console.log(
      shippingInfo,
      orderItems,
      totalPrice,
      _id,
      paymentMethod
    );

    try {
      // Create the order
      const order =
        await orderModel.create({
          shippingInfo,
          orderItems,
          totalPrice,
          orderStatus: "COMPLETED",
          paymentMethod: paymentMethod,
          user: _id,
        });
      for (const item of orderItems) {
        const { productId, quantity,title } =
          item;
        const packageProduct =
          await packageProductModel.findOne(
            { productId }
          ).populate("productId");

          const product = await productModel.findOne({ _id: productId });
          console.log("object ", product)
          if (product) {
            product.countBy += quantity;

            await product.save();
          }

          if (packageProduct) {
            packageProduct.quantity -=
            quantity;
            await packageProduct.save();
          }
          
          if (packageProduct.quantity < 90) {
          // await sendRestockRequestEmail(packageProduct.productId.title, packageProduct.quantity);
          const notificationMessage = `Cần cung cấp thêm sản phẩm: ${packageProduct.productId.title}. Số lượng hiện có dưới 10: ${packageProduct.quantity}.`;
          const newNotification = new notificationModel({ 
            message : notificationMessage,
            count: packageProduct.quantity
          });
          await newNotification.save();
          console.log(`Email sent requesting more of ${packageProduct.productId.title}.`);
        }
      }

      res.json({
        order,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message:
          "create order user error!",
      });
    }
  }
);
const getMyOrder = asyncHandle(
  async (req, res) => {
    const { _id } = req.user;
    try {
      const orders = await orderModel
        .find({ user: _id })
        .populate(
          "orderItems.productId"
        );
      res.json({
        orders,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message:
          "create order user error !",
      });
    }
  }
);
const getAllOrder = async (
  req,
  res
) => {
  try {
    //tìm kiếm id mà người dùng login
    const orderUser = await orderModel
      .find()
      .populate("user")
      .populate("orderItems.productId");
    res.json(orderUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:
        "get all order user error !",
    });
  }
};
const emptyCart = async (req, res) => {
  const { _id } = req.user;
  try {
    //tìm kiếm id mà người dùng login
    const user =
      await userModel.findOne({ _id });
    const cart =
      await cartModel.deleteMany({
        userId: user._id,
      });
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "emptyCart user error !",
    });
  }
};
const updateStatusOrder = async (
  req,
  res
) => {
  const { _id, status } = req.params;
  try {
    // Tìm đơn hàng cần cập nhật bằng _id
    const updateOrder =
      await orderModel.findById(_id);

    if (!updateOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    updateOrder.status = status;
    if (status === "Giao hàng thành công") {
      updateOrder.deliveredAt = new Date(); // Set to the current time
    }
    // Cập nhật trạng thái đơn hàng
    await updateOrder.save();
    res.json(updateOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Update order error!",
    });
  }
};
const getAllNoti = async(req,res)=>{
  try {
    const noti = await notificationModel.find()
    res.json({
      noti,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:
        "get all noti error !",
    });
  }
}
 const markAllAsRead = async (req, res) => {
  try {
    // Cập nhật tất cả thông báo, đặt read = true
    await notificationModel.updateMany(
      { read: false }, // Điều kiện để tìm thông báo chưa đọc
      { $set: { read: true } } // Hành động cập nhật
    );

    // Lấy danh sách thông báo sau khi cập nhật
    const noti = await notificationModel.find();

    res.json({
      success: true,
      message: "All notifications marked as read.",
      noti, // Trả về danh sách thông báo đã cập nhật
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Failed to mark notifications as read.",
    });
  }
};

module.exports = {
  addUser,
  loginUser,
  getAllUsers,
  getsignUser,
  deletesignUser,
  updateUser,
  handleRefreshToken,
  logout,
  updatePassword,
  loginAdmin,
  userCart,
  sendEmail,
  getUserCart,
  removeProductCart,
  updateProductQuantityCart,
  createOrder,
  getMyOrder,
  getAllOrder,
  emptyCart,
  updateStatusOrder,getAllNoti,markAllAsRead
};
