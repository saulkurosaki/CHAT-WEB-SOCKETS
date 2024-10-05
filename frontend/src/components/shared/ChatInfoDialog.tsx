import { Camera, Info, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store"; // Asegúrate de importar el store para obtener el usuario
import { findUserById } from "@/services/private"; // Asegúrate de importar la función para encontrar usuarios
import { listContacts } from "@/services/private"; // Asegúrate de importar la función para listar contactos

const ChatInfoDialog = ({ currentRoom }: { currentRoom: any }) => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<any>(null); // Estado para almacenar la información del usuario
  const { user } = useUserStore();

  useEffect(() => {
    const fetchContacts = async () => {
      if (user?.email) {
        const response = await listContacts(user.email);
        if (response.ok) {
          setContacts(response.data);
        } else {
          console.error(response.error);
        }
      }
    };

    fetchContacts();
  }, [user]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (currentRoom?.chatRoomType === "private") {
        const memberIds = Object.keys(currentRoom.members);
        for (const memberId of memberIds) {
          if (memberId !== user._id) {
            // Compara con el ID del usuario en sesión
            const response = await findUserById(memberId);
            if (response.ok) {
              setCurrentUser(response.data); // Guarda la información del usuario encontrado
              break; // Salir del bucle una vez que se encuentra el usuario
            }
          }
        }
      }
    };

    fetchCurrentUser();
  }, [currentRoom, user]);

  console.log(currentUser);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info className="h-6 w-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentRoom?.chatRoomType === "public"
              ? "Group Info"
              : "Contact Info"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {currentRoom?.chatRoomType === "public" ? (
            <>
              <div>
                <Label>Group Name</Label>
                <p>{currentRoom.name}</p>
              </div>
              <div>
                <Label>Group Description</Label>
                <p>{currentRoom.description}</p>
              </div>
              <div>
                <Label>Group Avatar</Label>
                {currentRoom.avatar ? (
                  <img
                    src={currentRoom.avatar}
                    alt="Group Avatar"
                    className="w-full h-72 object-cover rounded-md"
                  />
                ) : (
                  <p>No avatar image in this group</p>
                )}
              </div>
              <div>
                <Label>Members</Label>
                <ScrollArea className="h-32 mt-2">
                  {currentRoom.members && currentRoom.members.length > 0 ? (
                    currentRoom.members.map((member: string) => (
                      <p key={member}>{member}</p>
                    ))
                  ) : (
                    <p>No members in this group</p>
                  )}
                </ScrollArea>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label>Name</Label>
                <p>
                  {currentUser?.name} {currentUser?.lastname}
                </p>{" "}
                {/* Nombre y apellido */}
              </div>
              <div>
                <Label>Username</Label>
                <p>{currentUser?.username}</p> {/* Username */}
              </div>
              <div>
                <Label>Email</Label>
                <p>{currentUser?.email}</p> {/* Email */}
              </div>
              <div>
                <Label>Avatar</Label>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="User Avatar"
                    className="w-full h-72 object-cover rounded-md" // Altura igual a la del avatar del grupo
                  />
                ) : (
                  <p>No avatar image for this user</p>
                )}
              </div>
            </>
          )}
          <Button
            variant="destructive"
            onClick={() => {
              /* Lógica para eliminar el chat */
            }}
            className="w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatInfoDialog;
