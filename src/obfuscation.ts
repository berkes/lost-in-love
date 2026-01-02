import seedrandom from "seedrandom";

export function encodeData(data: {
  me: string;
  you: string;
  message?: string;
}): string {
  const dataString = JSON.stringify(data);
  const base64Encoded = btoa(dataString);
  return makeUrlSafe(base64Encoded);
}

export function decodeData(encoded: string): {
  me: string;
  you: string;
  message?: string;
} {
  const base64Decoded = makeUrlUnsafe(encoded);
  const dataString = atob(base64Decoded);
  return JSON.parse(dataString);
}

function makeUrlSafe(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function makeUrlUnsafe(urlSafe: string): string {
  let base64 = urlSafe.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }

  return base64;
}

export function garbleText(text: string): string {
  if (!text || text.length === 0) return text;

  // Use a single, clear obfuscation character that indicates hidden text
  // This makes it visually obvious that the text is intentionally obfuscated
  const obfuscationChar = "•";

  // Create deterministic output based on text length (minimum 6 characters)
  const length = Math.max(6, text.length);

  // Create a seed based on text content for consistency
  const seed = text.split("").reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);

  // Use seedrandom to create a deterministic pattern
  const rng = seedrandom(seed.toString());

  // Create a pattern: start with the obfuscation char, then alternate with spaces
  // This creates a clear visual indication of obfuscated text
  let result = "";
  for (let i = 0; i < length; i++) {
    if (i > 0 && rng() < 0.3) {
      result += " "; // Add occasional spaces for visual rhythm
    }
    result += obfuscationChar;
  }

  return result;
}
