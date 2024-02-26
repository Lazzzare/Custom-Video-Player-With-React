import { motion } from "framer-motion";
import { FaPause } from "react-icons/fa6";
import { IoMdPlay } from "react-icons/io";

interface PlayPausePropsType {
  playButton: boolean;
  handlePlayPause: () => void;
  setPlayButton: (e: boolean) => void;
  playHoverText: string;
  setPlayHoverText: (e: string) => void;
  pauseHoverText: string;
  setPauseHoverText: (e: string) => void;
}

const PlayPause = ({
  playButton,
  handlePlayPause,
  setPlayButton,
  playHoverText,
  setPlayHoverText,
  pauseHoverText,
  setPauseHoverText,
}: PlayPausePropsType) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      {playButton ? (
        <button
          onClick={() => {
            handlePlayPause();
            setPlayButton(!playButton);
          }}
          className="text-white absolute bottom-3 left-3"
        >
          <div className="flex flex-col items-start gap-3">
            <span>{playHoverText && playHoverText}</span>
            <IoMdPlay
              onMouseEnter={() =>
                playHoverText ? null : setPlayHoverText("Play")
              }
              onMouseLeave={() => setPlayHoverText("")}
            />
          </div>
        </button>
      ) : (
        // Pause Button
        <button
          onClick={() => {
            handlePlayPause();
            setPlayButton(!playButton);
          }}
          className="text-white absolute bottom-3 left-3"
        >
          <div className="flex flex-col items-start gap-3">
            <span>{pauseHoverText && pauseHoverText}</span>
            <FaPause
              onMouseEnter={() =>
                pauseHoverText ? null : setPauseHoverText("Pause")
              }
              onMouseLeave={() => setPauseHoverText("")}
            />
          </div>
        </button>
      )}
    </motion.div>
  );
};

export default PlayPause;
