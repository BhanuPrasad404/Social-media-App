import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            requestAnimationFrame:true,
            min:2,
            max:50,
        },
        lastName:{
            type: String,
            requestAnimationFrame:true,
            min:2,
            max:50,

        },
        email:{
            type: String,
            requestAnimationFrame:true,
            min:2,
            max:50,
            unique:true

        },

        password:{
            type:String,
            default:"",
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends : {
            type:Array,
            default:[],
        },

        location:String,
        occupation:String,
        viewdProfile:Number,
        impressions:Number,

    },
    {timestamps:true}


);

const User = mongoose.model("User",Userschema)
export default User; 