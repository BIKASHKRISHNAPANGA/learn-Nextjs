import { Message } from './../model/User';
export interface ApiResponse{
    success: boolean;
    Message:string;
    isAcceptingMessage?:boolean;
    messages?:Array<Message>;
}