// 1. 타입스크립트가 값이 number임을 추론하게 한다
let a = 1234; // number
let b = Infinity * 0.1; // number
let d = a < b; // boolean

// 2. const 키워드를 사용하여 타입스크립트가 값이 특정 number임을 추론하게 한다.
const c = 5678; // 5678

// 3. 값이 number임을 명시적으로 타입스크립트에 알린다.
let e: number = 100; // number

// 4. 타입스크립트에 값이 특정 number임을 명시적으로 알린다.
let f: 26.218 = 26.218; // 26.218
let g: 26.218 = 10; // 에러: 10 타입을 26.218 타입에 할당할 수 없음

export {};
