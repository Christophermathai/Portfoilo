import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL("https://christophermathai.com"), // Update with actual domain when deployed
  title: {
    default: "Christopher Mathai | Full-Stack Developer & AI Engineer",
    template: "%s | Christopher Mathai",
  },
  description: "Portfolio of Christopher Mathai, a Full-Stack Developer and AI Engineer based in Ernakulam, Kerala, specializing in AI-integrated systems and scalable web applications.",
  keywords: ["Christopher Mathai", "Full-Stack Developer", "AI Engineer", "Software Engineer", "Web Developer", "React", "Next.js", "Kerala", "India"],
  authors: [{ name: "Christopher Mathai", url: "https://christophermathai.com" }],
  creator: "Christopher Mathai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://christophermathai.com",
    title: "Christopher Mathai | Full-Stack Developer & AI Engineer",
    description: "Building AI-integrated systems and scalable web applications from Kerala to the cloud.",
    siteName: "Christopher Mathai Portfolio",
    images: [
      {
        url: "/SocialProfile.avif",
        width: 1200,
        height: 630,
        alt: "Christopher Mathai Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Mathai | Full-Stack Developer & AI Engineer",
    description: "Building AI-integrated systems and scalable web applications from Kerala to the cloud.",
    images: ["/SocialProfile.avif"],
    creator: "@christophermathai", // Update with actual Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Christopher Mathai",
              url: "https://christophermathai.com",
              jobTitle: "Full-Stack Developer & AI Engineer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ernakulam",
                addressRegion: "Kerala",
                addressCountry: "India",
              },
              sameAs: [
                "https://github.com/Christophermathai",
                "https://www.linkedin.com/in/christopher-mathai/"
              ]
            })
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
