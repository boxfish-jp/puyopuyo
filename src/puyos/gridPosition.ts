import type { Puyo } from "./puyo/puyo_type";

export const getGridPosition = (
	position: Puyo["position"],
): Puyo["stopped"] | false => {
	if (isOnGrid(position)) {
		return false;
	}
	const x = (position.x - 30) / 60;
	const y = (position.y - 30) / 60;
	return { x, y } as Puyo["stopped"];
};

export const isOnGrid = (position: Puyo["position"]): boolean => {
	return (position.y - 30) % 60 !== 0 || (position.x - 30) % 60 !== 0;
};

export const isOnXGrid = (position: Puyo["position"]): boolean => {
	return (position.x - 30) % 60 === 0;
};
