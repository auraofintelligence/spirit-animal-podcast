import type { Metadata } from 'next';
import './globals.css';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: {
    default: 'The Spirit Animal Podcast',
    template: '%s | The Spirit Animal Podcast',
  },
  description:
    'A joyful island podcast where guests choose an animal, return to the values that matter, and follow the yarn somewhere surprising.',
  icons: {
    icon: [
      { url: `${assetBase}/assets/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${assetBase}/assets/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
    ],
    apple: `${assetBase}/assets/favicon-180x180.png`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
