import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore, useUserStore } from "@/store";
import { useChatRoomsStore } from "@/store/chatrooms.store"; // Importa el store
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/shared/Footer";

import "ldrs/waveform";

export const ChatRooms = () => {
  const { search } = useSearchStore();
  const { user } = useUserStore();
  const { chats, loading, fetchChatRooms, updatePrivateRoomsAvatarAndName } =
    useChatRoomsStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadChatRooms = async () => {
      if (user?._id) {
        await fetchChatRooms(user._id); // Llama a la función del store
        await updatePrivateRoomsAvatarAndName(user._id); // Llama a la función del store
      }
    };

    loadChatRooms();
  }, [user, fetchChatRooms, updatePrivateRoomsAvatarAndName]);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <l-waveform size={128} speed={1} stroke={8} color="#40EB97" />
        </div>
      ) : (
        <>
          <ScrollArea
            className="w-full flex-grow bg-gray-100"
            style={{ height: "calc(100vh - 100px)" }}
          >
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  key={chat._id}
                  className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/chat/${chat._id}`)}
                >
                  <Avatar className="h-12 w-12 mr-4">
                    {chat.avatar ? (
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                    ) : (
                      <AvatarImage
                        src="/default-avatar.webp"
                        alt="Default Avatar"
                      />
                    )}
                  </Avatar>
                  <div className="flex-grow">
                    <h2 className="font-semibold">{chat.name}</h2>
                    <p className="text-sm text-gray-500">
                      {chat.chatRoomType === "public"
                        ? "Group Chat"
                        : "Personal Chat"}
                    </p>
                  </div>
                  {chat.unreadMessages > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-green-500 text-white"
                    >
                      {chat.unreadMessages}
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No chats exist at the moment. Create a new one to start
                chatting.
              </div>
            )}
          </ScrollArea>
          <Footer />
        </>
      )}
    </>
  );
};
