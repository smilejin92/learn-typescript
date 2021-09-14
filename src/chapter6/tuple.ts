const a = [1, true] as [1, true]; // [1, true]

function tuple<T extends unknown[]>(...ts: T) {
  return ts;
}

const b = tuple(1, true); // [number, boolean]

export {};
