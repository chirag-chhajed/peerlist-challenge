"use client";

import type React from "react";
import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import * as Emojis from "./emojis";
import * as Stickers from "./stickers";

const Slice = ({
  rotation,
  emoji,
  className,
}: {
  rotation: number;
  emoji: StaticImageData;
  className?: string;
}) => {
  return (
    <button
      type="button"
      className="slice absolute right-0 top-0 flex size-1/2  items-end justify-center border-x-[0.5px] border-[#E1E4E8]  transition-colors hover:bg-[var(--slice-hover)] group"
      style={
        {
          "--rotation": `${rotation}deg`,
          "--skew": "-45deg",
        } as React.CSSProperties
      }
    >
      <Image
        src={emoji}
        className={cn("emoji size-8", className)}
        alt="Emoji"
        draggable={false}
        priority
      />

      <div className="triangle invisible group-hover:visible " />
    </button>
  );
};

const PieChart = () => {
  const [currentCategory, setCurrentCateogry] = useState<"emojis" | "stickers">(
    "emojis"
  );
  const slices = [
    { emoji: Emojis.eyes },
    { emoji: Emojis.wave },
    { emoji: Emojis.angerBubble },
    { emoji: Emojis.frown },
    { emoji: Emojis.grin },
    { emoji: Emojis.heartEyes },
    { emoji: Emojis.fire },
    { emoji: Emojis.wow },
  ];
  const stickers = [
    { emoji: Stickers.Star },
    { emoji: Stickers.Question },
    { emoji: Stickers.ThumbsDown },
    { emoji: Stickers.Dot },
    { emoji: Stickers.Profile },
    { emoji: Stickers.Heart },
    { emoji: Stickers.ThumbsUp },
    { emoji: Stickers.PlusOne },
  ];

  const sliceStickerMapper = currentCategory === "emojis" ? slices : stickers;

  const colors =
    currentCategory === "emojis"
      ? {
          background: "#7f2bff",
          boxShadow: "#CDA6FF",
          hover: "#cda6ff1a",
        }
      : {
          background: "#2F80ED",
          boxShadow: "#73BFFF",
          hover: "#73bfff1a",
        };

  return (
    <main
      style={
        {
          "--button-background": colors.background,
          "--button-shadow": colors.boxShadow,
          "--slice-hover": colors.hover,
        } as React.CSSProperties
      }
      className="grid h-screen place-content-center relative flex-1"
    >
      <motion.div
        style={{
          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.05)",
        }}
        className="relative grid size-64 place-content-center overflow-hidden rounded-full border-2 border-[var(--button-background)]"
        initial={{ visibility: "hidden", scale: 0 }}
        animate={{ visibility: "visible", scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div aria-hidden={true} className="hidden size-28" />
        {sliceStickerMapper.map((slice, index) => (
          <Slice
            className={currentCategory === "stickers" ? "size-9" : undefined}
            key={index}
            rotation={index * 45}
            emoji={slice.emoji}
          />
        ))}
        <style>
          {`
            .slice {
              transform-origin: 0% 100%;
              transform: rotate(var(--rotation)) skew(var(--skew));
              border-left: 0.5px solid #e1e4e8;
              border-bottom: 0.5px solid #e1e4e8;
              background-color: #ffffff;
            }

            .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg));
            }

            .slice .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(-25%, -40%);
            }

            .slice:nth-child(2) .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(25%, -50%);
            }

            .slice:nth-child(3) .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(50%, -25%);
            }

            .slice:nth-child(4) .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(50%, 25%);
            }

            .slice:nth-child(5) .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(25%, 50%);
            }

            .slice:nth-child(6) .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(-20%, 50%);
            }

            .slice:nth-child(7) .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(-50%, 20%);
            }

            .slice:nth-child(8) .emoji {
              transform: skew(45deg) rotate(calc(var(--rotation) * -1 - 360deg))
                translate(-50%, -10%);
            }

            .triangle {
              clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
              background-color: var(--button-shadow);
              transform: skew(45deg) rotate(75deg) translate(-150%, 10%);
              height: 0.75rem;
              width: 0.75rem;
              position: absolute;
            }
          `}
        </style>
      </motion.div>
      <motion.div
        style={{
          boxShadow: "0px 1px 0px 8px var(--button-shadow)",
        }}
        initial={{ visibility: "hidden", scale: 0, x: "-50%", y: "-50%" }}
        animate={{ visibility: "visible", scale: 1, x: "-50%", y: "-50%" }}
        transition={{
          type: "spring",
          mass: 1,
          stiffness: 64000000,
          damping: 12000,
        }}
        className="absolute left-1/2 top-1/2 z-50 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-full border border-white bg-white"
      >
        <button
          type="button"
          className={cn(
            "grid flex-1 place-content-center bg-white group",
            currentCategory === "stickers"
              ? "bg-[#2F80ED]"
              : "hover:bg-[#F3F9FC]"
          )}
          onClick={() => setCurrentCateogry("stickers")}
        >
          <EmojiSmile currentCategory={currentCategory} />
        </button>
        <button
          type="button"
          className={cn(
            "grid flex-1 place-content-center group",
            currentCategory === "emojis" ? "bg-[#7f2bff]" : "hover:bg-bankai"
          )}
          onClick={() => setCurrentCateogry("emojis")}
        >
          <Star currentCategory={currentCategory} />
        </button>
      </motion.div>
    </main>
  );
};

export default PieChart;

const EmojiSmile = ({
  currentCategory,
}: {
  currentCategory: "emojis" | "stickers";
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      data-category={currentCategory}
    >
      <path
        d="M12.7086 22.4175C7.18559 22.4175 2.70859 17.9405 2.70859 12.4175C2.70859 6.8945 7.18559 2.4175 12.7086 2.4175C18.2316 2.4175 22.7086 6.8945 22.7086 12.4175C22.7086 17.9405 18.2316 22.4175 12.7086 22.4175Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-category={currentCategory}
        className="stroke-[#0d0d0d] data-[category=stickers]:stroke-white data-[category=emojis]:group-hover:stroke-[#2F80ED]"
      />
      <path
        d="M17.2086 15.9175C17.2086 15.9175 15.7086 17.9175 12.7086 17.9175C9.70859 17.9175 8.20859 15.9175 8.20859 15.9175"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-category={currentCategory}
        className="stroke-[#0d0d0d] data-[category=stickers]:stroke-white data-[category=emojis]:group-hover:stroke-[#2F80ED]"
      />
      <path
        d="M16.2086 10.4175C16.076 10.4175 15.9488 10.3648 15.855 10.271C15.7613 10.1773 15.7086 10.0501 15.7086 9.9175C15.7086 9.78489 15.7613 9.65771 15.855 9.56394C15.9488 9.47017 16.076 9.4175 16.2086 9.4175C16.3412 9.4175 16.4684 9.47017 16.5621 9.56394C16.6559 9.65771 16.7086 9.78489 16.7086 9.9175C16.7086 10.0501 16.6559 10.1773 16.5621 10.271C16.4684 10.3648 16.3412 10.4175 16.2086 10.4175ZM9.20859 10.4175C9.07598 10.4175 8.9488 10.3648 8.85503 10.271C8.76127 10.1773 8.70859 10.0501 8.70859 9.9175C8.70859 9.78489 8.76127 9.65771 8.85503 9.56394C8.9488 9.47017 9.07598 9.4175 9.20859 9.4175C9.3412 9.4175 9.46837 9.47017 9.56214 9.56394C9.65591 9.65771 9.70859 9.78489 9.70859 9.9175C9.70859 10.0501 9.65591 10.1773 9.56214 10.271C9.46837 10.3648 9.3412 10.4175 9.20859 10.4175Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-category={currentCategory}
        className="fill-[#0d0d0d] stroke-[#0d0d0d] data-[category=stickers]:fill-white data-[category=stickers]:stroke-white data-[category=emojis]:group-hover:fill-[#2F80ED] data-[category=emojis]:group-hover:stroke-[#2F80ED]"
      />
    </svg>
  );
};

const Star = ({
  currentCategory,
}: {
  currentCategory: "emojis" | "stickers";
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      data-category={currentCategory}
      className="stroke-[#0D0D0D] data-[category=emojis]:stroke-white data-[category=stickers]:group-hover:stroke-[#7F2BFF]"
    >
      <path
        d="M9.29558 8.6535L11.8936 3.4215C11.9692 3.27008 12.0855 3.14273 12.2295 3.05372C12.3734 2.96471 12.5393 2.91756 12.7086 2.91756C12.8778 2.91756 13.0437 2.96471 13.1877 3.05372C13.3316 3.14273 13.448 3.27008 13.5236 3.4215L16.1216 8.6535L21.9296 9.4975C22.0971 9.52073 22.2547 9.59059 22.3845 9.69911C22.5142 9.80763 22.6108 9.95043 22.6632 10.1112C22.7157 10.272 22.7219 10.4443 22.6811 10.6085C22.6403 10.7726 22.5542 10.922 22.4326 11.0395L18.2306 15.1095L19.2226 20.8595C19.3496 21.5975 18.5696 22.1595 17.9026 21.8115L12.7086 19.0955L7.51358 21.8115C6.84758 22.1605 6.06758 21.5975 6.19458 20.8585L7.18658 15.1085L2.98458 11.0385C2.86357 10.9209 2.77798 10.7717 2.73755 10.6078C2.69711 10.444 2.70345 10.2721 2.75585 10.1116C2.80825 9.95122 2.9046 9.80872 3.03395 9.70033C3.1633 9.59194 3.32047 9.52202 3.48758 9.4985L9.29558 8.6535V8.6535Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
