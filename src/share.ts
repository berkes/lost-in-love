import { encodeData } from "./obfuscation";

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export function shareLink() {
  const meField: HTMLInputElement = document.getElementById("me") as HTMLInputElement;
  const me = meField.value;
  const youField: HTMLInputElement = document.getElementById("you") as HTMLInputElement;
  const you = youField.value;
  const messageField: HTMLInputElement = document.getElementById("message") as HTMLInputElement;
  const message = messageField.value;
  
  const baseUrl = new URL(window.location.origin + window.location.pathname);
  
  // Create obfuscated data
  const obfuscatedData = encodeData({ me, you, message });
  baseUrl.searchParams.set("data", obfuscatedData);
  
  const data: ShareData = {
    title: `Lost in Love for ${me} and ${you}`,
    text: message ? `Lost in Love maze for ${me} and ${you}: "${message}"` : `Lost in Love unique maze for ${me} and ${you}`,
    url: baseUrl.toString(),
  };
  
  if (navigator.canShare(data)) {
    navigator.share(data);
  } else {
    writeNotification("Web Share not supported", "error");
    const text = `${data.text} - ${data.url}`;
    navigator.clipboard.writeText(text).then(() => {
      writeNotification("Link copied to clipboard", "info");
    });
  }
}

export function writeNotification(message: string, type: string = "info") {
  const notification = document.getElementById("notification") as HTMLElement;
  notification.className = type;
  notification.innerHTML = message;

  if (type === "error") {
    console.error(message);
  }
}