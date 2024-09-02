import React, { useState } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import UserList from 'components/UserList';
import CreateUserForm from 'components/CreateUserForm';
import EditUserForm from 'components/EditUserForm';
import useStyles from './UserCabinet.style';
import { useDeleteUser, useEditUser } from 'api/usersApi';
import type { User } from 'types/users.types';

const UserCabinet = () => {
  const classes = useStyles();
  const [editingUser, setEditingUser] = useState<User | null>(null); // Explicit type definition here

  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: editUser } = useEditUser();

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
    editUser(user);
  };

  const handleDeleteUser = (id: string) => {
    console.log('Delete user:', id);
    deleteUser(id);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleClose = () => {
    setEditingUser(null);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        User Cabinet
      </Typography>
      <Grid container spacing={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Users</Typography>
          <UserList onEditUser={handleEdit} onDeleteUser={handleDeleteUser} />
          {editingUser && (
            <EditUserForm user={editingUser} onClose={handleClose} />
          )}
          <CreateUserForm />
        </Paper>
      </Grid>
    </Container>
  );
};

export default UserCabinet;
