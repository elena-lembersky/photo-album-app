import React from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { Album } from 'types/albums.types';
import { useDeleteAlbum } from 'api/albumsApi';
import { useQueryClient } from '@tanstack/react-query';

interface RemoveAlbumFormProps {
  album: Album;
  userId: string;
}

const RemoveAlbumForm: React.FC<RemoveAlbumFormProps> = ({ album, userId }) => {
  const {
    mutate: deleteAlbum,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useDeleteAlbum(album.id);

  const queryClient = useQueryClient();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteAlbum(album.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['albums', userId],
        });
      },
    });
  };

  return (
    <Box
      sx={{ minWidth: '400px', width: '100%', maxWidth: '300px', mx: 'auto' }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            {!isSuccess && (
              <>
                <Grid item>
                  <Typography component="p" gutterBottom>
                    Are you sure you want to remove the album: {album?.title}?
                  </Typography>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </>
            )}
          </Grid>
          <Grid item>
            {isError && (
              <Typography color="error" sx={{ mt: 2, fontSize: '0.875rem' }}>
                Error: {error?.message}
              </Typography>
            )}
            {isSuccess && (
              <Typography color="success" sx={{ mt: 2, fontSize: '0.875rem' }}>
                Album removed successfully!
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RemoveAlbumForm;
