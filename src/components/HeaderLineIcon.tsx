import type { ReactNode } from 'react';

export type HeaderIconName =
  | 'compass' | 'waves' | 'family' | 'cable-car'
  | 'bus' | 'shield-check' | 'faq' | 'ticket';

const icons: Record<HeaderIconName, ReactNode> = {
  compass: <>
    <circle cx="12" cy="12" r="9" /><path d="m15.7 8.3-2.6 5-4.8 2.4 2.5-5.1 4.9-2.3Z" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
  </>,
  waves: <>
    <path d="M2 8c2.6 0 2.6-2 5.2-2s2.6 2 5.2 2 2.6-2 5.2-2 2.6 2 4.4 2" />
    <path d="M2 13c2.6 0 2.6-2 5.2-2s2.6 2 5.2 2 2.6-2 5.2-2 2.6 2 4.4 2" />
    <path d="M2 18c2.6 0 2.6-2 5.2-2s2.6 2 5.2 2 2.6-2 5.2-2 2.6 2 4.4 2" />
  </>,
  family: <>
    <circle cx="9" cy="7" r="3" /><circle cx="18" cy="9" r="2.3" />
    <path d="M2.5 20v-2.3A5.7 5.7 0 0 1 8.2 12h1.6a5.7 5.7 0 0 1 5.7 5.7V20M16.3 13.5h1.8A3.9 3.9 0 0 1 22 17.4V20" />
  </>,
  'cable-car': <>
    <path d="M3 4 21 2M12 3v5M7 8h10a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-7a2 2 0 0 1 2-2Z" />
    <path d="M5 14h14M12 8v6M8 20l-1 2M16 20l1 2" />
  </>,
  bus: <>
    <rect x="4" y="3" width="16" height="16" rx="3" /><path d="M4 12h16M8 19v2M16 19v2M4 7h16" />
    <circle cx="8" cy="16" r="1" /><circle cx="16" cy="16" r="1" />
  </>,
  'shield-check': <>
    <path d="m12 2 8 4v6c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V6l8-4Z" />
    <path d="m8.5 12 2.4 2.5 4.8-5" />
  </>,
  faq: <>
    <path d="M21 11.4a8.7 8.7 0 0 1-9.1 8.6 9 9 0 0 1-3.6-.8L3 21l1.7-4.9A8.7 8.7 0 1 1 21 11.4Z" />
    <path d="M9.5 9a2.7 2.7 0 0 1 5.3.5c0 2-2.8 2.3-2.8 4M12 16.5h.01" />
  </>,
  ticket: <>
    <path d="M4 5h16a1 1 0 0 1 1 1v4a2 2 0 0 0 0 4v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a2 2 0 0 0 0-4V6a1 1 0 0 1 1-1Z" />
    <path d="M14 7v2M14 11v2M14 15v2" />
  </>,
};

export default function HeaderLineIcon({ name, className = '' }: { name: HeaderIconName; className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
