import create from "zustand";
import { getUserChatRooms, findUserById } from "@/services/private";
import { IChat } from "@/interfaces";

interface ChatRoomsState {
  chats: IChat[];
  loading: boolean;
  fetchChatRooms: (userId: string) => Promise<void>;
  updatePrivateRoomsAvatarAndName: (userId: string) => Promise<void>;
}

export const useChatRoomsStore = create<ChatRoomsState>((set, get) => ({
  chats: [],
  loading: false,
  fetchChatRooms: async (userId) => {
    set({ loading: true });
    const response = await getUserChatRooms(userId);
    if (response.ok) {
      set({ chats: response.data[userId] || [] });
    } else {
      console.error(response.error);
    }
    set({ loading: false });
  },
  updatePrivateRoomsAvatarAndName: async (userId) => {
    set({ loading: true });
    const updatedChats = await Promise.all(
      get().chats.map(async (chat) => {
        if (chat.chatRoomType === "private") {
          const memberIds = Object.keys(chat.members);
          let avatarFound = false;

          for (const memberId of memberIds) {
            if (memberId !== userId) {
              const response = await findUserById(memberId);
              if (response.ok) {
                chat.avatar = response.data.avatar;
                chat.name = `${response.data.name} ${response.data.lastname}`;
                avatarFound = true;
                break;
              }
            }
          }

          if (!avatarFound) {
            chat.avatar = null;
          }
        }
        return chat;
      })
    );

    set({ chats: updatedChats });
    set({ loading: false });
  },
}));
