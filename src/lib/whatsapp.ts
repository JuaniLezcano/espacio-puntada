export function buildWhatsAppLink(phone: string, message?: string): string {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${phone}${query}`;
}
