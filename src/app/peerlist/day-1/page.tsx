"use client";

import { useEffect, useMemo, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { useHover } from "@uidotdev/usehooks";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const jet = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["500", "400"],
  subsets: ["latin"],
});

const UpvoteButton = () => {
  const [hoverRef, isHovered] = useHover();
  const [count, setCount] = useState(70);
  const [upvoted, setUpvoted] = useState(false);

  const hovup = isHovered && upvoted;

  const borderColor = useMemo(() => {
    if (hovup) {
      return "#00AA45";
    } else if (upvoted) {
      return "#6FCF97";
    } else if (isHovered) {
      return "#6FCF97";
    } else {
      return "#959DA5";
    }
  }, [isHovered, upvoted, hovup]);

  return (
    <MotionConfig
      transition={{ type: "spring", stiffness: 300, mass: 1, damping: 20 }}
    >
      <main className={`grid h-screen place-content-center ${jet.variable}`}>
        <motion.div
          ref={hoverRef}
          onClick={() => {
            setUpvoted(!upvoted);
            setCount(upvoted ? count - 1 : count + 1);
          }}
          className="flex size-12 flex-col items-center justify-center gap-[2px] rounded-lg border border-solid border-gray-400 bg-white px-3 py-1"
          animate={{
            border: `1px solid ${borderColor}`,
            boxShadow: isHovered
              ? "0px 0px 0px 4px rgba(0, 170, 69, 0.15)"
              : "none",
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {upvoted ? (
              <motion.div
                style={
                  isHovered
                    ? { borderRadius: "1.5rem", backgroundColor: "#E2F5EA" }
                    : {}
                }
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 5, opacity: 0 }}
                key="upvoted"
                className="flex size-6 items-center justify-center"
              >
                <motion.svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ y: isHovered ? -2 : 0 }}
                >
                  <g id="Peerlist Icons">
                    <motion.path
                      stroke={"#00AA45"}
                      fill={"#6FCF97"}
                      strokeWidth="1.25"
                      strokeLinejoin="round"
                      id="Vector 109"
                      d="M13.125 8.15625L7.5 2.53125L1.875 8.15625H5V13.4688H10V8.15625H13.125Z"
                    />
                  </g>
                </motion.svg>
              </motion.div>
            ) : (
              <motion.div
                style={
                  isHovered
                    ? { borderRadius: "1.5rem", backgroundColor: "#E2F5EA" }
                    : {}
                }
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{
                  y: -15,
                  opacity: 0,
                  transition: { duration: 0.17, bounce: 0.25 },
                }}
                key="normal"
                className="flex size-6 items-center justify-center"
              >
                <motion.svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ y: isHovered ? -2 : 0 }}
                >
                  <g id="Peerlist Icons">
                    <motion.path
                      stroke={isHovered ? "#00AA45" : "#0D0D0D"}
                      strokeWidth="1.25"
                      strokeLinejoin="round"
                      id="Vector 109"
                      d="M13.125 8.15625L7.5 2.53125L1.875 8.15625H5V13.4688H10V8.15625H13.125Z"
                    />
                  </g>
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              color: upvoted ? "#00AA45" : "#0D0D0D",
            }}
            className="text-[10px] font-medium slashed-zero leading-3"
          >
            <Counter value={count} />
          </span>
        </motion.div>
      </main>
    </MotionConfig>
  );
};

export default UpvoteButton;

const fontSize = 10;
const padding = 4;
const height = fontSize + padding;

function Counter({ value }: Readonly<{ value: number }>) {
  return (
    <div
      style={{ fontSize }}
      className="flex items-center gap-px overflow-hidden rounded leading-none "
    >
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  );
}

function Digit({ place, value }: Readonly<{ place: number; value: number }>) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] slashed-zero">
      {[...Array(10).keys()].map((i) => (
        <AnimatedNumber key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function AnimatedNumber({
  mv,
  number,
}: Readonly<{ mv: MotionValue; number: number }>) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
      initial={false}
    >
      {number}
    </motion.span>
  );
}
