const mongoose = require('mongoose');
const validotor = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Plase Enter name"],
        maxlength:[30,"Name cannot exceed 30 charactors"],
        minlength:[4,"Name should have more 4 charactors"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validotor:[validotor.isEmail,"Please Enter a valid Email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[8,"Password should we greater then 8 charecters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            url:{
                type:String,
                required:true,
            }
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
  this.password = await bcrypt.hash(this.password, 10);

});

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// Compare password 
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

//Generating password Reset Token
userSchema.methods.getResetPassToken =  function () {
    //Genreate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // console.log("userModelresetToken =>",resetToken)
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"),

    this.resetPasswordExpire = Date.now();
    
    return resetToken;
}


module.exports = mongoose.model("User",userSchema);