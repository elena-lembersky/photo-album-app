export interface Album {
  id: string;
  title: string;
  userId: string;
  coverImage?: string | null;
}

export interface AlbumsListProps {
  albums: Album[];
}
