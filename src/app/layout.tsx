import type { Metadata } from "next";

import "./globals.css";

import { PHProvider, PostHogPageView } from "@/provider/providers";

export const metadata: Metadata = {
  title: "Peerlist IxDChallenge ",
  description: "Join the Peerlist Interaction Design Challenge - July 2024",
  openGraph: {
    title: "Peerlist IxDChallenge",
    description: "Join the Peerlist Interaction Design Challenge - July 2024",
    type: "website",
    siteName: "Peerlist IxDChallenge",
    images: [
      {
        url: "https://res.cloudinary.com/dz04dxsi9/image/upload/v1728915649/Cover_ackv5u.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PHProvider>
      <html lang="en">
        <body className={"antialiased"}>
          {children}
          <PostHogPageView />
        </body>
      </html>
    </PHProvider>
  );
}
