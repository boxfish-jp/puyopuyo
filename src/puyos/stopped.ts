import type { Puyo } from "./puyo/puyo_type";

export const isStopped = (
	puyos: Puyo[],
	position: Puyo["position"],
): boolean => {
	return position.y <= 30;
};

export const setStopped = (puyos: Puyo[], id: number) => {
	const index = puyos.findIndex((puyo) => puyo.id === id);
	puyos[index].stopped = getStopped(puyos[index].position);
	return puyos;
};

const getStopped = (position: Puyo["position"]): Puyo["stopped"] => {
	return { x: 1, y: 1 };
};
