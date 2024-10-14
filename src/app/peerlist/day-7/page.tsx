"use client";

import { Inter } from "next/font/google";
import Image, { type StaticImageData } from "next/image";
import card1 from "./card1.png";
import card2 from "./card2.png";
import card3 from "./card3.png";
import financeIcon from "./icon.svg";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const CardStack = () => {
  const [cards, setCards] = useState([
    {
      title: "Your biggest expenses in July are",
      subtitle: "Food and Fuel",
      image: card2,
      id: 1,
    },
    {
      title: "Balance on Jul 23, 2024",
      subtitle: "$ 12,303",
      image: card1,
      id: 2,
    },
    {
      title: "Expenses so far this year",
      subtitle: "$ 3,03,120",
      image: card3,
      id: 3,
    },
  ]);
  const [open, setOpen] = useState(false);

  const handleDragEnd = (x: MotionValue) => {
    if (x.get() < -150) {
      setCards((prev) => [...prev.slice(1)]);
    } else {
      animate(x, 0);
    }
  };
  return (
    <div
      style={{
        fontFamily: "var(--font-inter)",
      }}
      className={`grid min-h-screen place-content-center ${inter.variable} space-y-4 bg-[#e3e8ea]`}
    >
      <div className="flex h-screen w-[430px] items-center justify-center overflow-hidden bg-[#24292E] px-4">
        {open ? (
          <motion.div
            initial={{ y: 450 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              mass: 1,
              stiffness: 300,
              damping: 20,
            }}
            className="relative w-full"
            key={"card-stack"}
          >
            <AnimatePresence mode="sync">
              {cards.map((card, index) => {
                return (
                  <CardComp
                    index={index}
                    title={card.title}
                    image={card.image}
                    subtitle={card.subtitle}
                    handleDragEnd={handleDragEnd}
                    key={card.id}
                  />
                );
              })}
              {cards.length === 0 ? (
                <div className="z-0">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-center text-[64px] font-semibold slashed-zero text-white"
                  >
                    That&apos;s all
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-center text-lg leading-7 text-[#d1d5da]"
                  >
                    No more stats to check : &#41;
                  </motion.p>
                </div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex w-full flex-col items-center gap-12">
            <Image
              src={financeIcon}
              alt="finance icon"
              priority
              draggable={false}
            />
            <div>
              <motion.h1 className="text-center text-[32px] font-semibold text-white">
                Fin Stats - July 24
              </motion.h1>
              <p
                className="text-center text-xl leading-7 text-[#d1d5da]
              "
              >
                Your financials from July
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              className="flex w-80 items-center justify-center gap-2 rounded-3xl border border-[#d1d5da] bg-white px-2 py-4"
            >
              <span className="text-lg font-semibold leading-7 text-[#0d0d0d]">
                View
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardStack;

const CardComp = ({
  index,
  title,
  subtitle,
  image,
  handleDragEnd,
}: {
  index: number;
  title: string;
  subtitle: string;
  image: StaticImageData;
  handleDragEnd: (x: MotionValue) => void;
}) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 0, 150], [-9, 0, 9]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ right: 0, left: -400 }}
      style={{
        borderRadius: 40,
        boxShadow: "0px 12px 24px 0px rgba(33, 33, 33, 0.30)",
        top: "50%",
        x,
        rotate,
        zIndex: 100 - index,
        y: `calc(-50% + ${index * 23}px)`,
      }}
      animate={{
        scale: 1 - index * 0.05,
      }}
      transition={{
        ease: "easeOut",
        type: "spring",
        duration: 0.3,
      }}
      initial={false}
      exit={{ x: -455, transition: { duration: 0.3 } }}
      onDragEnd={() => handleDragEnd(x)}
      className="absolute w-[398px] cursor-grab space-y-4 border border-gray-300 bg-white p-6 active:cursor-grabbing"
    >
      <div className="space-y-4">
        <p className="text-xl font-semibold lining-nums proportional-nums leading-7 text-[#0d0d0d]">
          {title}
        </p>
        <h2 className="text-[32px] font-semibold leading-10 text-[#0d0d0d]">
          {subtitle}
        </h2>
      </div>
      <Image
        src={image}
        priority
        alt={`image ${index + 1}`}
        draggable={false}
      />
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-3xl border border-gray-300 px-2 py-4"
      >
        <span className="text-xl font-semibold leading-7 text-[#0d0d0d]">
          Full report
        </span>
      </button>
    </motion.div>
  );
};
