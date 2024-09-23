import { AxiosError } from "axios";

import axiosInstance from "@/axios/api";
import { IResponse } from "@/axios";

export const findContactByEmail = async (
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

// Nueva función para guardar el contacto
export const saveContact = async (
  contactData: any
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.post(`/contacts/save`, contactData); // Endpoint ficticio
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al guardar el contacto";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const updateUser = async (
  userId: string,
  userData: any
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, userData);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al actualizar el usuario";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};
