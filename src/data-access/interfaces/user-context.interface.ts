interface AuthenticatedUser {
  id: string;
  username: string;
}

export interface UserContext {
  req: {
    user: AuthenticatedUser;
  }
}
