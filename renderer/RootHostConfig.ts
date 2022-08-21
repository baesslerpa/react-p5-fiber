import p5 from "p5";
import DelayedP5 from "../p5/DelayedP5";
import Instance from "./models/Instance";

export default class RootHostConfig {
  public p5: DelayedP5 & {
    _setup: () => void;
    _draw: () => void;
  } = undefined as any;
  public p: any;
  public rootElement: HTMLElement = undefined as any;

  constructor(
    public childHostContext: {
      setup: Instance[];
      draw: Instance[];
    }
  ) {
    this.p5 = new DelayedP5((p: p5) => (this.p = p), this.rootElement) as any;
  }

  setup() {
    this.p5.setup = () => {
      // Run all Setup functions
      for (const instance of this.childHostContext.setup) instance.run(this.p5);
    };
    this.p5._setup();
  }

  draw() {
    this.p5.draw = () => {
      window.dispatchEvent(new Event("p5-draw"));
      for (const instance of this.childHostContext.draw) {
        console.log("draw", instance);
        
        instance.run(this.p5);
      }
      this.p5.noLoop()
    };
    this.p5._draw();
  }
}
