import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Album } from 'types/albums.types';

interface AlbumsEditListProps {
  onEditAlbum: (album: Album) => void;
  onDeleteAlbum: (album: Album) => void;
  onCreateAlbum: () => void;
  onSelectAlbum: (album: Album) => void;
  albums: Array<Album>;
}

const AlbumsEditList: React.FC<AlbumsEditListProps> = ({
  onCreateAlbum,
  onEditAlbum,
  onDeleteAlbum,
  onSelectAlbum,
  albums,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(albums[0] || {});
  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbum(album);
    onSelectAlbum(album);
  };

  if (!albums.length) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box>
          <List>
            {albums?.map((album) => (
              <React.Fragment key={album.id}>
                <ListItem
                  onClick={() => handleSelectAlbum(album)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor:
                      album.id === selectedAlbum.id ? '#FFC5F3' : 'inherit',
                  }}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onEditAlbum(album)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDeleteAlbum(album)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={album.title} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ textAlign: 'right', p: 5 }}>
            <IconButton
              edge="end"
              aria-label="add"
              onClick={onCreateAlbum}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                right: 5,
                '&:hover': {
                  color: 'black',
                  backgroundColor: 'white',
                },
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}></Grid>
    </Grid>
  );
};

export default AlbumsEditList;
