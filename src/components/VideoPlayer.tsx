import React, { useRef, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa6";
import { BsFullscreen } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";

import videoFile from "../../video.mp4";
import { DarkMode } from "../type";
import { motion } from "framer-motion";

const VideoPlayer = ({ darkMode, setDarkMode }: DarkMode) => {
  const [playButton, setPlayButton] = useState<boolean>(true);
  const [fullScreen] = useState<boolean>(false);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);
  const [settingsHoverText, setSettingsHoverText] = useState<string>("");
  const [playHoverText, setPlayHoverText] = useState<string>("");
  const [pauseHoverText, setPauseHoverText] = useState<string>("");
  const [fullScreenHoverText, setFullScreenHoverText] = useState<string>("");
  const [videoTitleHoverText, setVideoTitleHoverText] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  return (
    <div className="relative">
      {/* Video */}
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
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

        <video
          onMouseEnter={() =>
            setVideoTitleHoverText("At the Cinema | Mr. Bean Official")
          }
          onMouseLeave={() => setVideoTitleHoverText("")}
          className="rounded-xl"
          onClick={() => {
            handlePlayPause();
            setPlayButton(!playButton);
          }}
          ref={videoRef as React.RefObject<HTMLVideoElement>}
          src={videoFile}
          controls={false}
          preload="metadata"
        ></video>
      </motion.div>
      {/* Rewind */}
      <div className="flex flex-row items-center gap-4 space-x-20">
        <TbRewindBackward5
          onClick={handleRewind}
          className="text-white absolute bottom-3 left-[43%] cursor-pointer text-[20px]"
        />
        <TbRewindForward5
          onClick={handleWind}
          className="text-white absolute bottom-3 left-[43%] cursor-pointer text-[20px]"
        />
      </div>
      {/* Play Button */}
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
