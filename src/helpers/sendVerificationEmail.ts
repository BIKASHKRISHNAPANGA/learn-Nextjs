import { resend } from "@/lib/resend";
import EmailTemplate from '../../emails/VerificationEmail';


import { ApiResponse } from "@/Types/ApiResponce";

export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode:string,
): Promise<ApiResponse> {
    try { 
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification email',
            react:EmailTemplate({username}),
          });
        return{success: true, Message:"Succesful to send verification email"};

        }
        catch (error) {
            console.error('Error sending verification email:', error);
            return{success: false, Message:"failed to send verification email"};
        }
    
    }
