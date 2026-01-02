export function encodeData(data: { me: string; you: string; message?: string }): string {
  const dataString = JSON.stringify(data);
  const base64Encoded = btoa(dataString);
  return makeUrlSafe(base64Encoded);
}

export function decodeData(encoded: string): { me: string; you: string; message?: string } {
  const base64Decoded = makeUrlUnsafe(encoded);
  const dataString = atob(base64Decoded);
  return JSON.parse(dataString);
}

function makeUrlSafe(base64: string): string {
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function makeUrlUnsafe(urlSafe: string): string {
  let base64 = urlSafe
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  // Add padding if needed
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  
  return base64;
}