import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  })

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
        Login
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={() => navigate('/auth/register')}
      >
        Don't have an account? Register
      </Button>
    </form>
  );
};