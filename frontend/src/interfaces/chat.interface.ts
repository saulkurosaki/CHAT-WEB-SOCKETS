export interface IChat {
  _id: string;
  name: string;
  chatRoomType: string;
  avatar?: string | null;
  image?: string | null;
  members: string[];
  unreadMessages: number;
  lastMessage: string;
}
