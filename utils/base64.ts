export const toBase64 = (str: string): string => {
  return typeof window !== 'undefined'
    ? window.btoa(str)
    : Buffer.from(str).toString('base64');
};

export const fromBase64 = (str: string): string => {
  return typeof window !== 'undefined'
    ? window.atob(str)
    : Buffer.from(str, 'base64').toString();
};
