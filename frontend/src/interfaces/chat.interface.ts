export interface IChat {
  _id: string;
  name: string;
  type: string;
  image?: string | null;
  members: string[];
  unreadMessages: number;
  lastMessage: string;
}