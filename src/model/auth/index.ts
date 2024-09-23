export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}

export interface Job {
  id: number;
  bonusAmount: number;
  name: string;
}