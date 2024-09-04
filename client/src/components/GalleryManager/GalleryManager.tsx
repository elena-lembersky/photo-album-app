import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import AlbumsEditList from 'components/AlbumsEditList';
import ItemsEditList from 'components/ItemsEditList';

import CreateAlbumForm from 'components/forms/albums/CreateAlbumForm';
import RemoveAlbumForm from 'components/forms/albums/RemoveAlbumForm';
import EditAlbumForm from 'components/forms/albums/EditAlbumForm';
import CreateItemForm from 'components/forms/items/CreateItemForm';
import EditItemForm from 'components/forms/items/EditItemForm';
import RemoveItemForm from 'components/forms/items/RemoveItemForm';

import Modal from 'components/Modal';
import type { Album } from 'types/albums.types';
import type { Item } from 'types/items.types';
import { useItems } from 'api/itemsApi';
import { useAlbums } from 'api/albumsApi';

const CURRENT_USER_ID = '01f5217d-3ab8-43b7-9cb1-d72ed7b29e5d';

const GalleryManager = () => {
  const [creatingAlbum, setCreatingAlbum] = useState<boolean>(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [removingAlbum, setRemovingAlbum] = useState<Album | null>(null);

  const [creatingItem, setCreatingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [removingItem, setRemovingItem] = useState<Item | null>(null);

  const { data: albums = [], isLoading: loadingAlbums } =
    useAlbums(CURRENT_USER_ID);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(albums[0]);

  const { data: albumItems = [], refetch: refetchItems } = useItems(
    selectedAlbum?.id,
  );

  const handleCreateAlbum = () => setCreatingAlbum(true);
  const handleEditAlbum = (album: Album) => setEditingAlbum(album);
  const handleDeleteAlbum = (album: Album) => setRemovingAlbum(album);
  const handleSelectAlbum = (album: Album) => setSelectedAlbum(album);

  const handleCreateItem = () => setCreatingItem(true);
  const handleEditItem = (item: Item) => setEditingItem(item);
  const handleDeleteItem = (item: Item) => setRemovingItem(item);

  const handleModalClose = () => {
    setCreatingAlbum(false);
    setEditingAlbum(null);
    setRemovingAlbum(null);

    setCreatingItem(false);
    setEditingItem(null);
    setRemovingItem(null);
  };

  useEffect(() => {
    if (albums.length > 0) {
      setSelectedAlbum(albums[0]);
    }
  }, [albums]);

  useEffect(() => {
    if (albums.length > 0 && !selectedAlbum) {
      setSelectedAlbum(albums[0]);
    }
  }, [albums, selectedAlbum]);

  return (
    <Container>
      <Typography variant="h1" gutterBottom sx={{ p: 10 }}>
        User Manager
      </Typography>
      <Grid container spacing={4} sx={{ mb: 30 }}>
        <Grid item xs={4} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="left" sx={{ p: 5 }}>
              All My Albums:
            </Typography>
            {albums.length && (
              <AlbumsEditList
                onCreateAlbum={handleCreateAlbum}
                onEditAlbum={handleEditAlbum}
                onDeleteAlbum={handleDeleteAlbum}
                onSelectAlbum={handleSelectAlbum}
                albums={albums}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <ItemsEditList
            items={albumItems}
            onCreateItem={handleCreateItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
          />
        </Grid>
      </Grid>

      {(creatingAlbum || editingAlbum || removingAlbum) && (
        <Modal
          open={true}
          onClose={handleModalClose}
          title={`${creatingAlbum ? 'Create' : editingAlbum ? 'Update' : 'Remove'} Album`}
        >
          {creatingAlbum && <CreateAlbumForm userId={CURRENT_USER_ID} />}
          {editingAlbum && (
            <EditAlbumForm userId={CURRENT_USER_ID} album={editingAlbum} />
          )}
          {removingAlbum && (
            <RemoveAlbumForm userId={CURRENT_USER_ID} album={removingAlbum} />
          )}
        </Modal>
      )}

      {creatingItem && (
        <Modal open={true} onClose={handleModalClose} title="Create Item">
          <CreateItemForm albumId={selectedAlbum.id} />
        </Modal>
      )}
      {editingItem && (
        <Modal open={true} onClose={handleModalClose} title="Edit Item">
          <EditItemForm item={editingItem} albumId={selectedAlbum.id} />
        </Modal>
      )}
      {removingItem && (
        <Modal open={true} onClose={handleModalClose} title="Remove Item">
          <RemoveItemForm item={removingItem} albumId={selectedAlbum.id} />
        </Modal>
      )}
    </Container>
  );
};

export default GalleryManager;
