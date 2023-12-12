export default interface UserModel {
  username: User;
  access_token: string;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  full_name: string;
  avatar: string;
  role: string;
}
