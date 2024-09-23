import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { useUserStore } from "@/store"; // Asegúrate de importar useUserStore
import { deleteProfile } from "@/services/private"; // Importa la función deleteProfile

const DeleteProfileConfirmationDialog = () => {
  const { user } = useUserStore();
  const [confirmPassword, setConfirmPassword] = useState("");

  const deleteProfileHandler = async () => {
    if (user) {
      const response = await deleteProfile(
        user._id,
        user.password,
        confirmPassword
      );
      if (response.ok) {
        // Manejar la eliminación exitosa (por ejemplo, redirigir o mostrar un mensaje)
        console.log("Perfil eliminado con éxito");
      } else {
        // Manejar el error
        console.error(response.error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Profile Deletion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Please enter your password to confirm profile deletion:</p>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button
            variant="destructive"
            onClick={deleteProfileHandler}
            className="w-full"
          >
            Confirm Deletion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfileConfirmationDialog;
