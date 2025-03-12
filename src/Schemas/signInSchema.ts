
import {z} from 'zod'


export const signInSchema=z.object({
    identifier:z.string(),
    password:z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      "Make a stronger password with uppercase, lowercase, number, and special character")
})