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
        const exitingUserByEmail=await UserModel.findOne({email})
        if(exitingUserByEmail) {
            true//tobo
        }else{
           const hasedPassword= await bcrypt.hash(password,10)
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