import { Rect, elemPageRect } from "./geom";

export function AnimationController(
  elem: HTMLElement,
  getPosition: () => Rect,
  onAnimEnd: () => void,
  options: { animDurationMs?: number; animEasing?: string },
) {
  let rect = elemPageRect(elem);
  let anim: Animation | undefined;

  return {
    flip: () => {
      if (anim != null) {
        rect = elemPageRect(elem);
        anim.cancel();
      }

      const cur = getPosition();

      elem.style.position = "absolute";
      elem.style.transform = `translate(${rect.x}px, ${rect.y}px)`;

      anim = elem.animate(
        {
          transform: `translate(${cur.x}px, ${cur.y}px)`,
        },
        {
          duration: options.animDurationMs ?? 250,
          easing: options.animEasing ?? "ease",
          fill: "forwards",
        },
      );
      anim.onfinish = () => {
        anim = undefined;
        onAnimEnd();
      };
    },
  };
}
