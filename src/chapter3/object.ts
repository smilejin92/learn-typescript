// 1. object 타입 사용
// object는 단지 any보다 조금 더 좁은 타입이다. object는 서술하는 값에 관한 정보를 거의 알려주지 않으며,
// 값 자체가 자바스크립트 객체라고(null이 아니라고) 말해줄 뿐이다.
let a: object = { b: 'b' }; // object

a.b; // 에러: 'b' 프로퍼티는 'object'에 존재하지 않음.

// 2. 객체 리터럴 사용
// 타입스크립트가 f의 형태를 추론하게 하거나, 중괄호 안에서 명시적으로 타입을 묘사할 수 있다.
let c = { d: 'd' }; // { d: string }
let e = { f: { g: 'g' } }; // { f: { g: string } }
let h: { i: string } = { i: 'i' }; // { i: string }

// 주의할 것은 const 키워드로 선언한 객체 리터럴은 const 키워드로 선언한 원시 값(1, 'foo', true 등)처럼 타입 리터럴이 적용되지 않는다.
// 객체의 값은 바뀔 수 있으며, 타입스크립트도 객체를 만든 후 필드 값이 바뀔 수 있다는 것을 알기 때문이다.
const j = { k: 'k' }; // { k: string }

// 객체 리터럴 문법은 "이런 형태의 물건이 있어"라고 말한다. 이 물건은 객체 리터럴 또는 클래스일 수 있다.
// 즉, 특정 객체의 형태를 충족한다면 객체 리터럴을 사용하든, 클래스 인스턴스를 사용하든 모두 할당 가능하다.
let person: { firstName: string; lastName: string } = {
  firstName: 'Jin',
  lastName: 'Kim',
};

class Person {
  constructor(public firstName: string, public lastName: string) {}
}

person = new Person('Jay', 'Park');

// 객체 형태에 정의되지 않은 프로퍼티를 추가하거나 필요한 프로퍼티를 제공하지 않으면 에러가 발생한다.
let l: { m: number };
l = {};
// 에러: '{}' 타입에는 '{ m: number }' 타입에 필요한 'b' 프로퍼티가 없음

l = { m: 10, n: 20 };
// 에러: '{ m: number, n: number }' 타입을 '{ m: number }' 타입에 할당할 수 없음
// 객체 리터럴은 알려진 프로퍼티만 지정할 수 있는데, 'n'은 '{ m: number }' 타입에 존재하지 않음

// 선택형 프로퍼티, 추가될 수 있는 프로퍼티를 타입스크립트에게 알려줄 수 있다.
let o: {
  p: number; // o는 number 타입의 p 프로퍼티를 포함한다.
  q?: string; // o는 string 타입의 c 프로퍼티를 포함할 수도 있다.
  [key: number]: boolean; // o는 boolean 타입의 값을 갖는 number 타입의 프로퍼티를 여러 개 포함할 수 있다.
};

o = { p: 1 };
o = { p: 1, q: undefined };
o = { p: 1, q: 'q' };
o = { p: 1, 10: true };
o = { p: 1, 10: true, 20: false };
o = { 10: true }; // 에러: '{ 10: true }' 타입에는 'p' 프로퍼티가 없음
o = { q: 1, 33: 'red' }; // 에러: string 타입은 boolean 타입에 할당할 수 없음

// 객체 타입을 정의할 때 readonly 한정자를 사용하여 특정 필드를 읽기 전용으로 정의할 수 있다.
// 이는 마치 객체 프로퍼티에 const를 적용한 듯한 효과를 낸다.
let user: { readonly firstName: string } = {
  firstName: 'Jin',
};

user.firstName; // 'Jin'
user.firstName = 'Jay'; // 에러: 'firstName'은 읽기 전용 프로퍼티이므로 할당 할 수 없음

// 3. 빈 객체 리터럴
// 빈 객체 리터럴(`{}`)을 사용하여 타입을 나타낸다.
// null, undefined를 제외한 모든 타입의 값을 빈 객체 타입에 할당할 수 있다. (사용 X)
let danger: {};
danger = {};
danger = { x: 1 };
danger = [];
danger = 2;

export {};
