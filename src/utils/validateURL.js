export function isValidUrl(string) {
  try {
    return new URL(string).origin;
  } catch (err) {
    return false;
  }
}
