export function stringToColor(string: string): string {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export function stringAvatar(name: string) {
  if (!name || typeof name !== 'string') {
    throw new Error('Invalid name provided. Name must be a non-empty string.');
  }
  const nameParts = name.split(' ');
  if (nameParts.length === 0) {
    throw new Error('Name must contain at least one word.');
  }

  const firstLetter = nameParts[0][0];
  const secondLetter =
    nameParts.length > 1 ? nameParts[1][0] : nameParts[0][1] || '';

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstLetter}${secondLetter}`,
  };
}
