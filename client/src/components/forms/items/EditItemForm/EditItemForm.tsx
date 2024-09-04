import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Item } from 'types/items.types';
import { useEditItem } from 'api/itemsApi';
import { useQueryClient } from '@tanstack/react-query';

interface EditItemFormProps {
  item: Item;
  albumId: string;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, albumId }) => {
  const [title, setTitle] = useState<string>(item.title || '');
  const {
    mutate: updateItem,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useEditItem(item.id);

  const queryClient = useQueryClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateItem(
      { id: item.id, title: title || undefined },
      {
        onSuccess: () => {
          setTitle('');
          queryClient.invalidateQueries({
            queryKey: ['items', albumId],
          });
        },
      },
    );
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
        <Typography color="success">Item updated successfully!</Typography>
      )}
      {!isSuccess && (
        <>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default EditItemForm;
