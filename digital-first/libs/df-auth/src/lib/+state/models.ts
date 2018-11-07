export interface User {
  title: string;
  email: string;
  background?: string;
  displayType?: string;
  size?: number;
}

export interface Authenticate {
  username: string;
  password: string;
}

export interface AuthResult {
  source?: string;
  idToken: string;
}
