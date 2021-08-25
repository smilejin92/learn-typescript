// unknown 타입을 사용하고자 한다면 개발자가 명시적으로 설정해야 한다.
// 단, 유니온 타입에 `unknown` 이 포함되어 있으면 결과는 `unknown` 이 된다.
let a: unknown = 30; // unknown

// unkown 타입이 아닌 값과 unknown 타입인 값을 비교할 수 있다.
let b = a === 123; // boolean

// unkown 값이 특정 타입이라고 가정하고 해당 타입의 동작을 수행할 수 없다.
// 먼저 타입스크립트에게 해당 값의 특정 타입임을 증명해야 한다.
let c = a + 10; // 에러: Operator '+' cannot be applied to types 'unknown' and '10'.
if (typeof a === 'number') {
  let d = a + 10; // number
}

let f: string | unknown = 'f'; // unknown

export {};
