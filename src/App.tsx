import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  return (
    <div
      className={`w-full min-h-screen ${
        darkMode ? "bg-slate-900" : "bg-slate-300"
      } flex flex-col gap-32 items-center`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <VideoPlayer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default App;
