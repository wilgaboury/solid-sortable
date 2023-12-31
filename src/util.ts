/**
 * mod but the result is always positive
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function clamp(number: number, min = 0, max = 1): number {
  return number > max ? max : number < min ? min : number;
}

export interface CancelablePromise<T> {
  readonly promise: Promise<T>;
  readonly cancel: () => void;
}

export function normalize(n: number, min: number, max: number): number {
  return (clamp(n, min, max) - min) / (max - min);
}

/**
 * @param n value between 0 and 1
 * @param t value > 0 that controls the curvature of the function
 * @returns value from zero to infinity
 */
export function mapZeroOneToZeroInf(n: number, t = 1): number {
  return t / (1 - Math.max(0, Math.min(1, n))) - t;
}

export function assertExhaustive(
  _value: never,
  message: string = "Reached unexpected case in exhaustive switch",
): never {
  throw new Error(message);
}

export function run<T>(func: () => T): T {
  return func();
}

export function union<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  return new Set([...set1, ...set2]);
}

export function intersect<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  return new Set([...set1].filter(set2.has));
}

export function difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  return new Set([...set1].filter((item) => !set2.has(item)));
}

export function move<T>(
  arr: ReadonlyArray<T>,
  from: number,
  to: number,
  count: number = 1,
): ReadonlyArray<T> {
  const ret = [...arr];
  ret.splice(to, 0, ...ret.splice(from, count));
  return ret;
}

export function splice<T>(
  arr: ReadonlyArray<T>,
  index: number,
  count: number,
  ...items: T[]
) {
  const tmp = [...arr];
  tmp.splice(index, count, ...items);
  return tmp;
}

export function zip<A, B>(
  a: ReadonlyArray<A>,
  b: ReadonlyArray<B>,
): ReadonlyArray<[A, B]> {
  const len = Math.min(a.length, b.length);
  const ret: Array<[A, B]> = new Array();
  for (let i = 0; i < len; i++) {
    ret.push([a[i]!, b[i]!]);
  }
  return ret;
}
