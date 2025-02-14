export interface Chat {
  _id: string;
  title: string;
  messages: Message[];
  lastMessageAt: Date;
}

export interface Message {
  id?: number;
  message: string;
  sender: "bot" | "user";
}
