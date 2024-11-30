const mongoose = require("mongoose"); // Erase if already require

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    pay:{
      type:Array
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      require: true 
    },
    shippingInfo:{
      name : {
        type : String,
        require:true
      },
      email : {
        type : String,
        require:true
      },
      address : {
        type : String,
        require:true
      },
      mobile : {
        type : String,
        require:true
      },
    },
    
    orderItems:[
      {
        productId : {
          type : mongoose.Schema.Types.ObjectId,
          ref:"Product",
          require : true
        },
        quantity:{
          type : Number,
          require : true
        },
        price:{
          type : Number,
          require : true
        },
        size:{
          type: [{
            type: String,
            require : true
          }],
        },
      }
    ],
    paidAt : {
      type : Date,
      default : Date.now()
    },
    totalPrice : {
      type :Number ,
      require:true
    },
    // totalPriceAfterDiscount:{
    //   type : Number,
    //   require : true
    // },
    paymentMethod:{
      type : String,
      default : "Thanh toán tiền mặt",
      enum : ['Thanh toán tiền mặt',"Chuyển khoản ngân hàng"]
    },
    orderStatus : {
      type : String ,
      // default : "Cancelled",
      // enum : ['Cancalled',"COMPLETED"]
    },
    status:{
      type : String ,
      default : "Đang xác nhận",
      enum : ['Đang xác nhận',"Đang duyệt đơn","Đơn đang được giao","Giao hàng thành công"]
    },
    deliveredAt: {
      type: Date, // Stores the time when delivery is completed
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);