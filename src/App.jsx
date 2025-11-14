import { useState, useEffect } from "react";

const standing = [
  "https://i.pinimg.com/736x/e2/4e/3a/e24e3a9e9943a23caec64858b1a1d7cc.jpg",
"https://i.pinimg.com/1200x/a9/2c/0c/a92c0c04aab41f5ce6d53fd68091b0da.jpg",
"https://i.pinimg.com/1200x/42/23/95/422395a3c4e0435b63ca3f09776de40f.jpg",
"https://i.pinimg.com/1200x/0e/3b/2a/0e3b2a36cdf71228b3229b216fc52681.jpg",
"https://i.pinimg.com/736x/08/45/ae/0845aedf8d0abcf87e3eb6b9e50d6707.jpg"
];

const sitting = [
  "https://i.pinimg.com/736x/3d/1b/d2/3d1bd25f0b8588171c57f1cf1fe7e2eb.jpg",
"https://i.pinimg.com/1200x/3c/cb/f6/3ccbf61ffa3ae54260b6c6f17b14f6b8.jpg",
"https://i.pinimg.com/736x/ab/3f/e7/ab3fe744589a3bcfb20be6e83ac19c3b.jpg",
"https://i.pinimg.com/736x/f8/53/ab/f853abe6ee570e0afc8bea58f0f4927e.jpg",
"https://i.pinimg.com/1200x/fc/f2/fb/fcf2fbc3bd803f4b905a17a1633dac58.jpg"
]

const dynamic = [
  "https://i.pinimg.com/736x/0b/cb/c3/0bcbc3fc4a9c812a90b2ddd64ce59c42.jpg",
  "https://i.pinimg.com/736x/aa/c4/6a/aac46acac286ac7f1934649601d6146d.jpg",
  "https://i.pinimg.com/736x/52/23/d8/5223d8a1415eabc19d3fee49b1f96a70.jpg",
  "https://i.pinimg.com/736x/92/6a/3b/926a3b6c51dbc625e3723c681ee9bcd6.jpg",
  "https://i.pinimg.com/736x/71/85/1d/71851d0911f76bc6b5ee3f040963f8fe.jpg"
]

const squatting = [
  "https://i.pinimg.com/736x/68/ad/6e/68ad6e40bb37199b7b57c36d5d16251d.jpg",
  "https://i.pinimg.com/1200x/5b/86/55/5b8655f97f76fe0889c3ba151ab9ff42.jpg",
  "https://i.pinimg.com/736x/5b/ca/7f/5bca7f33ef73119d869c20e60e25b742.jpg",
  "https://i.pinimg.com/736x/6c/3f/3f/6c3f3f22c53a7d7ebe96b4d3ec36fc1d.jpg",
  "https://i.pinimg.com/736x/b4/6d/00/b46d0028865b26435a504f05371cb293.jpg"
]

let id = 1;
const poses = [
  ...standing.map(img => ({ id: id++, type: "standing", img })),
  ...sitting.map(img => ({ id: id++, type: "sitting", img })),
  ...dynamic.map(img => ({ id: id++, type: "dynamic", img })),
  ...squatting.map(img => ({ id: id++, type: "squatting", img }))
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
  {["all", "standing", "sitting", "squatting", "dynamic"].map((t) => (
    <button
      key={t}
      onClick={() => setFilter(t)}
      className={
        filter === t
          ? (dark
              ? "px-4 py-2 text-sm rounded-xl bg-blue-500 text-white shadow"
              : "px-4 py-2 text-sm rounded-xl bg-blue-600 text-white shadow")
          : (dark
              ? "px-4 py-2 text-sm rounded-xl bg-gray-800 text-white shadow hover:bg-gray-700"
              : "px-4 py-2 text-sm rounded-xl bg-white text-black shadow hover:bg-gray-200")
      }
    >
      {t}
    </button>
  ))}
</div>


      <div className={dark
        ? "w-full max-w-md aspect-[3/4] bg-gray-800 shadow rounded-xl flex items-center justify-center overflow-hidden"
        : "w-full max-w-md aspect-[3/4] bg-white shadow rounded-xl flex items-center justify-center overflow-hidden"}>
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
