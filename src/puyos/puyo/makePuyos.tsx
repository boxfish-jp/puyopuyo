import { useState, useEffect, type ComponentType } from "react";

interface puyoSettingType {
  color: "red" | "yellow" | "green" | "blue" | "purple";
  position: "up" | "down";
}

interface puyoCssType {
  color: string;
}

export const getPuyo = (puyoSetting: puyoSettingType): ComponentType => {
  return () => <PuyoComponent puyoSetting={puyoSetting} />;
};

export const PuyoComponent = ({
  puyoSetting,
}: { puyoSetting: puyoSettingType }) => {
  const [positon, setPosition] = useState({ x: 150, y: 750 });

  const puyoCss = getPuyoCss(puyoSetting);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (positon.y > 30) {
        setPosition((prev) => ({ x: prev.x, y: prev.y - 6 }));
      } else {
        clearInterval(intervalId);
      }
    }, 1000 / 30);
    return () => clearInterval(intervalId);
  }, [positon]);

  return (
    <div
      className={`absolute ${puyoCss.color} w-[60px] h-[60px] rounded-full z-10`}
      style={{ left: `${positon.x - 30}px`, top: `${720 - positon.y - 30}px` }}
    />
  );
};

const getPuyoCss = (puyoSetting: puyoSettingType): puyoCssType => {
  let color: string;
  switch (puyoSetting.color) {
    case "red":
      color = "bg-red-700";
      break;
    case "yellow":
      color = "bg-yellow-700";
      break;
    case "green":
      color = "bg-green-700";
      break;
    case "blue":
      color = "bg-blue-700";
      break;
    case "purple":
      color = "bg-purple-700";
      break;
    default:
      throw new Error("Invalid color");
  }
  return { color };
};
