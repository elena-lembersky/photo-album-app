export interface Photo {
  id: string;
  albumId: string;
  url: string;
  title?: string;
}

export interface GalleryPhoto {
  src: string;
  title?: string;
}
