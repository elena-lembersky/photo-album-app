import type { User } from 'types/users.types';

export interface UsersListProps {
  users: User[];
  onSelectUser: (userId: string) => void;
  selectedUserId?: string;
}
