import { motion, useAnimation } from "framer-motion";
import {
  Arrow,
  ChevronDown,
  Ruler,
  PencilSimple,
  ChatTearDrop,
  Frame,
  Slash,
  PenNib,
  TextT,
  Sparkle,
} from "./icons";
import { useEffect } from "react";

export const Dev = () => {
  const controls = useAnimation();
  const contentControls = useAnimation();
  useEffect(() => {
    const sequence = async () => {
      await contentControls.start({ y: 0 });
      await controls.start({ width: 388 });
      await controls.start({ width: 205 });
    };
    sequence();
  }, []);
  return (
    <motion.div
      style={{
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      }}
      initial={{ width: 388 }}
      animate={controls}
      className="flex flex-1 items-center gap-4 overflow-hidden border-y border-l border-[#E1E4E8] border-r-transparent bg-white p-2"
      key={"dev"}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={contentControls}
        className="flex w-full items-center gap-4"
      >
        <button type="button" className="flex items-center gap-px">
          <div className="flex items-center justify-center rounded-md bg-[#00AA45] p-1">
            <Arrow />
          </div>
          <ChevronDown />
        </button>
        <button className="flex items-center justify-center p-1">
          <Ruler />
        </button>
        <button className="flex items-center justify-center p-1">
          <PencilSimple />
        </button>
        <button className="flex items-center justify-center p-1">
          <ChatTearDrop />
        </button>
      </motion.div>
    </motion.div>
  );
};

export const Design = () => {
  const controls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await contentControls.start({ y: 0 });
      await controls.start({ width: 199 });
      await controls.start({ width: 388 });
    };

    sequence();
  }, []);
  return (
    <motion.div
      style={{
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      }}
      className="flex items-center gap-4 overflow-hidden border-y border-l border-[#E1E4E8] bg-white p-2"
      key={"design"}
      initial={{ width: 199 }}
      animate={controls}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={contentControls}
        className="flex w-full items-center gap-4"
      >
        <button type="button" className="flex items-center gap-px">
          <div className="flex items-center justify-center rounded-md bg-[#2F80ED] p-1">
            <Arrow />
          </div>
          <ChevronDown />
        </button>
        <button type="button" className="flex items-center gap-px">
          <div className="flex items-center justify-center rounded-md p-1">
            <Frame />
          </div>
          <ChevronDown />
        </button>
        <button type="button" className="flex items-center gap-px">
          <div className="flex items-center justify-center rounded-md p-1">
            <Slash />
          </div>
          <ChevronDown />
        </button>
        <button type="button" className="flex items-center gap-px">
          <div className="flex items-center justify-center rounded-md p-1">
            <PenNib />
          </div>
          <ChevronDown />
        </button>
        <button className="flex items-center justify-center p-1">
          <TextT />
        </button>
        <button className="flex items-center justify-center p-1">
          <ChatTearDrop />
        </button>
        <button className="flex items-center justify-center p-1">
          <Sparkle />
        </button>
      </motion.div>
    </motion.div>
  );
};
