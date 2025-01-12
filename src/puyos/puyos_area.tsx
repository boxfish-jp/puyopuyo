import { useEffect, useState } from "react";
import { PuyosModel } from "./puyosModel";
import type { Puyo } from "./puyo/puyo_type";

export const PuyosArea = () => {
  const [puyos, setPuyos] = useState<Puyo[]>([]);
  const puyosModel = new PuyosModel(setPuyos);

  useEffect(() => {
    const intervalId = setInterval(() => {
      puyosModel.drop(puyos.length);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [puyosModel.drop, puyos]);

  return (
    <>
      {puyos.map(({ PuyoComponent, id }) => (
        <PuyoComponent key={id} />
      ))}
    </>
  );
};
