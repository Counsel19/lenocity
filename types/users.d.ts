export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
  createdAt: string;
}

export interface IUserPassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
