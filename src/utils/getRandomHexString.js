export function getRandomHexString(byteCount) {
  const randomBytes = new Uint8Array(byteCount);
  window.crypto.getRandomValues(randomBytes);

  let hexString = "";
  for (let i = 0; i < byteCount; i++) {
    const byte = randomBytes[i].toString(16).padStart(2, "0");
    hexString += byte;
  }

  return hexString;
}
