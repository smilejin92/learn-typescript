// 길이가 고정되어있고, 각 인텍스의 타입이 알려진 배열의 일종이다.
// 다른 타입과 달리 튜플은 선언할 때 타입을 명시해야 한다.
let a: [number] = [1];

// [이름, 성씨, 생년]
let b: [string, string, number] = ['Jin', 'Kim', 1900];
b = ['Queen', 'Elizabeth', 'ii', 1929]; // 에러: 'string'은 'number' 타입에 할당할 수 없음

// 튜플은 선택형 요소도 지원한다. 객체 타입에서와 마찬가지로 ?는 '선택형'을 뜻한다.
// 방향에 따라 다른 값을 갖는 기차 요금 배열
let trainFares: [number, number?][] = [[3.75], [8.25, 7.7], [10.5]];
// 아래 방법으로 작성할 수 있다.
let moreTrainFares: ([number] | [number, number])[] = [
  // ...
];

// 튜플이 최소 길이를 갖도록 지정할 때는 나머지 요소(`...`)를 사용할 수 있다.
// 최소 한 개의 요소를 갖는 string 배열
let friends: [string, ...string[]] = ['Sara', 'Tali', 'Chloe', 'Claire'];
// 이형 배열
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c'];

// 타입스크립트의 `readonly` 배열 타입을 사용하여 불변 배열을 만들 수 있다. 이때 명시적으로 타입을 작성한다.
let as: readonly number[] = [1, 2, 3]; // readonly number[]
let bs: readonly number = as.concat(4); // readonly number[]

let three = bs[2]; // number
as[4] = 5; // 에러: 'readonly number[]'의 인덱스 시그니처 타입은 읽기만 허용함
as.push(6); // 에러: 'push' 프로퍼티는 'readonly number[]' 타입에 존재하지 않음

// 다양한 형태로 읽기 전용 배열과 튜플 타입을 선언할 수 있다.
type A = readonly string[]; // readonly string[]
type B = ReadonlyArray<string>; // readonly string[]
type C = Readonly<string[]>; // readonly string[]

type D = readonly [number, string]; // readonly [number, string]
type E = Readonly<[number, string]>; // readonly [number, string]

export {};
