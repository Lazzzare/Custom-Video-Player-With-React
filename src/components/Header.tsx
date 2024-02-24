import { DarkMode } from "../type";

const Header = ({ darkMode }: DarkMode) => {
  return (
    <div className="mt-8">
      <h1
        className={`${darkMode ? "text-white" : "text-black"} text-3xl italic`}
      >
        Custom Video Player
      </h1>
    </div>
  );
};

export default Header;
