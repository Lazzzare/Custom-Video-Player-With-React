import { motion } from "framer-motion";

interface VideoTitlePropsType {
  videoTitleHoverText: string;
}

const VideoTitle = ({ videoTitleHoverText }: VideoTitlePropsType) => {
  return (
    <>
      {videoTitleHoverText && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="absolute p-1 rounded-t-xl text-white text-xl bg-gray-500 bg-opacity-40 w-full">
            {videoTitleHoverText}
          </span>
        </motion.div>
      )}
    </>
  );
};

export default VideoTitle;
