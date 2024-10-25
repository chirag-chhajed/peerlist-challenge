"use client";

import React, { useMemo, useState } from "react";
import { Inter } from "next/font/google";
import { useMeasure } from "@uidotdev/usehooks";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

import { Analytics, CurrencyCircleDollar, GitCommit } from "./icons";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Page = () => {
  const TABS: Tab[] = ["commit", "analytics", "upgrade"];

  type Tab = "commit" | "analytics" | "upgrade";

  const [activeTab, setActiveTab] = useState<Tab>("commit");
  const [direction, setDirection] = useState(1);
  const activeTabIndex = TABS.indexOf(activeTab);

  const variants: Variants = {
    initial: (direction: number) => {
      return {
        x: `${20 * direction}%`,
        opacity: 0,
      };
    },
    active: { x: "0%", opacity: 1 },
    exit: (direction: number) => {
      return {
        x: `${-20 * direction}%`,
        opacity: 0,
        scaleY: 0,
      };
    },
  };

  const content = useMemo(() => {
    switch (activeTab) {
      case "commit":
        return <CommitContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "upgrade":
        return <UpgradeContent />;
    }
  }, [activeTab]);
  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.25,
        mass: 1,
        stiffness: 300,
        damping: 20,
      }}
    >
      <main
        className={`flex min-h-screen flex-1 items-center justify-center  ${inter.variable} `}
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        <div className="flex w-[329px] flex-col items-center gap-12">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              variants={variants}
              custom={direction}
              key={activeTab}
              initial="initial"
              animate="active"
              exit={"exit"}
              className="flex w-full items-center justify-center"
            >
              {content}
            </motion.div>
          </AnimatePresence>
          <motion.div
            layout
            className="flex items-center justify-center gap-6 "
          >
            {TABS.map((tab, index) => (
              <button
                key={tab}
                className={cn(
                  "bg-transparent transition-colors duration-150 ease-out rounded-md py-[2px] px-1 text-black text-xs font-semibold capitalize data-[selected=true]:bg-[#0d0d0d] data-[selected=true]:text-white slashed-zero "
                )}
                onClick={() => {
                  if (index > activeTabIndex) {
                    setDirection(1);
                  } else {
                    setDirection(-1);
                  }
                  setActiveTab(tab);
                }}
                data-selected={activeTab === tab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>
      </main>
    </MotionConfig>
  );
};

export default Page;

export const CommitContent = () => {
  const [state, setState] = useState<"close" | "open">("close");
  const [ref, { width }] = useMeasure();

  return (
    <motion.div
      onClick={() => {
        setState(state === "open" ? "close" : "open");
      }}
      animate={{ width }}
      layout
    >
      <button
        style={{
          borderRadius: 16,
          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.05)",
        }}
        ref={ref}
        className="group relative flex items-center justify-between gap-4 overflow-hidden border border-[#f6f8fa] bg-white px-4 py-2 transition-colors duration-200 ease-out"
      >
        <div className="flex items-center justify-between gap-2">
          <GitCommit />
          <p
            className={cn(
              "text-xs slashed-zero leading-4 text-[#0d0d0d]/80 group-hover:text-[#0d0d0d]"
            )}
          >
            2e813de
          </p>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          {state === "open" ? (
            <motion.p
              key={"foc"}
              className="text-nowrap text-xs font-medium slashed-zero text-[#6a737d]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              Failed to Compile
            </motion.p>
          ) : null}
        </AnimatePresence>
        <motion.div
          layout
          style={{ borderRadius: 6 }}
          className={cn(
            "flex items-center justify-center gap-2 py-[2px] px-2 bg-[#eb5757]/80 group-hover:bg-[#eb5757] "
          )}
        >
          <motion.span
            key={state}
            className="text-xs font-semibold capitalize slashed-zero leading-4 text-white"
          >
            {state === "open" ? "redeploy" : "failed"}
          </motion.span>
        </motion.div>
      </button>
    </motion.div>
  );
};

export const AnalyticsContent = () => {
  const [state, setState] = useState<"analytics" | "closed">("closed");

  return (
    <>
      {state === "analytics" ? (
        <motion.div
          layoutId="wrapper"
          onClick={() => {
            setState(state === "analytics" ? "closed" : "analytics");
          }}
          style={{
            borderRadius: 16,
            boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.05)",
          }}
          className="group flex w-full flex-col gap-4 border border-[#f6f8fa] bg-white px-4 pb-2 pt-3 transition-colors duration-200 ease-out *:text-nowrap"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="flex flex-col gap-[10px]"
            layout
          >
            <div className="flex items-center gap-6 text-xs leading-4 *:font-semibold">
              <span className="text-black">Traffic</span>
              <span className="flex-1 text-[#444]">Last 3 days</span>
              <span className="text-black">See all</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>/projects</span>
              <span>2,543 visits</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>/groups</span>
              <span>2,121 visits</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>/orders</span>
              <span>2,433 visits</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>/templates</span>
              <span>1,023 visits</span>
            </div>
          </motion.div>

          <button className="flex items-center justify-between ">
            <motion.div
              layoutId="infoicon"
              layout
              className="flex items-center justify-between gap-2"
            >
              <Analytics />
              <p className="text-nowrap text-xs slashed-zero leading-4 text-[#6A737D]/80 group-hover:text-[#6A737D]">
                32 Online Now
              </p>
            </motion.div>
            <motion.div
              layoutId="buttonish"
              layout
              style={{
                borderRadius: 6,
              }}
              className="flex items-center justify-center gap-2 bg-[#0D0D0D]/80 px-2 py-[2px] group-hover:bg-[#0D0D0D]"
            >
              <span className="text-xs font-semibold slashed-zero leading-4 text-white">
                Close
              </span>
            </motion.div>
          </button>
        </motion.div>
      ) : (
        <motion.button
          layoutId="wrapper"
          onClick={() => setState("analytics")}
          style={{
            borderRadius: 16,
            boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.05)",
          }}
          className="group flex items-center justify-between gap-4 border border-[#f6f8fa] bg-white px-4 py-2 transition-colors duration-200 ease-out "
        >
          <motion.div
            layoutId="infoicon"
            layout
            className="flex items-center justify-between gap-2"
          >
            <Analytics />
            <p className="text-nowrap text-xs slashed-zero leading-4 text-[#6A737D]/80 group-hover:text-[#6A737D]">
              32 Online Now
            </p>
          </motion.div>
          <motion.div
            layoutId="buttonish"
            layout
            style={{ borderRadius: 6 }}
            className="flex items-center justify-center gap-2 bg-[#2f80ed]/80 px-2 py-[2px] group-hover:bg-[#2f80ed]"
          >
            <span className="text-xs font-semibold slashed-zero leading-4 text-white">
              Analytics
            </span>
          </motion.div>
        </motion.button>
      )}
    </>
  );
};

export const UpgradeContent = () => {
  const [state, setState] = useState<"billing" | "seePro">("billing");
  const [ref, { width }] = useMeasure();

  return (
    <motion.div
      onClick={() => {
        setState(state === "billing" ? "seePro" : "billing");
      }}
      animate={{ width }}
      layout
    >
      <button
        ref={ref}
        style={{
          borderRadius: 16,
          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.05)",
        }}
        className="group flex items-center justify-between gap-4 border border-[#f6f8fa] bg-white px-4 py-2 transition-colors duration-200 ease-out"
      >
        <div className="flex items-center justify-between gap-2">
          <CurrencyCircleDollar />

          <motion.p className="text-nowrap text-xs slashed-zero leading-4 text-[#6A737D]/80 group-hover:text-[#6A737D]">
            {state === "billing" ? (
              "2 days left in your trial"
            ) : (
              <>
                Upgrade to <span className="text-[#219653]">Pro</span> and save
                $12
              </>
            )}
          </motion.p>
        </div>
        <motion.div
          style={{ borderRadius: 6 }}
          className="flex items-center justify-center gap-2 bg-[#00AA45]/80 px-2 py-[2px] group-hover:bg-[#00AA45]"
          layout
        >
          <motion.span
            key={state}
            className="text-nowrap text-xs font-semibold capitalize slashed-zero leading-4 text-white"
          >
            {state === "billing" ? "Billing" : "See Pro"}
          </motion.span>
        </motion.div>
      </button>
    </motion.div>
  );
};
