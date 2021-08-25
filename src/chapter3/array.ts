// 배열을 선언하고 특정 타입의 값을 추가했을 때, 타입스크립트는 이미 이 배열이 특정 타입의 값을 갖는 배열이라 추론한다.
let a = [1, 2, 3]; // number[]
var b = ['a', 'b']; // strin[]
let c: string[] = ['a'];
let d = [1, 'a']; // (number | string)[]

// 2개 이상의 타입을 포함하는 배열을 대상으로 `map` 같은 배열 메소드를 사용할 때, 각 요소의 타입에 맞는 동작을 수행해야한다. (`typeof` 연산자 사용)
d.map((elem) => {
  if (typeof elem === 'number') {
    return elem * 3;
  }
  return elem.toUpperCase();
});

// 객체와 마찬가지로 배열을 `const` 키워드로 만들어도 타입스크립트는 타입을 더 좁게 추론하지 않는다.
const e = [2, 'b']; // (number | string)[]

// 배열이 초기화된 이후에 해당 배열에서 취급하지 않는 타입의 값을 추가하려하면 에러가 발생한다.
let f = ['red'];
f.push('blue');
f.push(true); // 에러: true 타입 인수를 number 타입 매개변수에 할당할 수 없음

// 빈 배열로 초기화하면 타입스크립트는 배열의 요소 타입을 알 수 없으므로 `any[]`일 것으로 추론한다.
let g = []; // any[]
g.push(1); // number[]
g.push('red'); // (string | number)[]

// 배열이 정의된 영역을 벗어나면 타입스크립트는 배열을 더 이상 확장할 수 없도록 최종 타입을 할당한다.
function buildArray() {
  let a = []; // any[]
  a.push(1); // number[]
  a.push('x'); // (number | string)[]
  return a;
}

let myArray = buildArray(); // (number | string)[]
myArray.push(true); // 에러: 'true' 타입의 인수는 'string | number' 타입의 매개변수에 할당할 수 없음

export {};
