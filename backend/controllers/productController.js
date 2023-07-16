// const { findById, findByIdAndUpdate } = require('../model/productModel');
const Products = require('../model/productModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncError = require("../middleware/catchAsyncError");
const apifeatures = require('../utils/apiFeatures');
const ApiFeatures = require('../utils/apiFeatures');

//create product ---Admin

exports.createProuct = catchAsyncError(async (req,res,next)=>{
  req.body.user = req.user.id
  const data = await Products.create(req.body);
  console.log(data);
  res.status(201).json({
    sucess:true,
    data
  })
});
    

  //get a product

exports.getAllProducts = catchAsyncError(async (req,res,next) =>{
  const resultperpage = 5;
  const productCount = await Products.countDocuments()
  const apifeatures = new ApiFeatures(Products.find(),req.query).search().filter().pagination(resultperpage)
  const data = await apifeatures.query;
 if(!data){
  return next (new ErrorHander("data not found ",504))
 }
  res.status(201).json({
    sucess:true,
    data
  })

});

// update product

exports.updateAllProducts = catchAsyncError(async(req,res,next)=>{
  let datas = await Products.findById(req.params.id)
  if(!datas){
    return  next(new ErrorHander("id not found ",501))
  }
  const data = await Products.findByIdAndUpdate(req.params.id,req.body);
  res.status(200).json({
    sucess:true,
    data,
  })
})

//delete product 

exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
  const datas = await Products.findById(req.params.id);
  if(!datas){
    return next(new ErrorHander("datas not found",501))
  }
  const data = await Products.findByIdAndDelete(req.params.id);
  res.status(200).json({
    sucess:true,
    data
  })

})

//get product id 

exports.getProductId = catchAsyncError(async (req,res,next)=>{
  const data = await Products.findById(req.params.id);
   if(!data){
    return next(new ErrorHander("data not found",505))
   }
   res.status(200).json({
    sucess:true,
    data,
    productCount
   })
})

//Create New Review of Update the review
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
  
  const {rating,comment,productId} = req.body;
  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  }
  const product = await Products.findById(productId);

  const isReviews = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

   if(isReviews) {
    product.reviews.forEach((rev) => {
     if(rev.user.toString() === req.user._id.toString())
        (rev.rating = rating),(rev.comment = comment);      
    });
   }
   else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
   }
   let avg =0;
   
   product.reviews.forEach((rev)=>{
     avg += rev.rating 
    }) 
      product.ratings = avg
    / product.reviews.length;

   await product.save({validateBeforeSave: false});

   res.status(200).json({
    success:true
   })
})

//Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
 
  const product = await Products.findById(req.query.id);

  if(!product){
    return next(new ErrorHander("Product not found",404));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews,
  })

})

//delete Review

 exports.deleteReview = catchAsyncError(async (req,res,next)=>{

  const product = await Products.findById(req.query.productId)
  console.log(product)
  
  if(!product){ 
    return next(new ErrorHander("product not found",404))
  }
  const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString())

  let avg = 0 ;
  reviews.forEach((rev) => {
  avg += rev.rating;
  })
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Products.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews
    },
    {
      new:true,
      rumValidators:true,
      useDindAndModify:false
    }
  )
  res.status(200).json({
    success:true
  })

})