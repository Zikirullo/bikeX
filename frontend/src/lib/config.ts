export const api: string = `${import.meta.env.VITE_API_URL}`;
export const getImagePath = (
  path: string | undefined,
  placeholder: string,
): string => (path ? `${api}/${path}` : placeholder);
