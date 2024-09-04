import React, { useState } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import UserList from 'components/UserEditList';
import CreateUserForm from 'components/forms/users/CreateUserForm';
import EditUserForm from 'components/forms/users/EditUserForm';
import RemoveUserForm from 'components/forms/users/RemoveUserForm';
import Modal from 'components/Modal';
import type { User } from 'types/users.types';

const UserManager = () => {
  const [creatingUser, setCreatingUser] = useState<Boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [removingUser, setRemovingUser] = useState<User | null>(null);

  const handleCreate = () => setCreatingUser(true);
  const handleEdit = (user: User) => setEditingUser(user);
  const handleDelete = (user: User) => setRemovingUser(user);

  const handleClose = () => {
    setEditingUser(null);
    setRemovingUser(null);
    setCreatingUser(false);
  };

  return (
    <Container sx={{ mt: 8, maxWidth: '90%' }}>
      <Grid container spacing={4} sx={{ mb: 30 }}>
        <Paper sx={{ padding: 2, minWidth: '600px', width: '100%' }}>
          <UserList
            onCreateUser={handleCreate}
            onEditUser={handleEdit}
            onDeleteUser={handleDelete}
          />
          {(editingUser || removingUser || creatingUser) && (
            <Modal
              open={true}
              onClose={handleClose}
              title={`${creatingUser ? 'Create' : editingUser ? 'Update' : 'Remove'} User`}
            >
              {creatingUser && <CreateUserForm />}
              {editingUser && <EditUserForm user={editingUser} />}
              {removingUser && <RemoveUserForm user={removingUser} />}
            </Modal>
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default UserManager;
