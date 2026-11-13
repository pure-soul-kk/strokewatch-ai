import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StrokeWatch AI — Global Stroke Intelligence Platform',
  description: 'Evidence-based global stroke monitoring, epidemiological surveillance, risk awareness, and FAST emergency response command center.',
  keywords: [
    'StrokeWatch AI',
    'Stroke Intelligence',
    'Global Burden of Disease',
    'ICMR Stroke Registry',
    'FAST Stroke Protocol',
    'Neurological Intelligence',
    'Ischemic Stroke',
    'Hemorrhagic Stroke'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-type="software" data-radius="soft" data-buttons="pill" data-motion="subtle" className="light">
      <head>
        <meta name="page-type" content="software" />
        <meta name="site-kind" content="software" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/assets/system.css" />
        <script defer src="/assets/system.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
