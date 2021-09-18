// `Exclude<T, U>` - T에는 속하지만 U에는 없는 타입을 구한다.
// type A = number | string;
// type B = string;
// type C = Exclude<A, B>; // number

// `Extract<T, U>` - T의 타입 중 U에 할당할 수 있는 타입을 구한다.
// type A = number | string;
// type B = string;
// type C = Extract<A, B>; // string

//`NonNullable<T>` - T에서 null과 undefined를 제외한 버전을 구한다.
// type A = { a?: number | null };
// type B = NonNullable<A['a']>; // number

// `ReturnType<F>` - 함수의 반환 타입을 구한다. 단, 제네릭과 오버로드된 함수에서는 동작하지 않는다.
// type F = (a: number) => string;
// type R = ReturnType<F>; // string

// `InstanceType<C>` - 클래스 생성자의 인스턴스 타입을 구한다.
type A = { new (): B };
type B = { b: number };
type I = InstanceType<A>; // { b: number }

export {};
