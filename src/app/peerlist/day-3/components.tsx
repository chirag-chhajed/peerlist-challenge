import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useHover } from "@uidotdev/usehooks";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useSound from "use-sound";

import { Slider } from "@/components/ui/slider";

import { PauseIcon, PlayIcon } from "./icons";

const Player = ({
  album,
  musicPath,
  songName,
  artistName,
  uniqueKey,
}: {
  album: StaticImageData;
  musicPath: string;
  songName: string;
  artistName: string;
  uniqueKey: string;
}) => {
  const [ref, hovering] = useHover();

  const [playing, setPlaying] = useState(false);
  const [play, { pause, sound, duration }] = useSound(musicPath, {
    onend: () => setPlaying(false),
  });
  const [currentTime, setCurrentTime] = useState(0);

  const totalDuration = Math.round(duration ?? 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setCurrentTime(sound.seek() * 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [sound]);

  const handleSliderChange = useCallback(
    (value: number[]) => {
      if (sound) {
        const newPosition = value[0] / 1000;
        sound.seek(newPosition);
        setCurrentTime(newPosition * 1000);
      }
    },
    [sound]
  );

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
      }}
    >
      {playing ? (
        <motion.div
          style={{ borderRadius: "16px" }}
          className="w-[400px] space-y-4 rounded-2xl border border-gray-100 bg-white p-4"
          layoutId={`${uniqueKey}-wrapper`}
        >
          <motion.div
            layoutId={`${uniqueKey}-image`}
            style={{ borderRadius: "8px" }}
            className="aspect-square w-full overflow-hidden"
          >
            <Image src={album} className="size-full" alt="album cover" />
          </motion.div>

          <Slider
            min={0}
            max={totalDuration}
            step={1}
            value={[currentTime]}
            onValueChange={handleSliderChange}
          />

          <div className="flex items-center justify-between">
            <motion.div
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-px"
            >
              <h2 className="text-lg font-semibold slashed-zero text-black">
                {songName}
              </h2>
              <p className="text-base slashed-zero text-gray-700 ">
                {artistName}
              </p>
            </motion.div>
            <motion.button
              layout
              className="flex items-center gap-1 rounded-3xl border-2 border-[#24292E] bg-[#24292E] text-white"
              type="button"
              onClick={() => {
                setPlaying(false);
                pause();
              }}
              style={{ padding: "6px 16px 6px 14px" }}
              whileHover={{
                boxShadow: "0px 0px 0px 4px #E1E4E8",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PauseIcon />

              <motion.span
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold slashed-zero"
              >
                Pause
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          ref={ref}
          className="flex w-[400px] items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 "
          whileHover={{
            boxShadow: "0px 12px 24px 0px rgba(33, 33, 33, 0.60)",
          }}
          layoutId={`${uniqueKey}-wrapper`}
          style={{ borderRadius: "16px" }}
        >
          <div className="flex items-center gap-6">
            <motion.div
              layoutId={`${uniqueKey}-image`}
              className="overflow-hidden"
              style={{
                borderRadius: "8px",
              }}
            >
              <Image
                src={album}
                className="size-20"
                alt="album cover"
                priority
              />
            </motion.div>
            <motion.div className="space-y-px">
              <h2 className="text-lg font-semibold capitalize slashed-zero text-black">
                {songName}
              </h2>
              <p className="text-base capitalize slashed-zero text-gray-700">
                {artistName}
              </p>
            </motion.div>
          </div>

          <motion.button
            layout
            className="flex items-center gap-1 rounded-3xl border-2 border-[#24292E] bg-[#24292E] p-2 text-white"
            type="button"
            onClick={() => {
              setPlaying(true);
              play();
            }}
            animate={hovering ? { padding: "6px 16px 6px 14px" } : {}}
            whileHover={{
              boxShadow: "0px 0px 0px 4px #E1E4E8",
            }}
          >
            <PlayIcon />

            <AnimatePresence initial={false} mode="popLayout">
              {hovering ? (
                <motion.span
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-semibold slashed-zero"
                >
                  Play
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </MotionConfig>
  );
};

export { Player };
