// export interface IUser {
//   name: string;
//   lastname: string;
//   username: string;
//   email: string;
//   phoneNumber: string;
//   profileImage?: string | null;
// }

export interface IUserResponse {
  user: IUser;
  token: string;
}

export interface IUser {
  _id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string | null;
  isConnected: boolean;
  isDeleted: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
