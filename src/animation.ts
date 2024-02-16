import { Position, clientToRelative, elemClientRect } from "./geom";

export type AnimationController = ReturnType<typeof createAnimationController>;

export function createAnimationController(
  elem: HTMLElement,
  options?: { animDurationMs?: () => number; animEasing?: () => string },
) {
  function getElemPos() {
    if (elem.parentElement == null)
      throw new Error("cannot animate the root element");
    return clientToRelative(elemClientRect(elem), elem.parentElement);
  }

  let anim: Animation | undefined;
  let from: Position = getElemPos();
  let to: Position | undefined;

  return {
    /**
     * Performs the animation, should be called after a layout change or with the postion setter argument if
     * layout is being done using transform/translate.
     */
    flip(setPosition?: () => void) {
      const visibility = elem.style.visibility;
      try {
        if (anim != null) {
          const progress =
            (anim.currentTime as number) /
            (anim.effect!.getTiming()!.duration! as number);
          from = {
            x: from.x + progress * (to!.x - from.x), // TODO: use inverse of easing function
            y: from.y + progress * (to!.y - from.y),
          };
        } else if (setPosition != null) {
          from = getElemPos();
        }

        setPosition?.();

        const nextTo = getElemPos();
        if (to != null && to.x == nextTo.x && to.y == nextTo.y) return;
        else to = nextTo;

        const deltaX = from.x - to.x;
        const deltaY = from.y - to.y;

        anim = elem.animate(
          [
            {
              transform: `translate(${deltaX}px, ${deltaY}px)`,
            },
            {
              transform: "translate(0px, 0px)",
            },
          ],
          {
            duration: options?.animDurationMs?.() ?? 250,
            easing: options?.animEasing?.() ?? "linear",
            fill: "forwards",
          },
        );
        anim.onfinish = () => {
          anim = undefined;
          from = to!;
          to = undefined;
        };
      } finally {
        elem.style.visibility = visibility;
      }
    },
  };
}
