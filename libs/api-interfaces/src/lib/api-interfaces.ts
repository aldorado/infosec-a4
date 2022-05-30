export interface Message {
  message: string;
  user: string;
}

export interface User {
  name: string;
  password: string;
}

export interface LoggedInUser {
  name: string;
  sessionId: string;
}