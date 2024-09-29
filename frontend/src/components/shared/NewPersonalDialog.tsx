import React, { useState, useEffect } from "react";
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
import NewContactDialog from "./NewContactDialog";
import { listContacts } from "@/services/private"; // Importa la nueva función
import { useUserStore } from "@/store";

const NewPersonalDialog = () => {
  const [contacts, setContacts] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchContacts = async () => {
      if (user?.email) {
        const response = await listContacts(user?.email);
        if (response.ok) {
          setContacts(response.data); // Asigna los contactos obtenidos
        } else {
          console.error(response.error);
        }
      }
    };

    fetchContacts();
  }, [user?.email]);

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

        <NewContactDialog />
      </DialogContent>
    </Dialog>
  );
};

export default NewPersonalDialog;
