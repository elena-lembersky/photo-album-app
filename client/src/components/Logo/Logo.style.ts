export const logoStyles = (size: 'small' | 'medium' | 'large') => {
  const sizes = {
    small: { width: '81px', height: '14px' },
    medium: { width: '163px', height: '27px' },
    large: { width: '244px', height: '40px' },
  };

  return {
    width: sizes[size].width,
    height: sizes[size].height,
    cursor: 'pointer',
  };
};
