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
import { useUserStore } from "@/store"; // Asegúrate de importar el store para obtener contactos
import { listContacts } from "@/services/private"; // Asegúrate de importar la función para listar contactos

const ChatInfoDialog = ({ currentRoom }: { currentRoom: any }) => {
  const [contacts, setContacts] = useState([]);
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
