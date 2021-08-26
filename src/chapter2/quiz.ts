// 타입스크립트는 각 변수에 할당된 값의 타입을 추론한다.
let a = 1 + 2;
let b = a + 3;
let c = {
  apple: a,
  banana: b,
};
let d = c.apple * 4;

export {};
