export interface User {
  id: number;
  username: string;
  email: string;
  activo: boolean;
  role: Role;
}

export interface Role {
  name: string;
  description: string;
  id: number;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface LoginResponse {
  access_token: string;
  access_token_expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  user: User;
}
