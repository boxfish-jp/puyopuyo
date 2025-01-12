import type { Puyo } from "./puyo/puyo_type";

export const lrPuyo = (puyos: Puyo[], id: number, direction: number) => {
	let diff: number;
	switch (direction) {
		case -1:
			diff = -3;
			break;
		case 1:
			diff = 3;
			break;
		default:
			throw new Error("Invalid direction");
	}
	const index = puyos.findIndex((puyo) => puyo.id === id);
	puyos[index].position.x += diff;
	return puyos;
};
