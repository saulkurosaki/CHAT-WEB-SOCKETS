import { AxiosError } from "axios";

import axiosInstance from "@/axios/api";
import { IResponse } from "@/axios";

export const addContactByEmail = async (
  email: string
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/users/${email}`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Algo salió mal, intenta de nuevo";

    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        errorMessage = "Usuario no encontrado";
      }
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};
