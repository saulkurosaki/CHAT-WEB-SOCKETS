import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSearchStore, useUserStore } from "@/store";

import { handleGetInitials } from "@/helpers";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

import { IChat } from "@/interfaces";
import Footer from "@/components/shared/Footer";
import { findUserById, getUserChatRooms } from "@/services/private";

import "ldrs/waveform";

export const ChatRooms = () => {
  const { search } = useSearchStore();
  const [chats, setChats] = useState<IChat[]>([]);
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true); // Estado para el loader
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      setLoading(true);
      if (user?._id) {
        const response = await getUserChatRooms(user._id);
        if (response.ok) {
          const chatRooms = response.data[user._id];
          if (chatRooms && chatRooms.length > 0) {
            setChats(chatRooms);
          }
        } else {
          console.error(response.error);
          setLoading(false);
        }
      }
    };

    fetchChatRooms();
  }, [user]);

  useEffect(() => {
    const updatePrivateRoomsAvatarAndName = async () => {
      setLoading(true);
      const updatedChats = await Promise.all(
        chats.map(async (chat) => {
          if (chat.chatRoomType === "private") {
            const memberIds = Object.keys(chat.members);
            let avatarFound = false; // Variable para verificar si se encontró un avatar

            for (const memberId of memberIds) {
              if (memberId !== user?._id) {
                const response = await findUserById(memberId);
                if (response.ok) {
                  chat.avatar = response.data.avatar; // Asigna el avatar directamente al chat
                  chat.name = `${response.data.name} ${response.data.lastname}`; // Asigna el nombre y apellido
                  avatarFound = true; // Marcamos que se encontró un avatar
                  break; // Salimos del bucle una vez que encontramos un avatar
                }
              }
            }

            if (!avatarFound) {
              chat.avatar = null;
            }
          }
          return chat; // Retornar el chat con el avatar y nombre actualizados
        })
      );

      setChats(updatedChats);
      setLoading(false); // Ocultar el loader una vez que se complete la actualización
    };

    if (chats.length > 0) {
      updatePrivateRoomsAvatarAndName();
    }
  }, [chats.length, user]);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {loading ? ( // Mostrar loader si está cargando
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
                      <AvatarFallback>
                        {handleGetInitials(chat.name)}
                      </AvatarFallback>
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
