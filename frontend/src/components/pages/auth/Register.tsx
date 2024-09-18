import { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import { register } from "@/services";
import { uploadImage } from "@/services/cloudinaryService";

import { useUserStore } from "@/store";

import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, X } from "lucide-react";

interface InitialForm {
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string | null;
}

export const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const formik = useFormik<InitialForm>({
    initialValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastname: Yup.string().required("Lastname is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const formData = new FormData();
      delete values.avatar;

      if (profileImage) {
        // Validar el tipo de archivo
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(profileImage.type)) {
          toast.error("Invalid image format. Only allowed JPEG, PNG y GIF.");
          setIsLoading(false);
          return;
        }

        try {
          const avatarUrl = await uploadImage(profileImage); // Llama a la función para subir la imagen
          formData.append("avatar", avatarUrl); // Agregar la URL al FormData
        } catch (error) {
          console.error("Error uploading the avatar image:", error);
          toast.error("Error uploading the profile image");
          setIsLoading(false);
          return;
        }
      }

      // Agregar otros valores al FormData
      Object.keys(values).forEach((key) => {
        const value = values[key as keyof InitialForm];
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const { ok, data, error } = await register(formData);

      if (!ok || error || !data) {
        toast.error(error || "There was an issue creating the account :(");
        setIsLoading(false);
        return;
      }

      toast.success("Successfully created!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/", { replace: true });
      setIsLoading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl font-bold mb-4 text-center text-teal-600">
        Register
      </h1>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={formik.values.name}
        error={formik.errors.name}
        touched={formik.touched.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        type="text"
        name="lastname"
        placeholder="Lastname"
        value={formik.values.lastname}
        error={formik.errors.lastname}
        touched={formik.touched.lastname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={formik.values.username}
        error={formik.errors.username}
        touched={formik.touched.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        error={formik.errors.email}
        touched={formik.touched.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formik.values.phone}
        error={formik.errors.phone}
        touched={formik.touched.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        error={formik.errors.password}
        touched={formik.touched.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-4">
        <Label
          htmlFor="profile-image"
          className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
        >
          <Camera className="mr-2 h-4 w-4" />
          <span>Upload Profile Image (Optional)</span>
          <Input
            id="profile-image"
            type="file"
            className="hidden"
            onChange={(e) =>
              setProfileImage(e.target.files ? e.target.files[0] : null)
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
      <Button type="submit" className="w-full mb-2">
        {isLoading ? <Spinner size="size-6" /> : "Register"}
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={() => navigate("/auth/login")}
      >
        Already have an account? Login
      </Button>
    </form>
  );
};
