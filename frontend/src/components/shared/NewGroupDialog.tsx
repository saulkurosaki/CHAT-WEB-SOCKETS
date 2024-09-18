import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Camera, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const NewGroupDialog = () => {
  const [contacts, setContacts] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  const createGroupChat = () => {
    if (newGroupName && selectedGroupMembers.length > 0) {
      // Lógica para crear el grupo
      setNewGroupName("");
      setNewGroupImage(null);
      setSelectedGroupMembers([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[48%]">
          <Plus className="mr-2 h-4 w-4" /> New Group Chat
        </Button>
      </DialogTrigger>
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
  );
};

export default NewGroupDialog;
