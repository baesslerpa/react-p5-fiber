# React P5 Fiber

React-P5-Fiber is a react-three-fiber is a React renderer for the [P5](https://p5js.org/) Library.

This Project is in super early Development, but good enough to play around with

## Install

```bash
npm i -save react-p5-fiber
```

## Setup

Replace the standard ReactDOM.render() with the P5Renderer

```tsx
import P5Renderer from "react-p5-fiber/renderer/P5Renderer";

...

P5Renderer.render(<App />, document.getElementById("root"));
```

> NOTE: Since we have replaced the DOM Renderer, normal HTML Syntax like `div` or `h1` won't produce any output

Inside our App Component we can now use any function that is available inside of the P5 Lib as follows

```tsx
function App() {
  return (
    <>
      <setup>
        <createCanvas width={1200} height={1200} />
        <background color={"white"} />
      </setup>

      <draw>
        <ellipse x={0} y={0} width={10} height={10} />
      </draw>
    </>
  );
}
```

> The only Elements that accept children are `setup` and `draw`

> Any function of the P5 Lib should work, but not all are Typed

> !!! The order of arguments matter and should be as you would pass it to the corresponding function !!!

## UseLoop Hook

```tsx
import { useState } from "react";
import { useLoop } from "react-p5-fiber";

function Component() {
  const [color, setColor] = useState(0);
  const [color2, setColor2] = useState(0);

  useLoop(
    // updated on every P5 Draw Loop
    (p5: P5) => {
      // you hav access to all the P5 Variables through the Value (here `p5`) passed into your Callback

      // update State using P5 Vars
      setColor(p.frameCount % 255);

      // update State using P5 Functions
      setColor2(p.random(255));
    },
    // pass in all States used inside the Callback
    [color, color2])

    return (
        ...
    )
  );
}
```
