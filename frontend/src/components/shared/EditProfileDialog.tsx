import { useState } from "react";
import { useUserStore } from "@/store";
import { updateUser } from "@/services/private";
import { Camera, User, X } from "lucide-react";
import { uploadImage } from "@/services/cloudinaryService";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import toast from "react-hot-toast";

const EditProfileDialog = () => {
  const { user, setUser } = useUserStore();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Agregar estado para controlar el diálogo

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      username: "",
      phone: "",
      avatar: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().optional(),
      lastname: Yup.string().optional(),
      username: Yup.string().optional(),
      phone: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      const userId = user?._id;
      const userData: any = {};

      // Solo agregar los campos que están llenos
      if (values.name) userData.name = values.name;
      if (values.lastname) userData.lastname = values.lastname;
      if (values.username) userData.username = values.username;
      if (values.phone) userData.phone = values.phone;

      if (profileImage) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(profileImage.type)) {
          toast.error("Invalid image format. Only allowed JPEG, PNG y GIF.");
          return;
        }

        try {
          const avatarUrl = await uploadImage(profileImage);
          userData.avatar = avatarUrl; // Agregar la URL de la imagen al objeto de datos
        } catch (error) {
          console.error("Error uploading the avatar image:", error);
          toast.error("Error uploading the profile image");
          return;
        }
      }

      if (userId) {
        try {
          const response = await updateUser(userId, userData);
          if (response.ok) {
            setUser({ ...user, ...response.data }); // Actualizar el usuario en el store
            toast.success("Successfully updated!");
            handleClose(); // Cerrar el diálogo después de la actualización
          }
        } catch (error) {
          console.error("Error al actualizar el perfil:", error);
        }
      }
    },
  });

  const handleClose = () => {
    setIsOpen(false); // Función para cerrar el diálogo
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {" "}
      {/* Controlar el estado del diálogo */}
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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastname">Lastname</Label>
            <Input
              id="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className="text-red-500">{formik.errors.lastname}</p>
            )}
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500">{formik.errors.username}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <Label
              htmlFor="profile-image"
              className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
            >
              <Camera className="mr-2 h-4 w-4" />
              <span>Change Profile Image</span>
              <Input
                id="profile-image"
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
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
          <DeleteProfileConfirmationDialog />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
