import React, { useState } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import UserList from 'components/UserList';
import CreateUserForm from 'components/CreateUserForm';
import EditUserForm from 'components/EditUserForm';
import RemoveUserForm from 'components/RemoveUserForm';
import Modal from 'components/Modal';
import useStyles from './UserCabinet.style';
import type { User } from 'types/users.types';

const UserCabinet = () => {
  const classes = useStyles();
  const [creatingUser, setCreatingUser] = useState<Boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [removingUser, setRemovingUser] = useState<User | null>(null);

  const handleCreate = () => {
    setCreatingUser(true);
  };
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (user: User) => {
    setRemovingUser(user);
  };

  const handleClose = () => {
    setEditingUser(null);
    setRemovingUser(null);
    setCreatingUser(false);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h1" gutterBottom>
        User Cabinet
      </Typography>
      <Grid container spacing={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Users</Typography>
          <UserList
            onCreateUser={handleCreate}
            onEditUser={handleEdit}
            onDeleteUser={handleDelete}
          />
          {editingUser && (
            <Modal open={true} onClose={handleClose} title="Update User">
              <EditUserForm user={editingUser} />
            </Modal>
          )}
          {removingUser && (
            <Modal open={true} onClose={handleClose} title="Remove User">
              <RemoveUserForm user={removingUser} />
            </Modal>
          )}
          {creatingUser && (
            <Modal open={true} onClose={handleClose} title="Create User">
              <CreateUserForm />
            </Modal>
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default UserCabinet;
