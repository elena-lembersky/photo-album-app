import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { Album } from 'types/albums.types';
import { useEditAlbum } from 'api/albumsApi';
import { useQueryClient } from '@tanstack/react-query';

interface EditAlbumFormProps {
  album: Album;
  userId: string;
}

const EditAlbumForm: React.FC<EditAlbumFormProps> = ({ album, userId }) => {
  const [title, setTitle] = useState<string>(album.title);
  const {
    mutate: updateAlbum,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useEditAlbum(album.id);

  const queryClient = useQueryClient();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateAlbum(
      { id: album.id, title },
      {
        onSuccess: () => {
          setTitle('');
          queryClient.invalidateQueries({
            queryKey: ['albums', userId],
          });
        },
      },
    );
  };

  return (
    <Box
      sx={{ minWidth: '400px', width: '100%', maxWidth: '300px', mx: 'auto' }}
    >
      <Grid item>
        {isError && (
          <Typography color="error" sx={{ mt: 2, fontSize: '0.875rem' }}>
            Error: {error?.message}
          </Typography>
        )}
        {isSuccess && (
          <Typography color="success" sx={{ mt: 2, fontSize: '0.875rem' }}>
            Album updated successfully!
          </Typography>
        )}
      </Grid>
      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
            <Grid item mb={2}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { textAlign: 'left' } }}
                required
                id="title"
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default EditAlbumForm;
