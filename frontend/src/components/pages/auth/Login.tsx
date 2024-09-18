import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { login } from "@/services";

import { useUserStore } from "@/store";

import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      const { ok, data, error } = await login(values);

      if (!ok || error || !data) {
        toast.error(error || "Login failed");
        setIsLoading(false);
        return;
      }

      toast.success("Welcome Again!");
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
        Login
      </h1>
      <Input
        type="email"
        name="emailOrUsername"
        placeholder="Email"
        value={formik.values.emailOrUsername}
        error={formik.errors.emailOrUsername}
        touched={formik.touched.emailOrUsername}
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
      <Button type="submit" className="w-full mb-2">
        {isLoading ? <Spinner size="size-6" /> : "Login"}
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={() => navigate("/auth/register")}
      >
        Don't have an account? Register
      </Button>
    </form>
  );
};
