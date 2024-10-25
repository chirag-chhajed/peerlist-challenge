"use client";

import { useState } from "react";
import { Instrument_Serif, Inter } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import check from "./icon.svg";

const inst = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "600"],
  subsets: ["latin"],
});

function Pill({ name }: Readonly<{ name: string }>) {
  const [active, setActive] = useState(false);

  const variants = {
    hover: {
      backgroundColor: "rgba(246, 106, 10, 0.15)",
      transition: { duration: 0.3 },
    },
    active: {
      backgroundColor: "#F66A0A",
      color: "#f6f8fa",
      transition: { duration: 0 },
    },
  };
  return (
    <motion.button
      layout
      variants={variants}
      className={cn(
        `py-2 px-3 rounded-[40px] border border-orange-500 flex items-center ${inter.variable} gap-1 text-gray-700`
      )}
      style={{
        fontFamily: "var(--font-inter)",
      }}
      animate={active ? "active" : undefined}
      onClick={() => setActive(!active)}
      whileHover={active ? undefined : "hover"}
      transition={{
        backgroundColor: { duration: active ? 0 : 0.5 },
        color: { duration: 0 },
        default: {
          type: "spring",
          stiffness: 600,
          damping: 15,
          mass: 1,
        },
      }}
    >
      <motion.span
        animate={{ fontWeight: active ? 600 : 400 }}
        layout
        className="text-center capitalize slashed-zero"
      >
        {name}
      </motion.span>
      {active ? (
        <Image priority src={check} className="size-5" alt="check icon" />
      ) : null}
    </motion.button>
  );
}

const nationalities = [
  "indian",
  "italian",
  "french",
  "spanish",
  "german",
  "japanese",
  "chinese",
  "portuguese",
  "arabic",
  "korean",
  "dutch",
  "swedish",
  "russian",
  "punjabi",
  "finnish",
  "danish",
  "polish",
  "greek",
  "thai",
  "vietnamese",
  "czech",
  "indonesian",
  "malay",
  "filipino",
  "hungarian",
];

export default function Page() {
  return (
    <main
      className={`grid min-h-screen flex-1  place-content-center bg-[#24292E] ${inst.variable} ${inter.variable}`}
    >
      <div className="mx-auto space-y-6 bg-gray-100 px-24 py-28 lg:w-1/2">
        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
          }}
          className="text-[40px] slashed-zero leading-10 text-gray-900"
        >
          What are your favorite cuisines?
        </h1>
        <div className="flex flex-wrap gap-2">
          {nationalities.map((name) => (
            <Pill key={name} name={name} />
          ))}
        </div>
      </div>
    </main>
  );
}
