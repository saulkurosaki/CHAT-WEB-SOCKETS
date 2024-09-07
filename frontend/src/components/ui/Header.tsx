import { useState } from 'react';

import { useMatch, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, LogOut, MoreVertical, Search, User } from 'lucide-react'

import { useUserStore } from '@/store';

import { handleGetInitials } from '@/helpers';

import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button';

export const Header = () => {
  const navigate = useNavigate();
  const inChatRoom = useMatch('/chat/:id');

  const { user } = useUserStore();

  const [showSearch, setShowSearch] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login", { replace: true });
  }

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
            {inChatRoom ? `${user?.name}` : "Chats"}
          </h1>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {inChatRoom ? (
          <Info
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowChatInfo(true)}
          />
        ) : (
          <Search
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
        )}

        <Avatar className="h-8 w-8">
          {user?.profileImage ? (
            <AvatarImage
              src={user?.profileImage}
              alt={user.name}
            />
          ) : (
            <AvatarFallback>{handleGetInitials(user?.name)}</AvatarFallback>
          )}
        </Avatar>

        {!inChatRoom && (
          <Popover>
            <PopoverTrigger>
              <MoreVertical className="h-6 w-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
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
  )
}
