import { useState, useEffect } from "react";
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
import ContactCard from "./ContactCard"; // Importa el nuevo componente
import {
  listContacts,
  deleteContact,
  createNewPersonalChat,
} from "@/services/private"; // Importa las funciones
import { useUserStore } from "@/store";
import NewContactDialog from "./NewContactDialog";
import toast from "react-hot-toast";

const NewPersonalDialog = () => {
  const [contacts, setContacts] = useState([]);
  const { user, setUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

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
  }, [user]);

  const handleDeleteContact = async (contactId: any) => {
    if (user?.email) {
      const response = await deleteContact(user.email, contactId);
      if (response.ok) {
        setUser({ ...user, ...response.data });
        toast.success("Contact deleted successfully!");
      } else {
        console.error(response.error);
      }
    }
  };

  const createPersonalChat = async (contact: any) => {
    const { name: contactName, lastname: contactLastname } = contact;
    const userName = user!.name;
    const userLastname = user!.lastname;

    const response = await createNewPersonalChat(
      contact._id, // ID del contacto
      contactName, // Nombre del contacto
      contactLastname, // Apellido del contacto
      userName, // Nombre del usuario
      userLastname // Apellido del usuario
    );

    if (response.ok) {
      handleClose();
      toast.success(
        `Welcome to your chat with ${contactName} ${contactLastname}`
      );
    } else {
      toast.error(response.error || "Error creating the ChatRoom :(");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <ContactCard
              key={contact._id}
              contact={contact}
              onDelete={handleDeleteContact}
              onClick={() => createPersonalChat(contact)}
            />
          ))}
        </ScrollArea>

        <NewContactDialog />
      </DialogContent>
    </Dialog>
  );
};

export default NewPersonalDialog;
