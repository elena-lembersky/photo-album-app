import React, { useRef } from 'react';
import { Lightbox, ThumbnailsRef } from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import type { GalleryPhoto } from './Gallery.types';

export interface GalleryProps {
  open: boolean;
  photos: GalleryPhoto[];
  onClose: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ open, photos, onClose }) => {
  const thumbnailsRef = useRef<ThumbnailsRef>(null);

  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={photos}
      plugins={[Thumbnails]}
      thumbnails={{ ref: thumbnailsRef }}
      styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .8)' } }}
      on={{
        click: () => {
          (thumbnailsRef.current?.visible
            ? thumbnailsRef.current?.hide
            : thumbnailsRef.current?.show)?.();
        },
      }}
      render={{
        buttonClose: () => (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'white',
              zIndex: 1000,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        ),
      }}
    />
  );
};

export default Gallery;
