interface VideoDurationAndProgressPropsType {
  currentProgress: number;
  videoDuration: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
  return formattedTime;
};

const VideoDurationAndProgress = ({
  currentProgress,
  videoDuration,
}: VideoDurationAndProgressPropsType) => {
  return (
    <div className="absolute bottom-2.5 left-[45%] transform right-[50%]  w-full text-white text-3xl">
      <span className="text-sm">
        {`${formatTime(currentProgress)} / ${formatTime(videoDuration)}`}
      </span>
    </div>
  );
};

export default VideoDurationAndProgress;
