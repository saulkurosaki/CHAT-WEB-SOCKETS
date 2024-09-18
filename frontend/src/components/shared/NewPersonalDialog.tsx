import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import NewContactDialog from "./NewContactDialog"; // Importar el componente

const NewPersonalDialog = ({
  showNewContactDialog,
  setShowNewContactDialog,
}) => {
  const [contacts, setContacts] = useState([]);

  const createPersonalChat = (contact) => {};

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
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
                <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
              </Avatar>
              <span>{contact.name}</span>
            </div>
          ))}
        </ScrollArea>
        <Button onClick={() => setShowNewContactDialog(true)} className="mt-4">
          Add New Contact
        </Button>
      </DialogContent>
      <NewContactDialog
        showNewContactDialog={showNewContactDialog}
        setShowNewContactDialog={setShowNewContactDialog}
      />
    </Dialog>
  );
};

export default NewPersonalDialog;
