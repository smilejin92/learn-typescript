// 타입스크립트가 boolean으로 추론하게 한다.
let a = true; // boolean
var b = true; // boolean

// 타입스크립트가 특정 boolean(ex. true)으로 추론하게 한다.
const c = true; // true

// 값의 타입이 boolean임을 명시적으로 타입스크립트에게 알린다.
let d: boolean = true; // boolean

// 값의 타입이 특정 boolean(ex. true)임을 명시적으로 타입스크립트에게 알린다.
let e: true = true; // true
let f: true = false; // 에러: false 타입을 true 타입에 할당할 수 없음

export {};
