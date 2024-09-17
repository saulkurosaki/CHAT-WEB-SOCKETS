import { AxiosError } from "axios";

import axiosInstance from "@/axios/api";
import { IResponse } from "@/axios";

import { ILoginParams, IRegisterParams, IUserResponse } from "@/interfaces";

export const login = async (
  body: ILoginParams
): Promise<IResponse<IUserResponse>> => {
  try {
    const response = await axiosInstance.post<IUserResponse>(
      "/auth/login",
      body
    );
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Algo salio mal, intenta de nuevo";

    if (error instanceof AxiosError) {
      if (error.response?.status === 401)
        errorMessage = "Credenciales incorrectas";
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const register = async (
  body: FormData
): Promise<IResponse<IUserResponse>> => {
  try {
    const response = await axiosInstance.post<IUserResponse>(
      "/auth/register",
      body
    );
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Algo salió mal, intenta de nuevo";

    if (error instanceof AxiosError) {
      const errorResponse = error.response;

      if (errorResponse?.status === 400) {
        if (errorResponse.data.message.includes("Email already registered"))
          errorMessage = "Correo electrónico ya registrado";

        if (errorResponse.data.message.includes("Username already registered"))
          errorMessage = "Username ya registrado";
      }
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};
