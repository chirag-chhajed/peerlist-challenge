"use client";

import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { AnimatePresence, MotionConfig } from "framer-motion";

import { Design, Dev } from "./components";
import { Code } from "./icons";

export default function Page() {
  const [checked, setChecked] = useState(true);

  return (
    <MotionConfig
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
    >
      <main className="flex h-screen flex-1 flex-col items-center justify-center gap-4 bg-[#24292E]">
        <div
          style={{
            boxShadow: "0px 4px 16px 0px rgba(33, 33, 33, 0.15)",
          }}
          className="flex gap-0"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {checked ? <Dev /> : <Design />}
          </AnimatePresence>
          <div
            style={{
              borderRadius: "0px 12px 12px 0px",
            }}
            className="flex items-center justify-center border border-[#E1E4E8] bg-white px-3 py-2"
          >
            <Switch.Root
              style={{ borderRadius: "6px" }}
              className="relative h-[24px] w-[40px] border border-[#F6F8FA] bg-[#F6F8FA] p-px hover:bg-[#E1E4E8] data-[state=checked]:bg-[#00AA45]"
              checked={checked}
              onCheckedChange={setChecked}
            >
              <Switch.Thumb
                style={{
                  borderRadius: "6px",
                  boxShadow: " 0px 0px 4px 0px rgba(33, 33, 33, 0.15)",
                }}
                className=" flex aspect-square h-full items-center justify-center bg-white transition-transform duration-200 ease-in-out will-change-transform data-[state=checked]:translate-x-[16px]"
              >
                <Code className="p-px" />
              </Switch.Thumb>
            </Switch.Root>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}
