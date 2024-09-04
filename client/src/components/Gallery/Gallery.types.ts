export interface Photo {
  id: string;
  albumId: string;
  url: string;
  title?: string;
}

export interface GalleryProps {
  open: boolean;
  photos: GalleryPhoto[];
  onClose: () => void;
}

export interface GalleryPhoto {
  src: string;
  title?: string;
}
