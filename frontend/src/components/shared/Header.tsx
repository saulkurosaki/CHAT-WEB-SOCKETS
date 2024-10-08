import { useEffect, useState } from "react";

import { useMatch, useNavigate } from "react-router-dom";
import { ArrowLeft, CloudCog, LogOut, MoreVertical, Search } from "lucide-react";

import { useSearchStore, useUserStore } from "@/store";
import { useChatRoomsStore } from "@/store/chatrooms.store";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EditProfileDialog from "./EditProfileDialog";
import ChatInfoDialog from "./ChatInfoDialog";
import { socket } from '@/test_ws/socket';

export const Header = () => {
  const navigate = useNavigate();
  const inChatRoom = useMatch("/chat/:id");
  const { user, setUser } = useUserStore();
  const { search, setSearch } = useSearchStore();
  const { currentRoom } = useChatRoomsStore(); // Obtiene currentRoom del store


  const [showSearch, setShowSearch] = useState(false);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) setSearch("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLogout = () => {

    socket.disconnect()

    localStorage.clear();
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  // FIXME: 
  useEffect(() => {
    console.log('FIXME')

    socket.on('conn', (conn) => console.log({ conn }))

    socket.on('message', (msg) => console.log(msg))
    // return () => {
    //   eliminar listener
    // }
  }, [])



  return (
    <div className="flex items-center justify-between text-white p-4 bg-teal-600">
      <div className="flex items-center space-x-4">
        {inChatRoom && (
          <ArrowLeft
            className="h-6 w-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
        )}

        <button onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold">
            {inChatRoom ? (currentRoom ? currentRoom.name : "Chat") : "Chats"}
          </h1>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {inChatRoom ? (
          <ChatInfoDialog currentRoom={currentRoom} />
        ) : (
          <>
            <Search
              className="h-6 w-6 cursor-pointer"
              onClick={handleToggleSearch}
            />

            <div
              className={cn(
                "grid transform transition-all duration-300 ease-in-out overflow-hidden",
                showSearch
                  ? "grid-cols-[1fr] opacity-100"
                  : "grid-cols-[0fr] opacity-0 !m-0"
              )}
            >
              <div className="overflow-hidden rounded-md">
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full h-8 mb-0 text-black bg-white"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </>
        )}

        <Avatar className="h-8 w-8">
          {inChatRoom && currentRoom ? (
            currentRoom.avatar ? (
              <AvatarImage src={currentRoom.avatar} alt={currentRoom.name} />
            ) : (
              <AvatarImage src="/default-avatar.webp" alt="Default Avatar" />
            )
          ) : user?.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarImage src="/default-avatar.webp" alt="Default Avatar" />
          )}
        </Avatar>

        {!inChatRoom && (
          <Popover>
            <PopoverTrigger>
              <MoreVertical className="h-6 w-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="flex flex-col space-y-2">
                <EditProfileDialog />

                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
