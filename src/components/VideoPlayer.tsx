import React, { useRef, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa6";
import { BsFullscreen } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";

import videoFile from "../../video.mp4";
import { DarkMode } from "../type";

const VideoPlayer = ({ darkMode, setDarkMode }: DarkMode) => {
  const [playButton, setPlayButton] = useState<boolean>(true);
  const [fullScreen] = useState<boolean>(false);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);
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

  return (
    <div className="relative">
      {/* Video */}
      <video
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
      {/* Play Button */}
      {playButton ? (
        <button
          onClick={() => {
            handlePlayPause();
            setPlayButton(!playButton);
          }}
          className="text-white absolute bottom-3 left-3"
        >
          <IoMdPlay />
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
          <FaPause />
        </button>
      )}
      {/* FullScreenButton */}
      <BsFullscreen
        onClick={handleFullScreen}
        className="absolute bottom-3 right-3 text-white cursor-pointer"
      />
      {/* Settings */}
      <div className="relative">
        <CiSettings
          onClick={() => setSettingsMenu(!settingsMenu)}
          className="absolute bottom-[9px] right-12 text-[22px] text-white cursor-pointer"
        />
        {settingsMenu ? (
          <div
            onClick={() => setDarkMode(!darkMode)}
            className="absolute bg-white p-4 bottom-10 right-14 rounded-xl flex items-center gap-2 cursor-pointer"
          >
            <h1>DarkMode</h1>
            {darkMode ? (
              <RiCheckboxCircleLine />
            ) : (
              <RiCheckboxBlankCircleLine
              // onClick={() => setDarkMode(!darkMode)}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VideoPlayer;
