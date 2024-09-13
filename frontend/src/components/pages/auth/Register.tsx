import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Camera, X } from "lucide-react";

import { useUserStore } from "@/store";

import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InitialForm {
  name: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  profileImage: File | null;
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
      phoneNumber: "",
      password: "",
      profileImage: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastname: Yup.string().required("Lastname is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        const user = {
          ...values,
          profileImage: profileImage ? URL.createObjectURL(profileImage) : null,
        };
        localStorage.setItem("token", "123456");
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/", { replace: true });
        setIsLoading(false);
      }, 2000);
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
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber}
        touched={formik.touched.phoneNumber}
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
