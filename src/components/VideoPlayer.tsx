import { useEffect, useRef, useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";

import videoFile from "../../video.mp4";
import { DarkMode } from "../type";
import { motion } from "framer-motion";
import Video from "./Video";
import VideoTitle from "./VideoTitle";
import VideoDurationAndProgress from "./VideoDurationAndProgress";
import RewindAndForward from "./RewindAndForward";
import PlayPause from "./PlayPause";

const VideoPlayer = ({ darkMode, setDarkMode }: DarkMode) => {
  const [playButton, setPlayButton] = useState<boolean>(true);
  const [fullScreen] = useState<boolean>(false);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);
  const [settingsHoverText, setSettingsHoverText] = useState<string>("");
  const [playHoverText, setPlayHoverText] = useState<string>("");
  const [pauseHoverText, setPauseHoverText] = useState<string>("");
  const [fullScreenHoverText, setFullScreenHoverText] = useState<string>("");
  const [videoTitleHoverText, setVideoTitleHoverText] = useState<string>("");
  const [rewindTextHover, setRewindTextHover] = useState<string>("");
  const [forwardTextHover, setForwardTextHover] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  console.log(`Duration: ${videoDuration} Progress: ${currentProgress}`);

  //   handlePlayPause
  const handlePlayPause = () => {
    const video = videoRef.current!;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  //   handleFullScreen
  const handleFullScreen = () => {
    if (!fullScreen) {
      const video = videoRef.current!;

      const requestFullscreen = video.requestFullscreen;

      if (requestFullscreen) {
        requestFullscreen.call(video);
      }
    } else {
      const exitFullscreen = document.exitFullscreen;
      if (exitFullscreen) {
        exitFullscreen.call(document);
      }
    }
  };

  const handleRewind = () => {
    const video = videoRef.current!;
    video.currentTime -= 5;
  };
  const handleWind = () => {
    const video = videoRef.current!;
    video.currentTime += 5;
  };

  useEffect(() => {
    const video = videoRef.current!;
    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };
    const handleTimeUpdate = () => {
      setCurrentProgress(video.currentTime);
    };
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="relative">
      {/* Video */}
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <VideoTitle videoTitleHoverText={videoTitleHoverText} />
        <Video
          setPlayButton={setPlayButton}
          setVideoTitleHoverText={setVideoTitleHoverText}
          handlePlayPause={handlePlayPause}
          videoFile={videoFile}
          videoRef={videoRef}
          playButton={playButton}
        />
        <VideoDurationAndProgress
          currentProgress={currentProgress}
          videoDuration={videoDuration}
        />
      <RewindAndForward
        setForwardTextHover={setForwardTextHover}
        setRewindTextHover={setRewindTextHover}
        handleRewind={handleRewind}
        forwardTextHover={forwardTextHover}
        handleWind={handleWind}
        rewindTextHover={rewindTextHover}
        />
      </motion.div>
      <PlayPause
        playButton={playButton}
        playHoverText={playHoverText}
        setPlayButton={setPlayButton}
        pauseHoverText={pauseHoverText}
        handlePlayPause={handlePlayPause}
        setPauseHoverText={setPauseHoverText}
        setPlayHoverText={setPlayHoverText}
      />
      {/* FullScreenButton */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-3 right-3 text-white cursor-pointer"
      >
        <div className="flex flex-col items-end gap-4">
          <span className="text-sm">{fullScreenHoverText}</span>
          <BsFullscreen
            onClick={handleFullScreen}
            onMouseEnter={() =>
              settingsMenu ? null : setFullScreenHoverText("FullScreen")
            }
            onMouseLeave={() => setFullScreenHoverText("")}
          />
        </div>
      </motion.div>
      {/* Settings */}
      <div className="relative">
        <motion.div className="absolute bottom-[9px] right-12 text-[22px] text-white cursor-pointer">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-end gap-4">
              <span className="text-sm">{settingsHoverText}</span>
              <CiSettings
                className="hover:animate-spin"
                onMouseEnter={() =>
                  settingsMenu ? null : setSettingsHoverText("Settings")
                }
                onMouseLeave={() => setSettingsHoverText("")}
                onClick={() => {
                  setSettingsMenu(!settingsMenu);
                }}
              />
            </div>
          </motion.div>
        </motion.div>
        {settingsMenu ? (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              onClick={() => setDarkMode(!darkMode)}
              className={`absolute ${
                darkMode
                  ? "bg-slate-900 border border-bg-slate-300 outline-none text-white"
                  : "bg-slate-300 text-bg-slate-900 border border-gray-800"
              } p-4 bottom-10 right-14 rounded-xl flex items-center gap-2 cursor-pointer`}
            >
              <h1>DarkMode</h1>

              {darkMode ? (
                <RiCheckboxCircleLine />
              ) : (
                <RiCheckboxBlankCircleLine />
              )}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default VideoPlayer;
