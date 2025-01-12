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
      let prevPuyos = puyos;
      const movePuyos = prevPuyos
        .filter((puyo) => puyo.stopped === null)
        .sort((a, b) => (a.position.y >= b.position.y ? 1 : -1));
      for (const puyo of movePuyos) {
        if (isStopped(puyos, puyo.position)) {
          prevPuyos = setStopped(prevPuyos, puyo.id);
        } else {
          prevPuyos = downPuyo(prevPuyos, puyo.id);
        }
      }
      if (movePuyos.length === 0) {
        setPuyos(addPuyos(prevPuyos.length, prevPuyos));
      }
      setPuyos([...prevPuyos]);
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
