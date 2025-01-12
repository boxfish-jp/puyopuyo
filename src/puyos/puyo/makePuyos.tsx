import { useState, useEffect, type ComponentType } from "react";

interface puyoSettingType {
  color: "red" | "yellow" | "green" | "blue" | "purple";
  position: "up" | "down";
}

export const makePuyos = (puyoSetting: puyoSettingType): ComponentType => {
  return PuyoComponent;
};

const PuyoComponent: React.FC = () => {
  const [positon, setPosition] = useState({ x: 150, y: 750 });

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
      className="absolute bg-blue-700 w-[60px] h-[60px] rounded-full z-10"
      style={{ left: `${positon.x - 30}px`, top: `${720 - positon.y - 30}px` }}
    />
  );
};
