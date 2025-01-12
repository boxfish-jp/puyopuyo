import { useEffect, useState } from "react";
import { addPuyos } from "./puyos/addPuyos";
import type { Puyo } from "./puyos/puyo/puyo_type";
import { isStopped, setStopped } from "./puyos/stopped";
import { PuyoComponent } from "./puyos/puyo/puyo";
import { downPuyo } from "./puyos/downPuyo";
import { isOnXGrid } from "./puyos/gridPosition";
import { lrPuyo } from "./puyos/lrPuyo";

export const App = () => {
  const [puyos, setPuyos] = useState<Puyo[]>([]);
  const [key, setKey] = useState({ direction: 0, started: false });

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const code = e.code;

      if (code === "ArrowLeft") {
        if (!key.started) {
          setKey({ direction: -1, started: false });
        }
      }
      if (code === "ArrowRight") {
        if (!key.started) {
          setKey({ direction: 1, started: false });
        }
      }
    };
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
          if (key.direction !== 0) {
            if (isOnXGrid(puyo.position) && key.started) {
              setKey({ direction: 0, started: false });
            } else {
              lrPuyo(prevPuyos, puyo.id, key.direction);
              if (!key.started) {
                setKey({ direction: key.direction, started: true });
              }
            }
          }
        }
      }
      if (movePuyos.length === 0) {
        setPuyos(addPuyos(prevPuyos.length, prevPuyos));
      }
      setPuyos([...prevPuyos]);
    }, 1000 / 60);
    window.addEventListener("keydown", keyHandler);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [puyos, key]);

  return (
    <div className="bg-blue-100 w-[360px] h-[720px] relative">
      {puyos.map((puyo) => {
        return <PuyoComponent puyo={puyo} key={puyo.id} />;
      })}
    </div>
  );
};
