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
import { useAlbums } from 'api/albumsApi';
import { Album } from 'types/albums.types';
import { Item } from 'types/items.types';
import { useItems } from 'api/itemsApi';

interface ItemsEditListProps {
  onCreateItem: () => void;
  onEditItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  items: Array<Item>;
}

const ItemsEditList: React.FC<ItemsEditListProps> = ({
  onEditItem,
  onDeleteItem,
  onCreateItem,
  items,
}) => {
  useEffect(() => {
    console.log({ items });
  }, []);

  return (
    <Box>
      <List>
        {items?.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <img src={item.url} alt={`Thumbnail ${index}`} width={100} />
              <Typography component="p" gutterBottom>
                {item.title}
              </Typography>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEditItem(item)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteItem(item)}
              >
                <Delete />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ textAlign: 'right', p: 5 }}>
        <IconButton
          edge="end"
          aria-label="add"
          onClick={onCreateItem}
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
  );
};

export default ItemsEditList;
