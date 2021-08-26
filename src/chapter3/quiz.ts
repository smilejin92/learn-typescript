// 1. 타입스크립트는 다음의 값을 어떻게 추론할까?
let a = 1042; // number
let b = 'apples and oranges'; // string
const c = 'pineapples'; // 'pineapples'
let d = [true, true, false]; // boolean[]
let e = { type: 'ficus' }; // { type: string }
let f = [1, false]; // (number | boolean)[]
const g = [3]; // number[]

// when using the --strictNullChecks flag, null and undefined are only assignable to unknown, any and their respective types
// (the one exception being that undefined is also assignable to void).
let h = null; // any

// 2. 다음 코드는 왜 주석에 적힌 에러를 에러를 발생시킬까?
let i: 3 = 3;
i = 4; // i의 타입은 숫자 리터럴 3이므로 3외에 다른 타입의 값을 재할당 할 수 없음

let j = [1, 2, 3];
j.push(4);
j.push('5'); // j가 초기화될 때 타입이 number[]로 추론되었음. 따라서 숫자 외 타입의 값을 추가 할 수 없음.

let k: never = 4; // never 타입은 모든 타입의 서브 타입임. never 자신 말고는 할당 할 수 없음

let l: unknown = 4;
let m = l * 2; // l의 타입이 unknown이므로, 숫자 연산을 하기 위해서는 l이 숫자 타입이란 것을 증명해야함.

export {};
