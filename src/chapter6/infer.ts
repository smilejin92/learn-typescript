// infer 키워드 사용 X
type ElementType<T> = T extends unknown[] ? T[number] : T;
type A = ElementType<number[]>;

// infer 키워드 사용 O
type ElementType2<T> = T extends (infer U)[] ? U : T;
type B = ElementType<number[]>;

export {};
