// 보통 함수 매개변수의 타입은 명시적으로 정의한다.
// 반환 타입은 자동으로 추론된다.
function add(a: number, b: number) {
  return a + b;
}

add(1, 2); // number
add(1, '2'); // 에러: 'a' 인수 타입은 'number' 매개변수 타입에 할당할 수 없음

// 함수에서도 `?`를 사용해 선택적 매개변수를 지정할 수 있다.
// 이때 필수 매개변수를 먼저 지정하고 선택적 매개변수를 뒤에 추가한다.
function log(message: string, userId?: string) {
  const time = new Date().toISOString();
  console.log(time, message, userId);
}

// 선택적 매개변수는 뒤에 와야 하지만, 기본 매개변수는 어디에나 추가할 수 있다.
// 타입스크립트는 기본 매개변수의 타입을 추론할 수 있기 때문에 선택적 매개변수를 굳이 사용 할 필요없다.
function log2(message: string, userId = 'Not signed in') {
  const time = new Date().toISOString();
  console.log(time, message, userId);
}

// 기본 매개변수에도 타입을 명시 할 수 있다.
type Context = {
  appId?: string;
  userId?: string;
};

// 기본 매개변수에도 타입을 명시 할 수 있다.
function log3(message: string, context: Context = {}) {
  const time = new Date().toISOString();
  console.log(time, message, context.appId, context.userId);
}

// arguments를 사용한 가변 인자 함수
function sum() {
  // 반환 타입이 any로 추론된다.
  return Array.from(arguments).reduce((total, n) => {
    // total과 n이 any로 추론된다.
    return total + n;
  }, 0);
}

sum(1, 2, 3); // 에러: 0개의 인수가 필요한데 3개의 인수가 제공됨

// rest 파라미터를 사용한 가변 인자 함수
function sum2(...numbers: number[]) {
  // 반환 타입이 number로 추론된다.
  return numbers.reduce((total, n) => {
    // total과 n이 number로 추론된다.
    return total + n;
  }, 0);
}

sum2(1, 2, 3); // 6으로 평가

// 일반 함수에서 `this`를 사용할 경우 `call`, `apply` 메소드로 `this`가 가리킬 객체를 전달한다.
// 만약 `this`로 사용될 객체를 전달하지 않으면(함수가 일반 함수로 호출되면) `this`는 전역 객체를 가리킨다.
function fancyDate() {
  return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`;
}

// call 메소드로 호출
fancyDate.call(new Date());
// 일반 함수로 호출
fancyDate(); // TypeError: this.getDate는 함수가 아님 (런타임 에러)

// 타입스크립트로 작성한 일반 함수에서 `this`를 사용할 경우 `this`가 가리킬 객체의 타입을 첫 번째 매개변수로 선언한다.
function fancyDate2(this: Date) {
  return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`;
}

// call 메소드로 호출
fancyDate2.call(new Date());

// 일반 함수로 호출
fancyDate2(); // 에러: void 타입의 'this'를 'Date' 타입의 'this'에 할당할 수 없음 (컴파일 에러)

export {};
