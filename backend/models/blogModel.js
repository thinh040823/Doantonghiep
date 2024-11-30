const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    categoryBlog: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0, // Initialize with 0 views
    },
    orderBy: {
      type: mongoose.Schema.Types
        .ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(
  "Blog",
  blogSchema
);
