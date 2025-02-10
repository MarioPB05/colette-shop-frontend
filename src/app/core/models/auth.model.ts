export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  birthdate: string;
  dni: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthVerifyResponse {
  valid: boolean;
}
