import { Position, elemPageRect } from "./geom";

export type AnimationController = ReturnType<typeof createAnimationController>;

export function createAnimationController(args: {
  elem: HTMLElement;
  getPosition: () => Position;
  onAnimEnd?: () => void;
  options?: { animDurationMs?: number; animEasing?: string };
}) {
  let pos: Position = elemPageRect(args.elem);
  let anim: Animation | undefined;

  return {
    flip: () => {
      if (anim != null) {
        pos = elemPageRect(args.elem);
        anim.cancel();
      }

      const cur = args.getPosition();

      args.elem.style.position = "absolute";
      args.elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

      anim = args.elem.animate(
        {
          transform: `translate(${cur.x}px, ${cur.y}px)`,
        },
        {
          duration: args.options?.animDurationMs ?? 250,
          easing: args.options?.animEasing ?? "ease",
          fill: "forwards",
        },
      );
      anim.onfinish = () => {
        anim = undefined;
        args.onAnimEnd?.();
      };
    },
  };
}
