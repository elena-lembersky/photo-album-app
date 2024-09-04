import React from 'react';
import { Lightbox } from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import type { GalleryProps } from './Gallery.types';

const Gallery: React.FC<GalleryProps> = ({ open, photos, onClose }) => {
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={photos}
      plugins={[Thumbnails]}
      styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .8)' } }}
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
        slide: ({ slide }) => (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={slide.src}
              alt={slide.alt || 'Image'}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            {slide.alt && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: '100%',
                  textAlign: 'center',
                  color: 'white',
                  textShadow: '0 0 8px rgba(0, 0, 0, 0.7)',
                  fontSize: '16px',
                  padding: '5px 10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                {slide.alt}
              </div>
            )}
          </div>
        ),
      }}
    />
  );
};

export default Gallery;
