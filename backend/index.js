const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
const crypto = require("crypto");
const packageProductModel = require("./models/packageProduct.js");

const authRoute = require("./routes/authRoute");
const slideRoute = require("./routes/slideRoute");
const brandRoute = require("./routes/brandRoute");
const categoryRoute = require("./routes/categoryRoute");
const categoryBlogRoute = require("./routes/categoryBlogRoute");
const uploadRoute = require("./routes/uploadRoute");
const productRoute = require("./routes/productRoute");
const supplierRoute = require("./routes/supplierRoute");
const blogRoute = require("./routes/blogRoute");
const packageProductRoute = require("./routes/packageProductRoute");
const voucherRoute = require("./routes/voucherRoute");
const dbConnect = require("./config/dbConnect");
const axios = require("axios");
const paymentModel = require("./models/paymenModel");
dbConnect();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const orderModel = require("./models/orderModel");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/brand", brandRoute);
app.use("/api/supplier", supplierRoute);
app.use("/api/slide", slideRoute);
app.use("/api/category", categoryRoute);
app.use(
  "/api/categoryblog",
  categoryBlogRoute
);
app.use("/api/upload", uploadRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use(
  "/api/package",
  packageProductRoute
);
app.use("/api/voucher", voucherRoute);
const config = {
  accessKey: "F8BBA842ECF85",
  secretKey:
    "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  partnerCode: "MOMO",
  redirectUrl: "http://localhost:3000/",
  ipnUrl:
    "https://your-callback-url/callback",
  requestType: "payWithMethod",
  lang: "vi",
};

app.post(
  "/payment",
  async (req, res) => {
    const {
      accessKey,
      secretKey,
      partnerCode,
      redirectUrl,
      ipnUrl,
      requestType,
      lang,
    } = config;

    const {
      totalPrice,
      user,
      orderItems,
      shippingInfo,
      paymentMethod,
    } = req.body;
    if (
      !totalPrice ||
      !user ||
      !orderItems ||
      !shippingInfo ||
      !paymentMethod
    ) {
      return res.status(400).json({
        error:
          "Missing required fields in request body",
      });
    }
    const amount =
      totalPrice.toString();
    const orderId =
      partnerCode + Date.now();
    const requestId = orderId;

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${paymentMethod}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      partnerName: "YourPartnerName",
      storeId: "YourStoreId",
      requestId,
      amount,
      orderId,
      orderInfo: paymentMethod,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      signature,
    };

    try {
      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/create",
        requestBody,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const payment = new orderModel({
        pay: [response.data],
        user: user,
        shippingInfo: shippingInfo,
        orderItems: orderItems,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
      });

      await payment.save();

      // Update product quantities or handle inventory management
      for (const item of orderItems) {
        const { productId, quantity } =
          item;
        const packageProduct =
          await packageProductModel.findOne(
            { productId }
          );

        if (packageProduct) {
          packageProduct.quantity -=
            quantity;
          await packageProduct.save();
        }
      }

      return res
        .status(200)
        .json(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response.data
      );
      return res.status(500).json({
        statusCode: 500,
        message:
          error.response.data.message,
      });
    }
  }
);

app.post(
  "/check-status-transaction",
  async (req, res) => {
    const { orderId } = req.body;

    const rawSignature = `accessKey=${config.accessKey}&orderId=${orderId}&partnerCode=${config.partnerCode}&requestId=${orderId}`;
    const signature = crypto
      .createHmac(
        "sha256",
        config.secretKey
      )
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode: config.partnerCode,
      requestId: orderId,
      orderId,
      signature,
      lang: "vi",
    };

    try {
      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/query",
        requestBody,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      return res
        .status(200)
        .json(response.data);
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
  }
);

app.post(
  "/callback",
  async (req, res) => {
    console.log("callback:", req.body);
  }
);

app.listen(PORT, () => {
  console.log(
    `Server is running at PORT ${PORT}`
  );
});
