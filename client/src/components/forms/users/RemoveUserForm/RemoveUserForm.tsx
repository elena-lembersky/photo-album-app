import React from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { User } from 'types/users.types';
import { useDeleteUser } from 'api/usersApi';

interface RemoveUserFormProps {
  user: User;
}

const RemoveUserForm: React.FC<RemoveUserFormProps> = ({ user }) => {
  const {
    mutate: deleteUser,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useDeleteUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteUser(user.id);
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
                    Are you sure you want to remove the user: {user?.name}?
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
                User removed successfully!
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RemoveUserForm;
