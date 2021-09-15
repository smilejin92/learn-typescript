type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

type ToArray<T> = T[];
type C = ToArray<number | string>;

// 조건부 타입을 사용할 경우
// 다음 분기문의 두 조건절은 모두 같은 타입 T[]로 해석하므로 조건부는 사실 아무 일도 수행하지 않는다.
type ToArray2<T> = T extends unknown ? T[] : T[];

// 단, 조건부 타입을 사용하면 유니온 타입은 조건부의 절들로 분배된다.
type D = ToArray2<number | string>; // number[] | string[]

type Without<T, U> = T extends U ? never : T;
type E = Without<boolean | number | string, boolean>;

export {};
