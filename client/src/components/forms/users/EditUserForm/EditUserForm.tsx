import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { User } from 'types/users.types';
import { useEditUser } from 'api/usersApi';

interface EditUserFormProps {
  user: User;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const { mutate: updateUser, status, error } = useEditUser();

  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isSuccess = status === 'success';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(
      { id: user.id, name, email },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
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
            User updated successfully!
          </Typography>
        )}
      </Grid>
      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
            <Grid item mb={2}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { textAlign: 'left' } }}
                required
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { textAlign: 'left' } }}
                required
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

export default EditUserForm;
