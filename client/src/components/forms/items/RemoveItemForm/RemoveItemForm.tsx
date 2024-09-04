import React from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { Item } from 'types/items.types';
import { useDeleteItem } from 'api/itemsApi';
import { useQueryClient } from '@tanstack/react-query';

interface RemoveItemFormProps {
  item: Item;
  albumId: string;
}

const RemoveItemForm: React.FC<RemoveItemFormProps> = ({ item, albumId }) => {
  const {
    mutate: deleteItem,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useDeleteItem(item.id);

  const queryClient = useQueryClient();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteItem(item.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['items', albumId],
        });
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ minWidth: '400px', width: '100%', maxWidth: '300px', mx: 'auto' }}
    >
      {isError && (
        <Typography color="error">Error: {error?.message}</Typography>
      )}
      {isSuccess && (
        <Typography color="success">Item removed successfully!</Typography>
      )}
      {!isSuccess && (
        <>
          <Typography component="p" gutterBottom>
            Are you sure you want to remove the item <br /> {item.title}?
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Removing...' : 'Remove'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default RemoveItemForm;
