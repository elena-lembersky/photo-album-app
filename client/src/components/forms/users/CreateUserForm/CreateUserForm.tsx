import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { useCreateUser } from 'api/usersApi';
import { useQueryClient } from '@tanstack/react-query';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const {
    mutate: createUser,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useCreateUser();
  const queryClient = useQueryClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser(
      { name, email },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          queryClient.invalidateQueries({
            queryKey: ['users'],
          });
        },
      },
    );
  };

  return (
    <Box
      sx={{ minWidth: '400px', width: '100%', maxWidth: '300px', mx: 'auto' }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            {isError && (
              <Typography color="error" sx={{ mt: 2, fontSize: '0.875rem' }}>
                Error: {error?.message}
              </Typography>
            )}
            {isSuccess && (
              <Typography color="success" sx={{ mt: 2, fontSize: '0.875rem' }}>
                User created successfully!
              </Typography>
            )}
          </Grid>
          {!isSuccess && (
            <>
              <Grid item mb={2}>
                <TextField
                  label="Name"
                  variant="outlined"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { textAlign: 'left' } }}
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
            </>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default CreateUserForm;
