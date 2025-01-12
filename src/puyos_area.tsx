import { useEffect, useState } from "react";
import { addPuyos } from "./puyos/addPuyos";
import type { Puyo } from "./puyos/puyo/puyo_type";
import { isStopped, setStopped } from "./puyos/stopped";
import { PuyoComponent } from "./puyos/puyo/puyo";
import { downPuyo } from "./puyos/downPuyo";

export const PuyosArea = () => {
  const [puyos, setPuyos] = useState<Puyo[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      for (const puyo of puyos) {
        if (isStopped(puyos, puyo.position)) {
          setPuyos((prev) => {
            const settedPuyos = setStopped(prev, puyo.id);
            return [...settedPuyos];
          });
        } else {
          setPuyos((prev) => {
            const movedPuyos = downPuyo(prev, puyo.id);
            return [...movedPuyos];
          });
        }
      }
      const movePuyos = puyos.filter((puyo) => puyo.stopped === null);
      if (movePuyos.length === 0) {
        setPuyos(addPuyos(puyos.length, puyos));
      }
    }, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [puyos]);

  return (
    <>
      {puyos.map((puyo) => {
        return <PuyoComponent puyo={puyo} key={puyo.id} />;
      })}
    </>
  );
};
