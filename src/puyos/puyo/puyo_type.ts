export interface Puyo {
	id: number;
	position: PuyoPosition;
	color: "red" | "yellow" | "green" | "blue" | "purple";
	stopped: stopped | null;
}

interface PuyoPosition {
	x: number;
	y: number;
}

interface stopped {
	x: 1 | 2 | 3 | 4 | 5 | 6;
	y: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
