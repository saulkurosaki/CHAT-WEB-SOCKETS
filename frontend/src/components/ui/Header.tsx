import { useState } from "react";

import { useMatch, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Info,
  LogOut,
  MoreVertical,
  Search,
  User,
} from "lucide-react";

import { useSearchStore, useUserStore } from "@/store";

import { handleGetInitials } from "@/helpers";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";

export const Header = () => {
  const navigate = useNavigate();
  const inChatRoom = useMatch("/chat/:id");

  const { user, setUser } = useUserStore();
  const { search, setSearch } = useSearchStore();

  const [showSearch, setShowSearch] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) setSearch("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

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
          {user?.avatar ? (
            <AvatarImage src={user?.avatar} alt={user.name} />
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
  );
};
