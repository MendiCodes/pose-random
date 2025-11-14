import { useState, useEffect } from "react";

// Sample poses. Replace img links with yours.
const poses = [
  { id: 1, type: "standing", img: "https://i.pinimg.com/1200x/0e/3b/2a/0e3b2a36cdf71228b3229b216fc52681.jpg" },
  { id: 2, type: "standing", img: "https://i.pinimg.com/736x/08/45/ae/0845aedf8d0abcf87e3eb6b9e50d6707.jpg" },
  { id: 3, type: "sitting", img: "https://i.pinimg.com/736x/0a/b9/54/0ab9544800d0b4c0afd067e77f1a48ad.jpg" },
  { id: 4, type: "dynamic", img: "https://i.pinimg.com/736x/0b/cb/c3/0bcbc3fc4a9c812a90b2ddd64ce59c42.jpg" },
  { id: 5, type: "squatting", img: "https://i.pinimg.com/736x/5c/13/f0/5c13f0eaaaeb7f9131b6509123a6b6a9.jpg" }
];

export default function App() {
  const [filter, setFilter] = useState("all");
  const [currentPose, setCurrentPose] = useState(null);
  const [duration, setDuration] = useState(10);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [dark, setDark] = useState(false);

  const filteredPoses = filter === "all"
    ? poses
    : poses.filter(p => p.type === filter);

  function randomizePose() {
    if (filteredPoses.length === 0) return;
    const idx = Math.floor(Math.random() * filteredPoses.length);
    setCurrentPose(filteredPoses[idx]);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          randomizePose();
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, filteredPoses]);

  return (
    <div className={dark ? "w-full min-h-screen flex flex-col items-center p-6 gap-6 bg-gray-900 text-white" : "w-full min-h-screen flex flex-col items-center p-6 gap-6 bg-gray-100 text-black"}>
      <div className="w-full flex justify-end">
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-xl shadow bg-white text-black hover:bg-gray-200"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h1 className="text-3xl font-bold">Pose.Random</h1>

      <div className="flex gap-3">
        {["all", "standing", "sitting", "squatting", "dynamic"].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={dark
              ? "px-4 py-2 text-sm rounded-xl bg-gray-800 shadow hover:bg-gray-700"
              : "px-4 py-2 text-sm rounded-xl bg-white shadow hover:bg-gray-200"}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={dark
        ? "w-full max-w-md aspect-square bg-gray-800 shadow rounded-xl flex items-center justify-center overflow-hidden"
        : "w-full max-w-md aspect-square bg-white shadow rounded-xl flex items-center justify-center overflow-hidden"}>
        {currentPose
          ? <img src={currentPose.img} alt="pose" className="w-full h-full object-contain" />
          : <p className="text-gray-500">Click Randomize to start</p>}
      </div>

      <div className="flex items-center gap-3 text-lg">
        <span>Time left:</span>
        <strong>{timeLeft}s</strong>
      </div>

      <button
        onClick={randomizePose}
        className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800"
      >
        Randomize
      </button>

      <div className="flex items-center gap-3 mt-4">
        <input
          type="number"
          min="3"
          className={dark ? "p-2 rounded-xl shadow bg-gray-800 text-white" : "p-2 rounded-xl shadow"}
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
        />
        <span>seconds per pose</span>
      </div>
    </div>
  );
}
