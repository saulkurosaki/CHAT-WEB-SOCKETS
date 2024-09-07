import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Plus, UserPlus } from 'lucide-react';

import { useSearchStore } from '@/store';

import { generateChats, handleGetInitials } from '@/helpers';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { IChat } from '@/interfaces';

export const ChatRooms = () => {
  const navigate = useNavigate();

  const { search } = useSearchStore();

  const [chats, setChats] = useState<IChat[]>([]);

  useEffect(() => {
    const generatedChats = generateChats(10);

    setChats(generatedChats);
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ScrollArea className="w-full flex-grow bg-gray-100">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/chat/${chat._id}`)}
            >
              <Avatar className="h-12 w-12 mr-4">
                {chat.image ? (
                  <AvatarImage
                    src={chat.image}
                    alt={chat.name}
                  />
                ) : (
                  <AvatarFallback>{handleGetInitials(chat.name)}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-grow">
                <h2 className="font-semibold">{chat.name}</h2>
                <p className="text-sm text-gray-500">
                  {chat.type === "group" ? "Group Chat" : "Personal Chat"}
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
            No chats exist at the moment. Create a new one to start chatting.
          </div>
        )}
      </ScrollArea>

      <div className="w-full flex justify-between p-4 bg-gray-100">
        <Button className="w-[48%]">
          <Plus className="mr-2 h-4 w-4" /> New Group Chat
        </Button>
        
        <Button className="w-[48%]">
          <UserPlus className="mr-2 h-4 w-4" /> New Personal Chat
        </Button>
      </div>
    </>
  )
}
