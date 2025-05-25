export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const popped = parts.pop(); // יכול להיות undefined
    if (popped !== undefined) {
      return popped.split(';').shift(); // גם זה יכול להיות undefined
    }
  }
  return undefined;
};
