import React, { useState } from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { User } from 'types/users.types';
import { useDeleteUser, useEditUser } from 'api/usersApi';

interface RemoveUserFormProps {
  user: User;
}

const RemoveUserForm: React.FC<RemoveUserFormProps> = ({ user }) => {
  const [id, setUserID] = useState<string>(user.id);
  const { mutate: deleteUser, status, error } = useDeleteUser();

  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isSuccess = status === 'success';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    deleteUser(id);
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
                  <Typography variant="h6" gutterBottom>
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
