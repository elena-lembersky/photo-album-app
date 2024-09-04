export interface Item {
  id: string;
  title?: string;
  albumId: string;
  url: string;
}

export interface NewItem {
  id: string;
  title?: string;
  albumId: string;
  imageId: string;
}
