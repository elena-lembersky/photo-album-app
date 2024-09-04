export function extractImageIdFromUrl(url: string): string | null {
  const match = url.match(/\/id\/(\d+)\/\d+\/\d+/);
  return match ? match[1] : null;
}
