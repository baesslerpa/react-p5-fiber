import p5 from "p5";
import { v4 as uuid } from "uuid";

export default class Instance {
  public id = uuid();

  constructor(public type: keyof p5, public props: { [key: string]: any }) {}

  run(p5: p5) {
    try {
      // try to execute the Instance as P5 function
      // and pass all props as arguments

      p5[this.type](...Object.values(this.props));
    } catch (e) {
      console.error(e, this.type, this.props);
    }
  }
}
