import p5 from "p5";
import { useEffect, useState } from "react";
import { LocalRootHostConfig } from "../renderer/P5Renderer";

export default function useP5() {
  const [p5, setP5] = useState<p5 | null>(null);

  useEffect(() => {
    const update = () => {
      setP5({ ...LocalRootHostConfig.p5 } as p5);
    };

    if (LocalRootHostConfig.p5?._setupDone) {
      window.addEventListener("p5-draw", update);
    }

    return () => window.removeEventListener("p5-draw", update);
  }, []);

  return p5;
}

export function useLoop(create: (p: p5) => void, deps: any[]) {
  useEffect(() => {
    const update = () => {
      create(LocalRootHostConfig.p5);
    };
    if (LocalRootHostConfig.p5?._setupDone) {
      window.addEventListener("p5-draw", update);
    }
    return () => window.removeEventListener("p5-draw", update);
  }, deps);
}
