import type { Album } from 'types/albums.types';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ENDPOINTS } from 'constants/api';

const fetchAlbums = async (userId: string): Promise<Album[]> => {
  const response = await fetch(`${ENDPOINTS.USERS}/${userId}/albums`);
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  return response.json();
};

export const useAlbums = (userId: string) => {
  return useQuery<Album[]>({
    queryKey: ['albums', userId],
    queryFn: () => fetchAlbums(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};

const createAlbum = async (
  albumData: Partial<Album>,
  userId: string,
): Promise<Album> => {
  console.log('userId', `${ENDPOINTS.USERS}/${userId}/albums`);
  const response = await fetch(`${ENDPOINTS.USERS}/${userId}/albums`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(albumData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      message: 'Unknown error occurred!',
    }));
    throw new Error(errorBody.message || 'Error creating album');
  }

  return response.json();
};

const editAlbum = async (
  albumData: Partial<Album> & { id: string },
): Promise<Album> => {
  const { id, ...details } = albumData;
  const response = await fetch(`${ENDPOINTS.ALBUMS}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      message: 'Failed to update album',
    }));
    throw new Error(errorBody.message);
  }

  return response.json();
};

export const useEditAlbum = (
  userId: string,
  options?: UseMutationOptions<Album, Error, Partial<Album> & { id: string }>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Album, Error, Partial<Album> & { id: string }>({
    mutationFn: (albumData) => editAlbum(albumData),
    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};

export const useCreateAlbum = (
  userId: string,
  options?: UseMutationOptions<Album, Error, Partial<Album>>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Album, Error, Partial<Album>>({
    mutationFn: (albumData) => createAlbum(albumData, userId),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['albums', userId],
      });
      options?.onSuccess?.(...args);
    },
  });
};

const deleteAlbum = async (albumId: string, userId: string): Promise<void> => {
  const response = await fetch(`${ENDPOINTS.ALBUMS}/${albumId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({ message: 'Failed to delete album' }));
    throw new Error(errorBody.message);
  }
};

export const useDeleteAlbum = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (albumId) => deleteAlbum(albumId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['albums', userId],
      });
    },
  });
};
