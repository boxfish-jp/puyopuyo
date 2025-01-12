import { useState, useEffect, type ComponentType } from "react";

interface PuyoSetting {
  color: "red" | "yellow" | "green" | "blue" | "purple";
  position: "up" | "down";
}

interface PuyoCss {
  color: string;
  yPosition: number;
}

export const getPuyo = (setting: PuyoSetting): ComponentType => {
  return () => <PuyoComponent setting={setting} />;
};

export const PuyoComponent = ({ setting }: { setting: PuyoSetting }) => {
  const puyoCss = getPuyoCss(setting);

  const [positon, setPosition] = useState({ x: 150, y: puyoCss.yPosition });

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

const getPuyoCss = (setting: PuyoSetting): PuyoCss => {
  const color = getCssColor(setting.color);
  const yPosition = getPosition(setting.position);
  return { color, yPosition };
};

const getPosition = (positon: string): number => {
  switch (positon) {
    case "up":
      return 810;
    case "down":
      return 750;
    default:
      throw new Error("Invalid position");
  }
};

const getCssColor = (color: string): string => {
  switch (color) {
    case "red":
      return "bg-red-700";
    case "yellow":
      return "bg-yellow-700";
    case "green":
      return "bg-green-700";
    case "blue":
      return "bg-blue-700";
    case "purple":
      return "bg-purple-700";
    default:
      throw new Error("Invalid color");
  }
};
