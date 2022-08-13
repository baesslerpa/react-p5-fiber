import p5 from "p5";

/*
 * Modified Version of the default P5 Lib Class
 */
export default class DelayedP5 extends p5 {
  constructor(sketch, node) {
    super(sketch, node);

    this._runIfPreloadsAreDone = function () {
      // prevent P5 from running _setup and _draw
      // until React Reconciler tells it to
      return null;
    };
  }
}
