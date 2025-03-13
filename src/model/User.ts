import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:string,
    createdAt:Date
}

const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    Message:Message[]
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"user name is required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"user email is required"],
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please use a valid email id"]
    },
    password:{
        type:String,
        required:[true,"user password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true," Verify code expiryis required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    Message:[MessageSchema]
})
// Exporting works differently in Next.js because it does not track how many times a module has been exported. It could be the first time or multiple times. In contrast, Express knows when an export has already been written. In Next.js, every time a page reloads, it reloads the module again, leading to potential re-execution of exports.this why de need to check here
 export const UserModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))