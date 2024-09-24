import { AxiosError } from "axios";

import axiosInstance from "@/axios/api";
import { IResponse } from "@/axios";

import { IUser } from "@/interfaces";

export const getAllUsers = async (): Promise<IResponse<IUser[]>> => {
  try {
    const response = await axiosInstance.get<IUser[]>("/users");
    
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    console.log(error);
    let errorMessage = "Error al obtener los usuarios";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};