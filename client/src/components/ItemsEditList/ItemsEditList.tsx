import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Item } from 'types/items.types';

interface ItemsEditListProps {
  onCreateItem: () => void;
  onEditItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  items: Array<Item>;
  displayTitle?: boolean;
}

const ItemsEditList: React.FC<ItemsEditListProps> = ({
  onEditItem,
  onDeleteItem,
  onCreateItem,
  items,
  displayTitle = false,
}) => {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              position: 'relative',
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={item.url}
              alt={`Thumbnail ${item.title}`}
            />
            {displayTitle && (
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minHeight: '20px' }}
                >
                  {item.title || ' '}
                </Typography>
              </CardContent>
            )}
            <CardActions
              sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                display: 'flex',
              }}
            >
              <IconButton onClick={() => onEditItem(item)} color="inherit">
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDeleteItem(item)} color="inherit">
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          onClick={onCreateItem}
          sx={{
            color: 'primary.main',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          <Add />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ItemsEditList;
