import bcrypt from "bcrypt"

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type:String,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email: {
                type: String,
                required: true,
                unique:true,
                lowercase: true,
                trim:true,
            },
        fullname: {
                type: String,
                required: true,
                index:true,
                trim:true,
            },
        avatar: {
                type: String, //loudinary
                required: true,
                
            },
        coverImage: {
                type: String, //loudinary

            },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type: String,
            required: [true, "Pasword is required"]
        },
        refreshToken: {
            type:String
        }
   

    },{timestamps: true}
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this.id,
            email:this.email,
            username:this.username,
            fullname:this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }


    )
}
userSchema.methods.generateRefreshToken = function(){}

export const User = mongoose.model('User', userSchema)