import React, { useState, useEffect } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from '@mui/material';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { AlbumsListProps, Album } from './AlbumsList.types';
import Gallery from '../Gallery';
import { useItems } from 'api/itemsApi';

const AlbumsList = ({ albums = [] }: AlbumsListProps) => {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (album: Album) => {
    setActiveAlbum(album);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const { data: albumPhotos = [], refetch } = useItems(activeAlbum?.id);

  useEffect(() => {
    if (activeAlbum) {
      refetch();
    }
  }, [activeAlbum, refetch]);

  return (
    <>
      <ImageList variant="masonry" cols={3} gap={8}>
        {albums?.map((item) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleOpen(item)}
            sx={{
              position: 'relative',
              width: '100%',
              paddingBottom: '75%',
              backgroundColor: '#f0f0f0',
              cursor: 'pointer',
              '& img': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              },
              '&:hover': {
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
              },
            }}
          >
            {item.coverImage ? (
              <img
                srcSet={`${item.coverImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.coverImage}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ position: 'absolute', top: 0, left: 0 }}
              />
            )}
            <ImageListItemBar title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
      {activeAlbum && (
        <Gallery
          open={open}
          photos={albumPhotos.map((photo) => ({
            src: photo.url,
            title: photo.title,
          }))}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default AlbumsList;
