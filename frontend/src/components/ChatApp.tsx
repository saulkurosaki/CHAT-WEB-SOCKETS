"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Send,
  Plus,
  ArrowLeft,
  MoreVertical,
  Search,
  UserPlus,
  LogOut,
  User,
  Camera,
  Trash2,
  Info,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function ChatApp() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showRooms, setShowRooms] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showNewContactDialog, setShowNewContactDialog] = useState(false);
  const [newContactInfo, setNewContactInfo] = useState("");
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [showChatInfo, setShowChatInfo] = useState(false);

  const simulateLogin = () => {
    if (email && password) {
      setUser({ email, name: "John Doe", username: "johndoe" });
    }
  };

  const simulateRegister = () => {
    if (email && password && name && lastname && username) {
      setUser({ email, name: `${name} ${lastname}`, username });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && currentRoom && user) {
      const newMessage = {
        id: Date.now().toString(),
        sender: user.name,
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentRoom._id]: [
          ...(prevMessages[currentRoom._id] || []),
          newMessage,
        ],
      }));
      setMessage("");

      // Update unread messages for other users
      setUnreadMessages((prev) => ({
        ...prev,
        [currentRoom._id]: (prev[currentRoom._id] || 0) + 1,
      }));
    }
  };

  const joinRoom = (room) => {
    setCurrentRoom(room);
    setShowRooms(false);
    // Clear unread messages for this room
    setUnreadMessages((prev) => ({
      ...prev,
      [room._id]: 0,
    }));
  };

  const createRoom = (name, type = "group", members = [], image = null) => {
    const newRoom = {
      _id: Date.now().toString(),
      name,
      type,
      members: [...members, user.username],
      image,
    };
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setMessages((prevMessages) => ({ ...prevMessages, [newRoom._id]: [] }));
    return newRoom;
  };

  const createGroupChat = () => {
    if (newGroupName && selectedGroupMembers.length > 0) {
      const newGroup = createRoom(
        newGroupName,
        "group",
        selectedGroupMembers,
        newGroupImage
      );
      setNewGroupName("");
      setNewGroupImage(null);
      setSelectedGroupMembers([]);
      setShowNewGroupDialog(false);
      joinRoom(newGroup);
    }
  };

  const createPersonalChat = (contact) => {
    const existingRoom = rooms.find(
      (room) =>
        room.type === "personal" &&
        room.members.includes(user.username) &&
        room.members.includes(contact.username)
    );
    if (existingRoom) {
      joinRoom(existingRoom);
    } else {
      const newRoom = createRoom(contact.name, "personal", [contact.username]);
      joinRoom(newRoom);
    }
  };

  const addNewContact = () => {
    if (newContactInfo) {
      const newContact = {
        _id: Date.now().toString(),
        name: newContactInfo.includes("@")
          ? newContactInfo.split("@")[0]
          : newContactInfo,
        email: newContactInfo.includes("@") ? newContactInfo : "",
        phone: newContactInfo.includes("@") ? "" : newContactInfo,
        username: newContactInfo.includes("@")
          ? newContactInfo.split("@")[0]
          : newContactInfo,
      };
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setNewContactInfo("");
      setShowNewContactDialog(false);
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const logout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
    setName("");
    setLastname("");
    setUsername("");
    setPhoneNumber("");
    setProfileImage(null);
    setCurrentRoom(null);
    setShowRooms(true);
    setRooms([]);
    setMessages({});
    setContacts([]);
    setUnreadMessages({});
  };

  const updateProfile = () => {
    setUser((prevUser) => ({
      ...prevUser,
      name: `${name} ${lastname}`,
      username,
      phoneNumber,
      profileImage,
    }));
    setShowEditProfile(false);
  };

  const deleteProfile = () => {
    if (deletePassword === password) {
      logout();
      setShowDeleteConfirmation(false);
      setDeletePassword("");
    } else {
      alert("Incorrect password. Profile deletion cancelled.");
    }
  };

  const updateGroupChat = () => {
    if (currentRoom && currentRoom.type === "group") {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room._id === currentRoom._id
            ? {
                ...room,
                name: newGroupName || room.name,
                image: newGroupImage || room.image,
                members: [
                  ...new Set([...room.members, ...selectedGroupMembers]),
                ],
              }
            : room
        )
      );
      setNewGroupName("");
      setNewGroupImage(null);
      setSelectedGroupMembers([]);
      setShowChatInfo(false);
    }
  };

  const deleteChat = () => {
    if (currentRoom) {
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room._id !== currentRoom._id)
      );
      setMessages((prevMessages) => {
        const { [currentRoom._id]: deletedChat, ...restMessages } =
          prevMessages;
        return restMessages;
      });
      setShowChatInfo(false);
      setShowRooms(true);
      setCurrentRoom(null);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-teal-600">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-teal-600">
            {isRegistering ? "Register" : "Login"}
          </h1>
          {isRegistering ? (
            <>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mb-2"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <div className="mb-4">
                <Label
                  htmlFor="profile-image"
                  className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  <span>Upload Profile Image (Optional)</span>
                  <Input
                    id="profile-image"
                    type="file"
                    className="hidden"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </Label>
                {profileImage && (
                  <div className="mt-2 relative">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      className="absolute top-0 right-0"
                      onClick={() => setProfileImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <Button onClick={simulateRegister} className="w-full mb-2">
                Register
              </Button>
              <Button
                variant="link"
                onClick={() => setIsRegistering(false)}
                className="w-full"
              >
                Already have an account? Login
              </Button>
            </>
          ) : (
            <>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <Button onClick={simulateLogin} className="w-full mb-2">
                Login
              </Button>
              <Button
                variant="link"
                onClick={() => setIsRegistering(true)}
                className="w-full"
              >
                Don't have an account? Register
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 flex items-center justify-between">
        {!showRooms && (
          <ArrowLeft
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowRooms(true)}
          />
        )}
        {!showRooms && (
          <Info
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowChatInfo(true)}
          />
        )}
        <h1 className="text-xl font-bold">
          {showRooms ? "Chat Rooms" : currentRoom?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            {user.profileImage ? (
              <AvatarImage
                src={URL.createObjectURL(user.profileImage)}
                alt={user.name}
              />
            ) : (
              <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
            )}
          </Avatar>
          <Search
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
          <Popover>
            <PopoverTrigger>
              <MoreVertical className="h-6 w-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setShowEditProfile(true)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="p-2 bg-white">
          <Input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      )}

      {/* Main Content */}
      {showRooms ? (
        <ScrollArea className="flex-grow">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div
                key={room._id}
                className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => joinRoom(room)}
              >
                <Avatar className="h-12 w-12 mr-4">
                  {room.image ? (
                    <AvatarImage
                      src={URL.createObjectURL(room.image)}
                      alt={room.name}
                    />
                  ) : (
                    <AvatarFallback>{getInitials(room.name)}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-grow">
                  <h2 className="font-semibold">{room.name}</h2>
                  <p className="text-sm text-gray-500">
                    {room.type === "group" ? "Group Chat" : "Personal Chat"}
                  </p>
                </div>
                {unreadMessages[room._id] > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-green-500 text-white"
                  >
                    {unreadMessages[room._id]}
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
      ) : (
        <ScrollArea className="flex-grow p-4">
          {messages[currentRoom._id]?.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === user.name ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-2 max-w-xs ${
                  msg.sender === user.name
                    ? "bg-teal-500 text-white"
                    : "bg-white"
                }`}
              >
                <p className="font-semibold text-xs mb-1">{msg.sender}</p>
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      )}

      {/* Footer */}
      {showRooms ? (
        <div className="flex justify-between p-4">
          <Button
            className="w-[48%]"
            onClick={() => setShowNewGroupDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> New Group Chat
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-[48%]">
                <UserPlus className="mr-2 h-4 w-4" /> New Personal Chat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select a contact</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[300px] mt-4">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => createPersonalChat(contact)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{contact.name}</span>
                  </div>
                ))}
              </ScrollArea>
              <Button
                onClick={() => setShowNewContactDialog(true)}
                className="mt-4"
              >
                Add New Contact
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <form onSubmit={sendMessage} className="bg-white p-4 flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      )}

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-lastname">Lastname</Label>
              <Input
                id="edit-lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="edit-profile-image"
                className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
              >
                <Camera className="mr-2 h-4 w-4" />
                <span>Change Profile Image</span>
                <Input
                  id="edit-profile-image"
                  type="file"
                  className="hidden"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </Label>
              {profileImage && (
                <div className="mt-2 relative">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-0 right-0"
                    onClick={() => setProfileImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <Button onClick={updateProfile} className="w-full">
              Save Changes
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirmation(true)}
              className="w-full"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Profile Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Profile Deletion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Please enter your password to confirm profile deletion:</p>
            <Input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Enter your password"
            />
            <Button
              variant="destructive"
              onClick={deleteProfile}
              className="w-full"
            >
              Confirm Deletion
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Contact Dialog */}
      <Dialog
        open={showNewContactDialog}
        onOpenChange={setShowNewContactDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-contact-info">Email or Phone Number</Label>
              <Input
                id="new-contact-info"
                value={newContactInfo}
                onChange={(e) => setNewContactInfo(e.target.value)}
                placeholder="Enter email or phone number"
              />
            </div>
            <Button onClick={addNewContact} className="w-full">
              Add Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Group Chat Dialog */}
      <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group Chat</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-group-name">Group Name</Label>
              <Input
                id="new-group-name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div>
              <Label
                htmlFor="new-group-image"
                className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
              >
                <Camera className="mr-2 h-4 w-4" />
                <span>Upload Group Image (Optional)</span>
                <Input
                  id="new-group-image"
                  type="file"
                  className="hidden"
                  onChange={(e) => setNewGroupImage(e.target.files[0])}
                />
              </Label>
              {newGroupImage && (
                <div className="mt-2 relative">
                  <img
                    src={URL.createObjectURL(newGroupImage)}
                    alt="Group preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-0 right-0"
                    onClick={() => setNewGroupImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div>
              <Label>Select Group Members</Label>
              <ScrollArea className="h-[200px] mt-2">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Checkbox
                      id={`contact-${contact._id}`}
                      checked={selectedGroupMembers.includes(contact.username)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGroupMembers((prev) => [
                            ...prev,
                            contact.username,
                          ]);
                        } else {
                          setSelectedGroupMembers((prev) =>
                            prev.filter(
                              (username) => username !== contact.username
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`contact-${contact._id}`}>
                      {contact.name}
                    </Label>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <Button onClick={createGroupChat} className="w-full">
              Create Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Info Dialog */}
      <Dialog open={showChatInfo} onOpenChange={setShowChatInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentRoom?.type === "group" ? "Group Info" : "Contact Info"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentRoom?.type === "group" ? (
              <>
                <div>
                  <Label htmlFor="edit-group-name">Group Name</Label>
                  <Input
                    id="edit-group-name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder={currentRoom.name}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="edit-group-image"
                    className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    <span>Change Group Image</span>
                    <Input
                      id="edit-group-image"
                      type="file"
                      className="hidden"
                      onChange={(e) => setNewGroupImage(e.target.files[0])}
                    />
                  </Label>
                  {(newGroupImage || currentRoom.image) && (
                    <div className="mt-2 relative">
                      <img
                        src={
                          newGroupImage
                            ? URL.createObjectURL(newGroupImage)
                            : URL.createObjectURL(currentRoom.image)
                        }
                        alt="Group preview"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="ghost"
                        className="absolute top-0 right-0"
                        onClick={() => setNewGroupImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <Label>Add Members</Label>
                  <ScrollArea className="h-[200px] mt-2">
                    {contacts.map((contact) => (
                      <div
                        key={contact._id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`add-contact-${contact._id}`}
                          checked={
                            selectedGroupMembers.includes(contact.username) ||
                            currentRoom.members.includes(contact.username)
                          }
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedGroupMembers((prev) => [
                                ...prev,
                                contact.username,
                              ]);
                            } else {
                              setSelectedGroupMembers((prev) =>
                                prev.filter(
                                  (username) => username !== contact.username
                                )
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`add-contact-${contact._id}`}>
                          {contact.name}
                        </Label>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <Button onClick={updateGroupChat} className="w-full">
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Label>Name</Label>
                  <p>{currentRoom?.name}</p>
                </div>
                {currentRoom?.email && (
                  <div>
                    <Label>Email</Label>
                    <p>{currentRoom.email}</p>
                  </div>
                )}
                {currentRoom?.phone && (
                  <div>
                    <Label>Phone</Label>
                    <p>{currentRoom.phone}</p>
                  </div>
                )}
              </>
            )}
            <Button
              variant="destructive"
              onClick={deleteChat}
              className="w-full"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
