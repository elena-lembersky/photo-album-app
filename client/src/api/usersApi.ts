import type { User } from 'types/users.types';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ENDPOINTS } from 'constants/api';

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(ENDPOINTS.USERS);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const useUsers = () => {
  return useQuery<User[], Error>({ queryFn: fetchUsers, queryKey: ['users'] });
};

const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await fetch(ENDPOINTS.USERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      message: 'Unknown error occurred!',
    }));

    throw new Error(errorBody.message || 'Error creating user');
  }

  return response.json();
};

export const useCreateUser = (
  options?: UseMutationOptions<User, Error, Partial<User>>,
): UseMutationResult<User, Error, Partial<User>> => {
  const mutationOptions: UseMutationOptions<User, Error, Partial<User>> = {
    mutationFn: createUser,
    ...options,
  };
  return useMutation<User, Error, Partial<User>>(mutationOptions);
};

const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${ENDPOINTS.USERS}/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({ message: 'Failed to delete user' }));
    throw new Error(errorBody.message);
  }
};

const editUser = async (
  userData: Partial<User> & { id: string },
): Promise<User> => {
  const { id, ...userDetails } = userData;
  const response = await fetch(`${ENDPOINTS.USERS}/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDetails),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      message: 'Failed to update user',
    }));
    throw new Error(errorBody.message);
  }

  return response.json();
};

export const useEditUser = (
  options?: UseMutationOptions<User, Error, Partial<User> & { id: string }>,
): UseMutationResult<User, Error, Partial<User> & { id: string }> => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, Partial<User> & { id: string }>({
    mutationFn: editUser,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      options?.onSuccess?.(...args);
    },
  });
};

export const useDeleteUser = (): UseMutationResult<
  void,
  Error,
  string,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};
