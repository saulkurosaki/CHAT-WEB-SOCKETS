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
import { useUserStore } from "@/store";
import { deleteProfile } from "@/services/private";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DeleteProfileConfirmationDialog = () => {
  const { user, setUser } = useUserStore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const deleteProfileHandler = async () => {
    if (user) {
      const response = await deleteProfile(
        user._id,
        user.password,
        confirmPassword
      );
      if (response.ok) {
        toast.success("Successfully deleted! See you next time pal :D");
        setTimeout(() => {
          // Redirige a la página de Login después de 1 segundo
          localStorage.clear();
          setUser(null);
          navigate("/auth/login", { replace: true });
        }, 1000);
      } else {
        const errorMessage = response.error || "Error desconocido";
        if (errorMessage === "Las contraseñas no coinciden") {
          toast.error("Ohh Sorry, Passwords doesn't match :(");
        } else if (errorMessage === "Error al eliminar el perfil") {
          toast.error(
            "There was a problem deleting your profile, try again later!"
          );
        } else {
          toast.error(errorMessage); // Manejo de otros errores
        }
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
