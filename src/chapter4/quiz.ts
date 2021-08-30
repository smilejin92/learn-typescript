// 1. 타입스크립트는 함수 타입 시그니처에서 어떤 부분을 추론하는가? 매개변수 타입, 반환 타입 또는 두 가지 모두?
// 둘 다.

// 2. 자바스크립트의 arguments 객체는 타입 안정성을 제공하는가? 그렇지 않다면 무엇으로 대체할 수 있을까?
// arguments 객체는 타입 안정성을 제공하지 않는다. 나머지 매개변수를 사용하여 대체할 수 있다.

// 3. 시작 날짜가 바로 지금인 휴가를 예약하는 기능을 구현하려 한다.
// 아래 샘플 코드에 명시적 시작 날짜 없이 목적지만 인수로 받는 세 번째 호출 시그니처를 추가하라.
// 또한 새로 추가한 오버로드된 시그니처를 지원하도록 reserve의 구현도 갱신하자.
type Reserve = {
  (from: Date, to: Date, destination: string): void;
  (from: Date, destination: string): void;
  (destination: string): void;
};

let reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string
) => {
  if (
    fromOrDestination instanceof Date &&
    toOrDestination instanceof Date &&
    destination !== undefined
  ) {
    // Book a one-way trip
  } else if (
    fromOrDestination instanceof Date &&
    typeof toOrDestination === 'string'
  ) {
    // Book a round trip
  } else if (typeof fromOrDestination === 'string') {
    // Book a trip right away
  }
};

// 4. 아래 call 함수에서 두 번째 인수가 string인 함수여야 정상 동작하도록 구현을 바꿔보자.
// 이를 제외한 모든 함수는 컴파일 타임에 에러를 발생시켜야 한다.
function call<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args);
}

function fill(length: number, value: string): string[] {
  return Array.from({ length }, () => value);
}

call(fill, 10, 'a'); // string[]

// 타입 안정성을 지원하는 작은 assertion 라이브러리 is를 구현해보자.
function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every((_) => _ === a);
}

// string과 string 비교
is('string', 'otherstring'); // false

// boolean과 boolean 비교
is(true, false); // false

// number와 number 비교
is(42, 42); // true

// 서로 다른 두 타입을 비교하려 하면 컴파일 타임 에러가 발생
is(10, 'foo'); // 에러: 'foo' 타입의 인수를 number 타입의 매개변수에 할당할 수 없음

// [어려움] 임의의 개수의 인수를 전달할 수 있어야 함
is([1], [1, 2], [1, 2, 3]); // false

export {};
