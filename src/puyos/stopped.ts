import type { Puyo } from "./puyo/puyo_type";

export const isStopped = (
	puyos: Puyo[],
	position: Puyo["position"],
): boolean => {
	const gridPosition = getGridPosition(position);
	if (!gridPosition) {
		return false;
	}
	const topPositions = [-1, -1, -1, -1, -1, -1];
	for (const puyo of puyos) {
		if (puyo.stopped !== null) {
			if (topPositions[puyo.stopped.x] < puyo.stopped.y) {
				topPositions[puyo.stopped.x] = puyo.stopped.y;
			}
		}
	}
	return topPositions[gridPosition.x] + 1 === gridPosition.y;
};

export const setStopped = (puyos: Puyo[], id: number) => {
	const index = puyos.findIndex((puyo) => puyo.id === id);
	puyos[index].stopped = getStopped(puyos[index].position);
	return puyos;
};

const getGridPosition = (
	position: Puyo["position"],
): Puyo["stopped"] | false => {
	if ((position.y - 30) % 60 !== 0 || (position.x - 30) % 60 !== 0) {
		return false;
	}
	const x = (position.x - 30) / 60;
	const y = (position.y - 30) / 60;
	return { x, y } as Puyo["stopped"];
};

const getStopped = (position: Puyo["position"]): Puyo["stopped"] => {
	const gridPosition = getGridPosition(position);
	if (!gridPosition) {
		throw new Error("Invalid position");
	}
	return gridPosition;
};
