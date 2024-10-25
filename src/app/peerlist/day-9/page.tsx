"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Inter } from "next/font/google";
import Image, { type StaticImageData } from "next/image";
import { useClickAway, useLongPress } from "@uidotdev/usehooks";
import {
  AnimatePresence,
  motion,
  useAnimation,
  type MotionProps,
} from "framer-motion";

import { haha, heart, pray, sad, thumbs, wow } from "./emojis";
import waBackgroundImage from "./wabg.png";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Page = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [bubbleColor, setBubbleColor] = useState("white");
  const [selectedEmoji, setSelectedEmoji] = useState<StaticImageData | null>(
    null
  );
  const controls = useAnimation();
  const attrs = useLongPress(
    () => {
      // console.log("long press");
      setShowOverlay(true);
    },
    {
      onStart: () => {
        // console.log("Press Started");
        setBubbleColor("#D1D5DA");
        controls.start({
          backgroundColor: "var(--bubble-color)",
          transition: { duration: 0.2 },
        });
      },
      onFinish: () => {
        // console.log("Press Finished");
        setBubbleColor("white");
        controls.start({
          backgroundColor: "var(--bubble-color)",
        });
      },
      onCancel: () => {
        // console.log("Press cancelled");
        setBubbleColor("white");
        controls.start({
          backgroundColor: "var(--bubble-color)",
          transition: { duration: 0.2 },
        });
      },
      threshold: 500,
    }
  );
  const emojiBarRef = useRef<HTMLDivElement>(null);

  const clickAwayRef = useClickAway<HTMLDivElement>((e) => {
    if (emojiBarRef.current && emojiBarRef.current.contains(e.target as Node)) {
      return;
    }
    setShowOverlay(false);
  });

  const emojis = [
    {
      name: "thumbs",
      src: thumbs,
    },
    {
      name: "heart",
      src: heart,
    },
    {
      name: "haha",
      src: haha,
    },
    {
      name: "wow",
      src: wow,
    },
    {
      name: "sad",
      src: sad,
    },
    {
      name: "pray",
      src: pray,
    },
  ];

  return (
    <main
      className={`flex flex-1 min-h-screen items-center justify-center ${inter.variable}`}
    >
      <div className="relative h-[760px] w-[375px] space-y-2">
        <Image
          priority
          src={waBackgroundImage}
          alt="bg image"
          fill
          className="absolute -z-10"
        />

        <div className="relative w-full p-2 ">
          <div
            {...attrs}
            style={
              {
                "--bubble-color": bubbleColor,
              } as React.CSSProperties
            }
            className="tail mr-auto flex w-10/12 flex-row-reverse items-start gap-0"
          >
            <motion.div
              animate={controls}
              className="rounded-2xl rounded-tl-none bg-[var(--bubble-color)] px-3 py-[10px]"
              style={{
                boxShadow: "0px 4px 6px 0px rgba(33, 33, 33, 0.10)",
              }}
            >
              <p className="lining-nums proportional-nums leading-[22px] text-[#0d0d0d] ">
                sorry bro my office colleagues already booked in advance.
                promised i&apos;ll go with them :(
              </p>
            </motion.div>
          </div>
          <AnimatePresence>
            {showOverlay ? (
              <motion.div
                key="overlay"
                ref={clickAwayRef}
                style={{
                  background: "rgba(0, 170, 69, 0.30)",
                }}
                transition={{
                  stiffness: 128000,
                  damping: 600,
                  mass: 2,
                  type: "spring",
                  delay: 1000,
                }}
                className="absolute inset-0 z-0"
              />
            ) : null}

            {showOverlay ? (
              <motion.div
                ref={emojiBarRef}
                initial={{
                  width: 0,
                }}
                animate={{
                  width: 320,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 1,
                  duration: 0.4,
                }}
                key="emoji-bar"
                style={{
                  borderRadius: "48px",
                  boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.05)",
                }}
                className="absolute top-0 z-10 flex w-fit items-center gap-1 overflow-hidden bg-white px-4 py-3"
              >
                {emojis.map((emoji, index) => (
                  <Emoji
                    key={emoji.name}
                    index={index + 1}
                    {...emoji}
                    onClick={() => {
                      setSelectedEmoji(emoji.src);
                      setShowOverlay(false);
                    }}
                  />
                ))}
                <motion.button
                  className="flex size-10 items-center justify-center rounded-full "
                  type="button"
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.05 * 6,
                  }}
                >
                  <PlusIconCircle />
                </motion.button>
              </motion.div>
            ) : null}

            {selectedEmoji ? (
              <motion.button
                style={{
                  borderRadius: "13px",
                  boxShadow:
                    "0px 0px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 4px 6px 0px rgba(33, 33, 33, 0.10)",
                }}
                className="absolute -bottom-2 left-5 flex h-6 w-7 items-center justify-center bg-white"
                onClick={() => setSelectedEmoji(null)}
                key={selectedEmoji.src}
                transition={{
                  type: "spring",
                  stiffness: 6400,
                  damping: 120,
                }}
                exit={{
                  scale: [1.2, 1, 0],
                  opacity: 0,
                }}
              >
                <motion.div
                  animate={{
                    width: [28, 20],
                    height: [28, 20],
                    scale: 1,
                    opacity: 1,
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  className="size-5"
                  transition={{
                    type: "spring",
                    stiffness: 6400,
                    damping: 120,
                    delay: 0.1,
                  }}
                >
                  <Image
                    src={selectedEmoji}
                    alt="reacted emoji"
                    draggable={false}
                  />
                </motion.div>
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Page;

type EmojiButtonProps = MotionProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    src: StaticImageData;
    name: string;
    index: number;
  };

const Emoji = ({ src, name, index, ...buttonProps }: EmojiButtonProps) => {
  return (
    <motion.button
      className="flex size-10 select-none items-center justify-center rounded-full p-1 hover:bg-[#E1E4E8]"
      type="button"
      initial={{
        opacity: 1,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 0.05 * index,
      }}
      {...buttonProps}
    >
      <Image
        className="size-7"
        src={src}
        alt={`${name} emoji`}
        draggable={false}
      />
    </motion.button>
  );
};

const PlusIconCircle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect width="32" height="32" rx="16" fill="#E1E4E8" />
      <path
        d="M9 16H16M23 16H16M16 16V9M16 16V23"
        stroke="#6A737D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
