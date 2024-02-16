import {
  Component,
  For,
  createEffect,
  createSignal,
  on,
  onMount,
} from "solid-js";

import {
  AnimationController,
  createAnimationController,
} from "../src/animation";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const FlexPage: Component = () => {
  const [elements, setElements] = createSignal(Array.from(Array(10).keys()));
  const references: HTMLDivElement[] = [];
  const controllers: AnimationController[] = [];

  createEffect(
    on(
      elements,
      () => {
        queueMicrotask(() => {
          for (const controller of controllers) {
            controller.flip();
          }
        });
      },
      {
        defer: true,
      },
    ),
  );

  onMount(() => {
    for (const reference of references) {
      controllers.push(createAnimationController(reference));
    }
  });

  return (
    <>
      <button
        onClick={() => {
          setElements((arr) => [
            arr[arr.length - 1]!,
            ...arr.slice(0, arr.length - 1),
          ]);
        }}
      >
        Rotate
      </button>
      <div
        ref={(e) => {
          const observer = new ResizeObserver(() => {
            for (const controller of controllers) {
              controller.flip();
            }
          });
          observer.observe(e);
        }}
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          padding: "25px",
          gap: "50px",
        }}
      >
        <For each={elements()}>
          {(element) => (
            <div
              id={`id${element}`}
              ref={(e) => references.push(e)}
              style={{
                width: "100px",
                height: "100px",
                "background-color": getRandomColor(),
                color: "black",
              }}
            >
              {element}
            </div>
          )}
        </For>
      </div>
    </>
  );
};
