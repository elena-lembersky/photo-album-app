import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { useCreateItem } from 'api/itemsApi';
import { useQueryClient } from '@tanstack/react-query';

interface CreateItemFormProps {
  albumId: string;
}

const CreateItemForm = ({ albumId }: CreateItemFormProps) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { mutate: createItem, status, error } = useCreateItem(albumId);
  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isSuccess = status === 'success';
  const queryClient = useQueryClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedimageId = /^\d+$/.test(url) ? url.toString() : url;
    createItem(
      { title: title || undefined, imageId: formattedimageId },
      {
        onSuccess: () => {
          setTitle('');
          setUrl('');
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
        <Typography color="error" sx={{ mt: 2, fontSize: '0.875rem' }}>
          Error: {error?.message}
        </Typography>
      )}
      {isSuccess && (
        <Typography color="success" sx={{ mt: 2, fontSize: '0.875rem' }}>
          Item created successfully!
        </Typography>
      )}

      {!isSuccess && (
        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          <Grid item mb={2}>
            <TextField
              label="Title"
              variant="outlined"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item mb={2}>
            <TextField
              label="Image ID"
              variant="outlined"
              id="imageId"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CreateItemForm;
