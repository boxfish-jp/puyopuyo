import type { ComponentType } from "react";
export interface Puyo {
	PuyoComponent: ComponentType;
	id: number;
}

export interface PuyoPosition {
	x: number;
	y: number;
}
