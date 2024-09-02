import type { Item } from 'types/items.types';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from 'constants/api';

const fetchItems = async (albumId: string): Promise<Item[]> => {
  const response = await fetch(`${ENDPOINTS.ALBUMS}/${albumId}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const useItems = (albumId: string | undefined) => {
  return useQuery({
    queryFn: () => fetchItems(albumId as string),
    queryKey: ['items'],
    enabled: !!albumId,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};
