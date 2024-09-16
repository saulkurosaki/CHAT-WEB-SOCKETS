import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useUserStore } from "@/store";

import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const user = await response.json();
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/", { replace: true });
      } catch (error) {
        console.error(error);
        alert("Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl font-bold mb-4 text-center text-teal-600">
        Login
      </h1>
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
