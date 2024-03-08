import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";

interface RewindAndForwardPropsType {
  setRewindTextHover: (e: string) => void;
  setForwardTextHover: (e: string) => void;
  rewindTextHover: string;
  forwardTextHover: string;
  handleRewind: () => void;
  handleWind: () => void;
}

const RewindAndForward = ({
  setRewindTextHover,
  handleRewind,
  rewindTextHover,
  handleWind,
  forwardTextHover,
  setForwardTextHover,
}: RewindAndForwardPropsType) => {
  return (
    <div className="flex flex-row items-center gap-4 space-x-20">
      <div>
        <TbRewindBackward5
          onMouseEnter={() => setRewindTextHover("Rewind 5 sec")}
          onMouseLeave={() => setRewindTextHover("")}
          onClick={handleRewind}
          className="text-white absolute bottom-3 left-[35%] cursor-pointer text-[20px]"
        />
        <span className="absolute bottom-10 text-white text-sm left-[30%]">
          {rewindTextHover}
        </span>
      </div>
      <TbRewindForward5
        onMouseEnter={() => setForwardTextHover("Forward 5 sec")}
        onMouseLeave={() => setForwardTextHover("")}
        onClick={handleWind}
        className="text-white absolute bottom-3 left-[47.5%] cursor-pointer text-[20px]"
      />
      <span className="absolute bottom-10 text-white text-sm left-[46%]">
        {forwardTextHover}
      </span>
    </div>
  );
};

export default RewindAndForward;
