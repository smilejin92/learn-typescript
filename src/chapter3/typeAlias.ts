// 변수로 값을 표현하듯, 타입 별칭으로 타입을 표현할 수 있다.
type Age = number;
type Person = {
  name: string;
  age: Age;
};

// 타입스크립트는 별칭을 추론하지는 않으므로 반드시 별칭의 타입을 명시적으로 정의해야한다.
let age: Age = 55;
let driver: Person = {
  name: 'Jin',
  age,
};

// 하나의 타입을 두 번 정의할 수 없다.
type Color = 'red';
type Color = 'blue'; // 에러: 'Color' 식별자를 중복 정의함

// let, const 키워드로 선언한 변수처럼 블록 레벨 스코프를 따른다.
type Color = 'red';

let x = Math.random() < 0.5;

if (x) {
  type Color = 'blue';
  let b: Color = 'blue'; // 위의 Color 정의를 덮어씀
} else {
  let c: Color = 'red';
}

export {};
