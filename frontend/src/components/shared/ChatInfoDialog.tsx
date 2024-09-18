import { Camera, Info, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const ChatInfoDialog = () => {
  const [currentRoom, setCurrentRoom] = useState();
  const [newGroupName, setNewGroupName] = useState();
  const [newGroupImage, setNewGroupImage] = useState();
  const [contacts, setContacts] = useState();
  const [selectedGroupMembers, setSelectedGroupMembers] = useState();

  const updateGroupChat = () => {};

  const deleteChat = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info className="h-6 w-6 cursor-pointer" />
      </DialogTrigger>
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
          <Button variant="destructive" onClick={deleteChat} className="w-full">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatInfoDialog;
