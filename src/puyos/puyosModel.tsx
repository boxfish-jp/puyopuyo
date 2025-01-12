import type { Dispatch, SetStateAction } from "react";
import { getPuyo } from "./puyo/makePuyos";
import type { Puyo } from "./puyo/puyo_type";

export class PuyosModel {
  private _setPuyos: Dispatch<SetStateAction<Puyo[]>>;

  constructor(setPuyos: Dispatch<SetStateAction<Puyo[]>>) {
    this._setPuyos = setPuyos;
  }

  drop(id: number) {
    const upPuyo = getPuyo({ color: "red", position: "up" });
    const downPuyo = getPuyo({ color: "blue", position: "down" });
    this._setPuyos((prev) => [...prev, { PuyoComponent: upPuyo, id }]);
    this._setPuyos((prev) => [...prev, { PuyoComponent: downPuyo, id }]);
  }
}
