export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.35a9.9 9.9 0 0 0 4.63 1.15h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.11c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.1.24-3.67-.79-3.09-1.24-5.07-4.4-5.22-4.6-.15-.2-1.25-1.66-1.25-3.17 0-1.5.78-2.24 1.06-2.55.27-.3.6-.38.8-.38h.58c.19 0 .43-.03.67.51.24.55.83 1.9.9 2.04.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.7 1.17 1.52 1.9 1.05.94 1.93 1.24 2.21 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
