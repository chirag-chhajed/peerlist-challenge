"use client";

import { Inter } from "next/font/google";

import { Player } from "./components";
import album from "./icon.png";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const Page = () => {
  return (
    <main
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(246, 248, 250, 0.10) 0%, rgba(36, 41, 46, 0.10) 100%), linear-gradient(180deg, #839597 0%, #0A232A 100%)",
        backgroundBlendMode: "overlay, normal",
        fontFamily: "var(--font-inter)",
      }}
      className={`flex h-screen flex-1 items-center justify-center ${inter.variable} overflow-hidden`}
    >
      <Player
        album={album}
        musicPath="/All.mp3"
        songName="Tore Up"
        artistName="don toliver"
        uniqueKey="dbnow"
      />
    </main>
  );
};

export default Page;
