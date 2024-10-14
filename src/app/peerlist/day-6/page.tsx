"use client";

import { cn } from "@/lib/utils";
import { Instrument_Serif, Inter } from "next/font/google";
import logo from "./icon.svg";
import google from "./google.svg";
import apple from "./apple.svg";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

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

const Page = () => {
  const [container, setContainer] = useState(null);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
      }}
    >
      <div
        className={cn(
          `${inst.variable} min-h-screen flex justify-center items-start `
        )}
      >
        <div
          // @ts-expect-error {it works}
          ref={setContainer}
          className={`relative flex h-[768px] w-[375px] flex-col justify-between border px-6 py-10 ${inter.variable} my-4 rounded-xl shadow-xl`}
        >
          <div className="space-y-6">
            <Image
              src={logo}
              className="size-10"
              alt="Peerlist logo"
              priority
              draggable={false}
            />
            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
              }}
              className="text-[32px] slashed-zero"
            >
              A place on the internet for{" "}
              <span className="italic">designers</span> &{" "}
              <span className="italic">developers</span> to launch projects,
              build a portfolio, and find jobs.
            </h1>
          </div>
          <div
            style={{
              fontFamily: "var(--font-inter)",
            }}
            className="space-y-10"
          >
            <motion.div layout className="space-y-4">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <motion.button
                    style={{
                      background:
                        "linear-gradient(245deg, rgba(111, 207, 151, 0.20) 0%, rgba(255, 255, 255, 0.00) 65.72%), #FFF",
                      borderRadius: 16,
                    }}
                    layoutId="join"
                    type="button"
                    className="flex w-full justify-between border border-gray-200 p-4 slashed-zero "
                  >
                    <motion.div layoutId="join-text">
                      <h2 className="text-left font-semibold capitalize slashed-zero leading-6 text-[#0D0D0D]">
                        join peerlist
                      </h2>
                      <p className="text-xs leading-4 ">
                        Create your peerlist profile
                      </p>
                    </motion.div>

                    <motion.div
                      layoutId="join-logo"
                      style={{
                        background:
                          "linear-gradient(180deg, #00AA45 35.94%, #1E874B 100%)",
                      }}
                      className="flex size-10 items-center justify-center rounded-[20px] border-2 border-[#219653] p-2"
                    >
                      <ChevronDown />
                    </motion.div>
                  </motion.button>
                </Dialog.Trigger>
                <Dialog.Portal container={container}>
                  <AnimatePresence>
                    <Dialog.Content asChild>
                      <motion.div
                        layoutId="join"
                        style={{
                          background:
                            "linear-gradient(245deg, rgba(111, 207, 151, 0.20) 0%, rgba(255, 255, 255, 0.00) 65.72%), var(--Background-bg-gray-00, #FFF)",
                          fontFamily: "var(--font-inter)",
                          borderRadius: 16,
                        }}
                        className={cn(
                          `w-[327px] space-y-6 border border-gray-200 px-6 py-4 absolute top-28`
                        )}
                      >
                        <div className="flex justify-between">
                          <motion.div layoutId="join-text">
                            <Dialog.Title asChild>
                              <h2 className="text-left font-semibold capitalize slashed-zero leading-6 text-[#0D0D0D]">
                                join peerlist
                              </h2>
                            </Dialog.Title>
                            <Dialog.Description asChild>
                              <p className="text-xs leading-4 ">
                                Create your peerlist profile
                              </p>
                            </Dialog.Description>
                          </motion.div>
                          <Dialog.DialogClose asChild>
                            <motion.button type="button" layoutId="join-logo">
                              <XIcon />
                            </motion.button>
                          </Dialog.DialogClose>
                        </div>
                        <form
                          onSubmit={(e) => e.preventDefault()}
                          className="space-y-4 slashed-zero"
                        >
                          <div className="flex flex-col gap-2">
                            <label
                              htmlFor="email"
                              className="text-xs font-semibold slashed-zero text-[#0D0D0D]"
                            >
                              Email
                            </label>
                            <input
                              className="rounded-md border border-[#e1e4e8] bg-white p-2"
                              type="email"
                              id="email"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label
                              htmlFor="password"
                              className="flex justify-between text-xs font-semibold slashed-zero text-[#0D0D0D]"
                            >
                              <span>Password</span>
                              <span className="text-xs text-gray-500">
                                Min 8 characters
                              </span>
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded-md border border-[#e1e4e8] bg-white p-2"
                                type="password"
                                id="password"
                              />
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                type="button"
                              >
                                <EyeClose />
                              </button>
                            </div>
                          </div>
                          <motion.button
                            style={{
                              background:
                                "linear-gradient(180deg, #00AA45 50.49%, #1E874B 100%)",
                            }}
                            className="mx-auto flex items-center justify-center rounded-[20px] border-2 border-[#219653] py-2 pl-6 pr-4"
                            type="submit"
                            whileTap={{
                              background:
                                "linear-gradient(0deg, #00AA45 0%, #1E874B 100%), linear-gradient(0deg, #00AA45 50.49%, #1E874B 100%), var(--Green-green-400, #219653)",
                            }}
                          >
                            <span
                              style={{
                                textShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
                              }}
                              className="gap-1 font-semibold capitalize  text-white"
                            >
                              join peerlist
                            </span>
                            <ArrowRight />
                          </motion.button>
                        </form>
                        <p className="text-center text-xs font-semibold uppercase text-gray-400">
                          or
                        </p>
                        <div className="space-y-4">
                          <motion.button
                            className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-gray-200 bg-white py-[9px] pl-4 pr-6"
                            type="button"
                            whileTap={{
                              background:
                                "linear-gradient(180deg, #E1E4E8 0%, rgba(225, 228, 232, 0.30) 100%)",
                            }}
                          >
                            <Image
                              className="size-[22px]"
                              src={google}
                              alt="google logo"
                              draggable={false}
                            />
                            <span className="font-semibold text-[#0d0d0d]">
                              Continue with Google
                            </span>
                          </motion.button>
                          <motion.button
                            className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-gray-200 bg-white py-[9px] pl-4 pr-6"
                            type="button"
                            whileTap={{
                              background:
                                "linear-gradient(180deg, #E1E4E8 0%, rgba(225, 228, 232, 0.30) 100%)",
                            }}
                          >
                            <Image
                              className="size-[22px]"
                              src={apple}
                              alt="apple logo"
                              draggable={false}
                            />
                            <span className="font-semibold text-[#0d0d0d]">
                              Continue with Apple
                            </span>
                          </motion.button>
                        </div>
                        <p className="text-center text-xs text-[#6A737D]">
                          By tapping Continue, you agree to our{" "}
                          <span className="underline">Terms</span> and{" "}
                          <span className="underline">Privacy Policy</span>.
                        </p>
                      </motion.div>
                    </Dialog.Content>
                  </AnimatePresence>
                </Dialog.Portal>
              </Dialog.Root>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <motion.button
                    style={{
                      background:
                        "linear-gradient(245deg, rgba(209, 213, 218, 0.70) 0%, rgba(255, 255, 255, 0.00) 65.72%), var(--Background-bg-gray-00, #FFF)",
                      borderRadius: 16,
                    }}
                    layoutId="login"
                    type="button"
                    className="flex w-full justify-between border border-gray-200 p-4 slashed-zero"
                  >
                    <motion.div layoutId="login-text">
                      <h2 className="text-left font-semibold capitalize slashed-zero leading-6 text-[#0D0D0D]">
                        login
                      </h2>

                      <p className="text-xs leading-4 ">
                        Already have a Peerlist profile?
                      </p>
                    </motion.div>

                    <motion.div
                      layoutId="login-logo"
                      style={{
                        background:
                          "linear-gradient(180deg, #00AA45 35.94%, #1E874B 100%)",
                      }}
                      className="flex size-10 items-center justify-center rounded-[20px] border-2 border-[#219653] p-2"
                    >
                      <ChevronDown />
                    </motion.div>
                  </motion.button>
                </Dialog.Trigger>
                <Dialog.Portal container={container}>
                  <AnimatePresence>
                    <Dialog.Content asChild>
                      <motion.div
                        layoutId="login"
                        style={{
                          background:
                            "linear-gradient(245deg, rgba(209, 213, 218, 0.70) 0%, rgba(255, 255, 255, 0.00) 65.72%), var(--Background-bg-gray-00, #FFF)",
                          fontFamily: "var(--font-inter)",
                          borderRadius: 16,
                        }}
                        className={cn(
                          `w-[327px] space-y-6 border border-gray-200 px-6 py-4 absolute top-32`
                        )}
                      >
                        <div className="flex justify-between">
                          <motion.div layoutId="login-text">
                            <Dialog.Title asChild>
                              <h2 className="text-left font-semibold capitalize slashed-zero leading-6 text-[#0D0D0D]">
                                login
                              </h2>
                            </Dialog.Title>
                            <Dialog.Description asChild>
                              <p className="text-xs leading-4 ">
                                Already have a Peerlist profile?
                              </p>
                            </Dialog.Description>
                          </motion.div>
                          <Dialog.DialogClose asChild>
                            <motion.button type="button" layoutId="login-logo">
                              <XIcon />
                            </motion.button>
                          </Dialog.DialogClose>
                        </div>
                        <form
                          onSubmit={(e) => e.preventDefault()}
                          className="space-y-4 slashed-zero"
                        >
                          <div className="flex flex-col gap-2">
                            <label
                              htmlFor="email"
                              className="text-xs font-semibold slashed-zero text-[#0D0D0D]"
                            >
                              Email
                            </label>

                            <input
                              className="rounded-md border border-[#e1e4e8] bg-white p-2 "
                              type="email"
                              id="email"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label
                              htmlFor="password"
                              className="flex justify-between text-xs font-semibold slashed-zero text-[#0D0D0D]"
                            >
                              <span>Password</span>
                              <span className="text-xs text-gray-500">
                                Min 8 characters
                              </span>
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded-md border border-[#e1e4e8] bg-white p-2"
                                type="password"
                                id="password"
                              />
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                type="button"
                              >
                                <EyeClose />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold capitalize text-[#0d0d0d]">
                              forgot password?
                            </p>
                            <motion.button
                              style={{
                                background:
                                  "linear-gradient(180deg, #00AA45 50.49%, #1E874B 100%)",
                              }}
                              className=" flex items-center justify-center rounded-[20px] border-2 border-[#219653] py-2 pl-6 pr-4 "
                              type="submit"
                              whileTap={{
                                background:
                                  "linear-gradient(0deg, #00AA45 0%, #1E874B 100%), linear-gradient(0deg, #00AA45 50.49%, #1E874B 100%), var(--Green-green-400, #219653)",
                              }}
                            >
                              <span
                                style={{
                                  textShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
                                }}
                                className="gap-1 font-semibold capitalize  text-white"
                              >
                                Login
                              </span>
                              <ArrowRight />
                            </motion.button>
                          </div>
                        </form>
                        <p className="text-center text-xs font-semibold uppercase text-gray-400">
                          or
                        </p>
                        <div className="space-y-4">
                          <motion.button
                            className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-gray-200 bg-white py-[9px] pl-4 pr-6"
                            type="button"
                            whileTap={{
                              background:
                                "linear-gradient(180deg, #E1E4E8 0%, rgba(225, 228, 232, 0.30) 100%)",
                            }}
                          >
                            <Image
                              className="size-[22px]"
                              src={google}
                              alt="google logo"
                              draggable={false}
                            />
                            <span className="font-semibold text-[#0d0d0d]">
                              Continue with Google
                            </span>
                          </motion.button>
                          <motion.button
                            className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-gray-200 bg-white py-[9px] pl-4 pr-6"
                            type="button"
                            whileTap={{
                              background:
                                "linear-gradient(180deg, #E1E4E8 0%, rgba(225, 228, 232, 0.30) 100%)",
                            }}
                          >
                            <Image
                              className="size-[22px]"
                              src={apple}
                              alt="apple logo"
                              draggable={false}
                            />
                            <span className="font-semibold text-[#0d0d0d]">
                              Continue with Apple
                            </span>
                          </motion.button>
                        </div>
                        <p className="text-center text-xs text-[#6A737D]">
                          By tapping Continue, you agree to our{" "}
                          <span className="underline">Terms</span> and{" "}
                          <span className="underline">Privacy Policy</span>.
                        </p>
                      </motion.div>
                    </Dialog.Content>
                  </AnimatePresence>
                </Dialog.Portal>
              </Dialog.Root>
            </motion.div>
            <p className="text-center text-xs slashed-zero text-[#959DA5]">
              © 2024 Peerlist Inc. • iOS v1.4.2
            </p>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default Page;

const ChevronDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <g opacity="0.5">
        <path
          d="M6.00018 18.2L12.0002 12.2M18.0002 6.20003L11.999 12.2M11.999 12.2L6.00018 6.20003M12.0002 12.2L18.0002 18.2"
          stroke="#0D0D0D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <path
        d="M5.08334 11.2H18.4514M18.4514 11.2L12.0347 4.78335M18.4514 11.2L12.0347 17.6167"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EyeClose = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M2.5 6.03335C5.5 12.5333 14.5 12.5333 17.5 6.03335M14.816 9.35135L17.5 13.0333M10 10.9083V14.5333M5.184 9.35135L2.5 13.0333"
        stroke="#0D0D0D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
