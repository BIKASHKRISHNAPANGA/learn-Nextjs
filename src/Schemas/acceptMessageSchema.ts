import {z} from 'zod'


export const accountMessageSchema=z.object({
    accountMessage:z.boolean().default(true)
})