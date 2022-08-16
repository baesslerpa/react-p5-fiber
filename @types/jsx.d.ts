import { ReactNode } from "react";

type CustomElement<T> = Partial<T> & DOMAttributes<T> & { children: any };

export declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      // ["teyt"]: CustomElement<{Parameter<background>}>;
      ["pixelDensity"]: CustomElement<{ scale: number }>;
      /**
       * Setup Function
       * should only appear once
       * @param {ReactNode} children
       */
      ["setup"]: CustomElement<{ children: ReactNode }>;
      /** Draw function */
      ["draw"]: CustomElement<{ children: ReactNode }>;
      ["createCanvas"]: CustomElement<{ width: number; height: number }>;
      ["background"]: CustomElement<{ color: number | string }>;
      ["noStroke"]: CustomElement<{}>;
      ["ellipseMode"]: CustomElement<{ mode: string }>;
      ["ellipse"]: CustomElement<{
        x: number;
        y: number;
        width: number;
        height: number;
      }>;
      ["fill"]: CustomElement<{ color: number | string }>;
      ["stroke"]: CustomElement<{ r: number; g: number; b: number; a: number }>;
      ["beginShape"]: CustomElement<{}>;
      ["vertex"]: CustomElement<{ x: number; y: number; key: number }>;
      ["endShape"]: CustomElement<{}>;
    }
  }
}
