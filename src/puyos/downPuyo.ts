import type { Puyo } from "./puyo/puyo_type";

export const downPuyo = (puyos: Puyo[], id: number) => {
	const index = puyos.findIndex((puyo) => puyo.id === id);
	puyos[index].position.y -= 3;
	return puyos;
};
