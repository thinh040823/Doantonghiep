const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 100000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      // Thay vì lưu vào thư mục cục bộ, bạn sẽ upload lên Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        transformation: [{ width: 3000, height: 3000, crop: 'limit', quality: 90 }],
      });
      // Bạn có thể lưu URL của ảnh vào req.body hoặc nơi khác nếu cần
      req.body.productImageUrl = result.secure_url;
      // Xóa tệp cục bộ nếu cần
      // fs.unlinkSync(file.path);
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        transformation: [{ width: 3000, height: 3000, crop: 'limit', quality: 90 }],
      });
      req.body.blogImageUrl = result.secure_url;
      // Xóa tệp cục bộ nếu cần
      // fs.unlinkSync(file.path);
    })
  );
  next();
};
module.exports = { uploadPhoto, productImgResize, blogImgResize };