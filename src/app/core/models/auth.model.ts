export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthVerifyResponse {
  valid: boolean;
}
