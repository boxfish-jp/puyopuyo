import type { Puyo } from "./puyo/puyo_type";

export const addPuyos = (id: number, puyos: Puyo[]): Puyo[] => {
	const upPuyo = getInitialPuyo(id, "up");
	const downPuyo = getInitialPuyo(id + 1, "down");
	puyos.push(upPuyo, downPuyo);
	return puyos;
};

const getInitialPuyo = (id: number, which: "up" | "down"): Puyo => {
	const color = randomColor();
	const initPosition: Puyo["position"] =
		which === "up" ? { x: 150, y: 810 } : { x: 150, y: 750 };
	return {
		id: id,
		position: initPosition,
		color: color,
		stopped: null,
	};
};

const randomColor = (): Puyo["color"] => {
	const colors: Puyo["color"][] = ["red", "yellow", "green", "blue", "purple"];
	return colors[Math.floor(Math.random() * colors.length)];
};
