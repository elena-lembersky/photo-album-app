import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { User, UpdateUserData } from 'types/users.types';
import { useCreateUser, useEditUser } from 'api/usersApi';

interface EditUserFormProps {
  user: User;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const { mutate: updateUser, status, error } = useEditUser();
  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isSuccess = status === 'success';

  const handleSubmit = () => {
    //updateUser.mutate({ id: user.id, name, email });
    updateUser(
      { id: user.id, name, email },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={Boolean(user)}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
        {isError && (
          <Typography color="error">Error: {error?.message}</Typography>
        )}
        {isSuccess && (
          <Typography color="success">User created successfully!</Typography>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditUserForm;
