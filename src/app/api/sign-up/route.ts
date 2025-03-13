import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request ) { 
    await dbConnect();
    try {
        const { username, email, password } = await req.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingUserVerifiedByUsername) {
            return new Response(JSON.stringify({
                success: false,
                message: "Username already exists and taken",
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        const existingUserByEmail=await UserModel.findOne({email})
        const verifyCode=Math.floor(100000+Math.random()*900000).toString();
        if(existingUserByEmail) {
           if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message:"Username already exists and taken"
            }),{status:400}
           }
           else{
                const hasedPassword = await bcrypt.hash(password,10)
                existingUserByEmail.password=hasedPassword
                existingUserByEmail.verifyCode=verifyCode
                existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
                await existingUserByEmail.save()
           }
        }else{
           const hasedPassword= await bcrypt.hash(password,10)
           const expiryDate:Date =new Date()
           expiryDate.setHours(expiryDate.getHours() + 1);
        const newUser= new UserModel({
            username,
                email,
                password:hasedPassword,
                verifyCode:verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                Message:[]
            })
            await newUser.save();
        }
        //send verification email
        const emailResponse= await sendVerificationEmail(email,username,verifyCode)
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message:emailResponse.messages
            }),{status:500}
        }
        else{
            return Response.json({
                success: true,
                message:"user verification successful"
            }),{status:201}
        }
    } catch (error) {
        console.error("Error registering user", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error registering user",
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}