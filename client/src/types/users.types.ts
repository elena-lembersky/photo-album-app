export interface User {
  id: string;
  name: string;
  email: string;
  albumCount: number;
  isSelected?: boolean;
}

export interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
}
