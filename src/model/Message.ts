import { User } from "./User";

export interface Message {
    room: string,
    Receiver: User,
    content: string,
    createdAt: Date
}