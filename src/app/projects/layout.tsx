import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Archive',
  description:
    'Browse 10+ projects by Christopher Mathai — spanning AI-powered systems, full-stack web apps, facial recognition, NLP, deep learning, and data science. Built with Next.js, Python, React, and more.',
  alternates: {
    canonical: 'https://christophermathai.vercel.app/projects',
  },
  openGraph: {
    type: 'website',
    title: 'Project Archive | Christopher Mathai',
    description:
      'A curated archive of projects by Christopher Mathai — from production gym management systems to disaster-response deep learning models.',
    url: 'https://christophermathai.vercel.app/projects',
    images: [
      {
        url: '/SocialProfile.avif',
        width: 1200,
        height: 630,
        alt: 'Christopher Mathai — Project Archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Archive | Christopher Mathai',
    description:
      'A curated archive of projects by Christopher Mathai — from production gym management systems to disaster-response deep learning models.',
    images: ['/SocialProfile.avif'],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
