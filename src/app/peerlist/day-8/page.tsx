"use client";

import {
  useState,
  type Dispatch,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SetStateAction,
} from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BellIcon,
  CircleUserIcon,
  Mail,
  PlusIcon,
  SearchIcon,
  type LucideProps,
} from "lucide-react";

import { cn } from "@/lib/utils";

const interFont = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

type TabName = "profile" | "search" | "post" | "notifs" | "inbox";
const MobileNavbar = () => {
  const [active, setActive] = useState<TabName>("profile");

  const tabs: {
    name: TabName;
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[] = [
    {
      name: "profile",
      Icon: CircleUserIcon,
    },
    {
      name: "search",
      Icon: SearchIcon,
    },
    {
      name: "post",
      Icon: PlusIcon,
    },
    {
      name: "notifs",
      Icon: BellIcon,
    },
    {
      name: "inbox",
      Icon: Mail,
    },
  ];

  return (
    <main
      style={{
        fontFamily: "var(--font-inter)",
      }}
      className={`grid min-h-screen flex-1 place-content-center bg-gray-400 ${interFont.variable}`}
    >
      <div>
        <div
          className={
            "flex h-96 w-[375px] overflow-hidden rounded-3xl bg-[#20272c] shadow-2xl"
          }
        >
          <nav className="w-full self-end bg-[#FDFDFD] px-4 pb-3">
            <ul className="flex items-center justify-between gap-2">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  active={active}
                  setActive={setActive}
                  name={tab.name}
                  Icon={tab.Icon}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
};

export default MobileNavbar;

const variants: Variants = {
  active: {
    y: -8,
  },
  inactive: {
    y: 0,
  },
};
const Tab = ({
  name,
  active,
  setActive,
  Icon,
}: {
  name: TabName;
  active: TabName;
  setActive: Dispatch<SetStateAction<TabName>>;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <li onClick={() => setActive(name)}>
      <Link className="flex flex-col items-center gap-1" href="#">
        <motion.div
          initial={false}
          animate={active === name ? "active" : "inactive"}
          variants={variants}
          style={
            active === name
              ? {
                  backgroundColor: "#20272c",
                  borderColor: "#fdfdfd",
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }
          }
          className="rounded-full border-4 border-transparent p-2"
        >
          <Icon className={cn(active === name && "stroke-[#fdfdfd]")} />
        </motion.div>
        <motion.span
          className={cn(
            "text-xs capitalize font-light",
            name === active ? "font-semibold" : "font-light"
          )}
        >
          {name}
        </motion.span>
      </Link>
    </li>
  );
};
