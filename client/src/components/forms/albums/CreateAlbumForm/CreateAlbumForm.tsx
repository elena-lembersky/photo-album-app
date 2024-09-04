import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { useCreateAlbum } from 'api/albumsApi';
import { useQueryClient } from '@tanstack/react-query';

interface CreateAlbumFormProps {
  userId: string;
}

const CreateAlbumForm = ({ userId }: CreateAlbumFormProps) => {
  const [title, setTitle] = useState('');
  const { mutate: createAlbum, status, error } = useCreateAlbum(userId);
  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isSuccess = status === 'success';
  const queryClient = useQueryClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAlbum(
      { title },
      {
        onSuccess: () => {
          setTitle('');
          queryClient.invalidateQueries({
            queryKey: ['albums'],
          });
        },
      },
    );
  };

  return (
    <Box
      sx={{ minWidth: '400px', width: '100%', maxWidth: '300px', mx: 'auto' }}
    >
      {isError && (
        <Typography color="error" sx={{ mt: 2, fontSize: '0.875rem' }}>
          Error: {error?.message}
        </Typography>
      )}
      {isSuccess && (
        <Typography color="success" sx={{ mt: 2, fontSize: '0.875rem' }}>
          Album created successfully!
        </Typography>
      )}
      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
            <Grid item mb={2}>
              <TextField
                label="Title"
                variant="outlined"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { textAlign: 'left' } }}
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
        </form>
      )}
    </Box>
  );
};

export default CreateAlbumForm;
