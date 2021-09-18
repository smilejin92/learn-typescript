// infer 키워드 사용 X
type ElementType<T> = T extends unknown[] ? T[number] : T;
type A = ElementType<number[]>; // number

// infer 키워드 사용 예제 1
// T[number] 타입을 U로 대체할 수 있다.
// 타입스크립트는 문맥을 살펴, 어떤 T를 전달했느냐를 보고 U의 타입을 추론한다.
type ElementType2<T> = T extends (infer U)[] ? U : T;
type B = ElementType<number[]>; // number

// infer 키워드 사용 예제 2
type SecondArgOf<F> = F extends (a: any, b: infer B) => any ? B : never;

type Slice = typeof Array['prototype']['slice'];
type C = SecondArgOf<Slice>; // number | undefined

export {};
