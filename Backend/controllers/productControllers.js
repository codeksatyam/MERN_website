const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors =require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//create products

exports.createProduct =catchAsyncErrors(async (req,res,next) =>{
    const product =await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});

//get all products
exports.getAllProducts =async(req,res)=>{
   const apifeature= ApiFeatures(Product.find(),req.query)
    const products =await apifeature.query;
    res.status(200).json({
        success:true,
        products    
        
    })
}

//get product details

exports.getProductDetails =async(req,res,next)=>{
    const product =await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    res.status(200).json({
        success:true,
        product
    })
}

//update product  --admin

exports.updateProduct= async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
}

//delete product

exports.deleteProduct =async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"product delete successfully"
    })
}