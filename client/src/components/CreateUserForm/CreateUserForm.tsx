import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useCreateUser } from 'api/usersApi';
import { useQueryClient } from '@tanstack/react-query';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { mutate: createUser, status, error } = useCreateUser();
  const queryClient = useQueryClient();
  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isSuccess = status === 'success';

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
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h6">Create New User</Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create User'}
      </Button>
      {isError && (
        <Typography color="error">Error: {error?.message}</Typography>
      )}
      {isSuccess && (
        <Typography color="success">User created successfully!</Typography>
      )}
    </Box>
  );
};

export default CreateUserForm;
