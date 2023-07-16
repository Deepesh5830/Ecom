const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
    description:{
        type:String,
        required:[true,"Plase Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"plase enter number"],
        maxLength:[8,"price cannot exceed 8 charactors"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{ 
                type:String,
                required:true
            }
        }
    ],
    catagory:{
        type:String,
        required:[true,"plase enter product catagory"]
    },
    stock:{
        type:Number,
        required:[true, "plase enter product stock"],
        maxLength:[4,"plase enter maxlength only 4 "],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        { 
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
                },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true,
            }
            
        }
    ],
  user:{
  type:mongoose.Schema.ObjectId,
  ref:"User",
  required:true
  },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("product",productSchema);