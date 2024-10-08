import { AxiosError } from "axios";

import axiosInstance from "@/axios/api";
import { IResponse } from "@/axios";

import { compare } from "bcryptjs";
import { onConnect, socket } from '@/test_ws/socket';

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
  userEmail: string,
  contactId: string
): Promise<IResponse<any>> => {
  const contactData = {
    contacts: {
      [contactId]: {
        isBlocked: false,
      },
    },
  };

  try {
    const response = await axiosInstance.patch(
      `/users/${userEmail}/contacts`,
      contactData
    );
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

export const deleteProfile = async (
  userId: string,
  userPassword: string,
  confirmPassword: string
): Promise<IResponse<any>> => {
  // Desencriptar y comparar las contraseñas
  const isPasswordValid = await compare(confirmPassword, userPassword);

  if (!isPasswordValid) {
    return {
      ok: false,
      error: "Las contraseñas no coinciden",
    };
  }

  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al eliminar el perfil";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const listContacts = async (
  userEmail: string
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.get(
      `/users/${userEmail}/contacts?show=full`
    );
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al obtener los contactos";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const deleteContact = async (
  userEmail: string,
  contactId: string
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.delete(
      `/users/${userEmail}/contacts/${contactId}`
    );
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al eliminar el contacto";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const createNewPersonalChat = async (
  contactId: string,
  contactName: string,
  contactLastname: string,
  userName: string,
  userLastname: string
): Promise<IResponse<any>> => {
  const chatRoomData = {
    name: `${userName} ${userLastname} & ${contactName} ${contactLastname} ChatRoom`,
    description: `${userName} ${userLastname} & ${contactName} ${contactLastname} ChatRoom`,
    chatRoomType: "private",
    members: {
      [contactId]: "admin",
    },
  };

  try {
    const response = await axiosInstance.post("/chat-rooms", chatRoomData);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al crear el chat personal";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const createNewGroupChat = async ({
  name,
  description,
  membersArray,
  avatar,
}: {
  name: string;
  description: string;
  membersArray: { [key: string]: string }[];
  avatar: string | null;
}): Promise<IResponse<any>> => {
  const members = membersArray.reduce((acc, member) => {
    acc[member._id] = "user";
    return acc;
  }, {});

  const chatRoomData = {
    name,
    description,
    chatRoomType: "public",
    members,
    avatar,
  };

  try {
    const response = await axiosInstance.post("/chat-rooms", chatRoomData);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al crear el grupo de chat";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const getUserChatRooms = async (
  userId: string
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/users/${userId}/chat-rooms`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al obtener las salas de chat del usuario";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const findUserById = async (id: string): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
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

export const getChatRoomDetails = async (
  chatRoomId: string
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/chat-rooms/${chatRoomId}`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al obtener los detalles de la sala de chat";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};

export const deleteChatRoom = async (
  chatRoomId: string
): Promise<IResponse<any>> => {
  try {
    const response = await axiosInstance.delete(`/chat-rooms/${chatRoomId}`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: unknown | AxiosError) {
    let errorMessage = "Error al eliminar la sala de chat";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return {
      ok: false,
      error: errorMessage,
    };
  }
};
