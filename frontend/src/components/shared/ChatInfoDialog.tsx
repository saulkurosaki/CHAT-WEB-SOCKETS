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
import { findUserById, deleteChatRoom } from "@/services/private"; // Asegúrate de importar las funciones necesarias
import { useParams, useNavigate } from "react-router-dom"; // Importar useParams y useNavigate
import toast from "react-hot-toast";

const ChatInfoDialog = ({ currentRoom }: { currentRoom: any }) => {
  const { user } = useUserStore();
  const { id: chatRoomId } = useParams(); // Obtener el chatRoomId de los parámetros de la URL
  const navigate = useNavigate(); // Inicializar useNavigate
  const [currentUser, setCurrentUser] = useState<any>(null); // Estado para almacenar la información del usuario
  const [membersInfo, setMembersInfo] = useState<any[]>([]); // Estado para almacenar la información de los miembros

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

    console.log(chatRoomId);
    fetchCurrentUser();
  }, [currentRoom, user]);

  useEffect(() => {
    const fetchMembersInfo = async () => {
      if (currentRoom?.chatRoomType === "public") {
        const memberIds = Object.keys(currentRoom.members);
        const membersData = await Promise.all(
          memberIds.map(async (memberId) => {
            const response = await findUserById(memberId);
            return response.ok ? response.data : null; // Retorna la información del miembro o null
          })
        );
        setMembersInfo(membersData.filter(Boolean)); // Filtra los miembros que no se encontraron
      }
    };

    fetchMembersInfo();
  }, [currentRoom]);

  const handleDeleteChat = async () => {
    if (chatRoomId) {
      const response = await deleteChatRoom(chatRoomId);
      if (response.ok) {
        navigate("/");
        setTimeout(() => {
          toast.success("ChatRoom deleted successfully");
        }, 100);
      } else {
        toast.error("Error deleting ChatRoom");
        console.error("Error deleting chat room:", response.error);
      }
    }
  };

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
                  {membersInfo.length > 0 ? (
                    membersInfo.map((member) => (
                      <p
                        key={member._id}
                      >{`${member.name} ${member.lastname}`}</p>
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
            onClick={handleDeleteChat}
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
