// 1. 타입스크립트가 값이 string 추론하게 한다
let a = 'hello'; // string
let b = 'billy'; // string
let ab = a + '' + b; // string

// 2. const 키워드를 사용하여 타입스크립트가 값이 특정 string임을 추론하게 한다.
const c = '!'; // !

// 3. 값이 string 명시적으로 타입스크립트에 알린다.
let e: string = 'foo'; // string

// 4. 타입스크립트에 값이 특정 string임을 명시적으로 알린다.
let f: 'foo' = 'foo'; // 26.218
let g: 'bar' = 'foo'; // 에러: 'foo' 타입을 'bar' 타입에 할당할 수 없음

export {};
