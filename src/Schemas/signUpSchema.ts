import {z} from 'zod'
export const usernameValidation=z
.string()
.min(4,"Usernmame must be atlest 4 characters long")
.max(20,"Username must be at most 20 characters long")
.regex(/^[a-zA-Z0-9]+$/,"usernmae must not contain any special characters")


export const SignUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      "Make a stronger password with uppercase, lowercase, number, and special character")
  })