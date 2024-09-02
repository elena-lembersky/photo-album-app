import type { Album } from 'types/albums.types';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from 'constants/api';

const fetchAlbums = async (userId: string): Promise<Album[]> => {
  const response = await fetch(`${ENDPOINTS.USERS}/${userId}/albums`);
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  return response.json();
};

export const useAlbums = (userId?: string) => {
  return useQuery<Album[]>({
    queryKey: ['users', userId],
    queryFn: () => fetchAlbums(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};
