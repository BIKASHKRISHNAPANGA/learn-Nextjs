import {z} from 'zod'


export const MessageSchema=z.object({
    content:z.string().min(1, "Message content cannot be empty"),
    senderId: z.string().uuid("Invalid sender ID"), 
    receiverId: z.string().uuid("Invalid receiver ID"),
    timestamp: z.date().default(() => new Date()),
    isRead: z.boolean().default(false) 
})