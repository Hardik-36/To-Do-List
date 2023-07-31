const mongoose =require('mongoose');


const UserSchema=new mongoose.Schema({
    fullname:{
        type:String
        },
    email:{
        type:String,
        required:[true, "please provide unique email"],
        unique:[true,"email already exists"]
    },
    UserName:{
        type:String,
        required:[true, "Please provide unique name"],
        unique:[true,"Username exist"]
    },
    Password:{
        type:String,
        required:[true,"Please provide password"],
        unique:false
    }})

const User = mongoose.model('User', UserSchema);

module.exports = User;
