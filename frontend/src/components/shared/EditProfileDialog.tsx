import { useState } from "react";
import { useUserStore } from "@/store";
import { updateUser } from "@/services/private";
import { Camera, User, X } from "lucide-react";
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
import DeleteProfileConfirmationDialog from "./DeleteProfileConfirmationDialog";

const EditProfileDialog = () => {
  const { user } = useUserStore();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const updateProfile = async () => {
    const userId = user?._id; // Obtener el ID del usuario

    const userData: any = {};
    if (name) userData.name = name;
    if (lastname) userData.lastname = lastname;
    if (username) userData.username = username;
    if (phoneNumber) userData.phone = phoneNumber;
    if (profileImage) {
      // Aquí podrías manejar la subida de la imagen si es necesario
      // Por ejemplo, subir la imagen a un servicio y luego agregar la URL a userData
    }

    if (userId) {
      try {
        const response = await updateUser(userId, userData);
        if (response.ok) {
          // Manejo de la respuesta exitosa
          console.log("Perfil actualizado con éxito:", response.data);
          // Aquí podrías cerrar el diálogo o mostrar un mensaje de éxito
        } else {
          throw new Error(response.error || "Error al actualizar el perfil");
        }
      } catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
          console.error("Error al actualizar el perfil:", error.message);
        } else {
          console.error("Error al actualizar el perfil:", error);
        }
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <User className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
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
                onChange={(e) =>
                  e.target.files && setProfileImage(e.target.files[0])
                }
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
          <DeleteProfileConfirmationDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
