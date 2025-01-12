import type { ComponentType, Dispatch, SetStateAction } from "react";
import { makePuyos } from "./puyo/makePuyos";

export interface PuyoType {
  PuyoComponent: ComponentType;
  id: number;
}

export class PuyosModel {
  private _setPuyos: Dispatch<SetStateAction<PuyoType[]>>;

  constructor(setPuyos: Dispatch<SetStateAction<PuyoType[]>>) {
    this._setPuyos = setPuyos;
  }

  drop(puyosId: number) {
    const id = puyosId;
    const newPuyo: ComponentType = makePuyos({ color: "red", position: "up" });
    this._setPuyos((prev) => [...prev, { PuyoComponent: newPuyo, id }]);
  }
}
