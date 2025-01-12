import type { Puyo } from "./puyo_type";

export const PuyoComponent = ({ puyo }: { puyo: Puyo }) => {
  const colorName = getColorName(puyo.color);
  return (
    <div
      className={`absolute ${colorName} w-[60px] h-[60px] rounded-full z-10`}
      style={{
        left: `${puyo.position.x - 30}px`,
        top: `${720 - puyo.position.y - 30}px`,
      }}
    />
  );
};

const getColorName = (color: Puyo["color"]): string => {
  switch (color) {
    case "red":
      return "bg-red-400";
    case "yellow":
      return "bg-yellow-400";
    case "green":
      return "bg-green-500";
    case "blue":
      return "bg-blue-400";
    case "purple":
      return "bg-purple-400";
  }
};
