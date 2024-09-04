import type { Item, NewItem } from 'types/items.types';
import {
  useQuery,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ENDPOINTS } from 'constants/api';

const fetchItems = async (albumId: string): Promise<Item[]> => {
  const response = await fetch(`${ENDPOINTS.ALBUMS}/${albumId}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const useItems = (albumId: string | undefined) => {
  return useQuery<Item[]>({
    queryFn: () => fetchItems(albumId as string),
    queryKey: ['items', albumId],
    enabled: !!albumId,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};

const createItem = async (
  itemData: Partial<NewItem>,
  albumId: string,
): Promise<Item> => {
  const response = await fetch(`${ENDPOINTS.ALBUMS}/${albumId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      message: 'Unknown error occurred!',
    }));
    throw new Error(errorBody.message || 'Error creating item');
  }

  return response.json();
};

export const useCreateItem = (
  albumId: string,
  options?: UseMutationOptions<Item, Error, Partial<NewItem>>,
) => {
  return useMutation<Item, Error, Partial<NewItem>>({
    mutationFn: (itemData) => createItem(itemData, albumId),
    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};

const editItem = async (
  itemData: Partial<Item> & { id: string },
): Promise<Item> => {
  const { id, ...details } = itemData;
  const response = await fetch(`${ENDPOINTS.ITEMS}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      message: 'Failed to update item',
    }));
    throw new Error(errorBody.message);
  }

  return response.json();
};

export const useEditItem = (
  albumId: string,
  options?: UseMutationOptions<Item, Error, Partial<NewItem> & { id: string }>,
) => {
  return useMutation<Item, Error, Partial<NewItem> & { id: string }>({
    mutationFn: editItem,
    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};

const deleteItem = async (itemId: string, albumId: string): Promise<void> => {
  const response = await fetch(`${ENDPOINTS.ITEMS}/${itemId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({ message: 'Failed to delete item' }));
    throw new Error(errorBody.message);
  }
};

export const useDeleteItem = (albumId: string) => {
  return useMutation<void, Error, string>({
    mutationFn: (itemId) => deleteItem(itemId, albumId),
  });
};
