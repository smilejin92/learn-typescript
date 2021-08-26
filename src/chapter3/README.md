# 3. 타입의 모든 것

- **타입** - **값과 이 값으로 할 수 있는 일의 집합이다**. 즉, 값을 가지고 어떤 일을 할 수 있고 어떤 일을 할 수 없는지 알 수 있다.
  - boolean 타입은 `true`, `false`와 이 값에 대해 수행할 수 있는 모든 연산(`||`, `&&`, `?`)의 집합
  - number 타입은 숫자와 숫자에 적용할 수 있는 모든 연산(`+`, `-`, `*`, `/`, `%` 등), 숫자에 호출할 수 있는 모든 메소드(`.toFixed`, `toPrecision`)의 집합
  - string 타입은 모든 문자열과 문자열에 수행할 수 있는 모든 연산, 문자열에 호출할 수 있는 모든 메소드의 집합
- 타입 검사기를 이용해 유효하지 않은 동작이 실행되는 일을 예방한다.

&nbsp;

아래 간단한 예제를 통해 타입이 어떻게 동작하는지 확인해보자.

```typescript
// 매개변수의 타입을 제한하면, 타입스크립트가 함수를 호출할 때 호환이 되는 인수로 호출했는지 판단한다.
function sqareOf(n: number) {
  return n * n;
}
squareOf(2); // 4로 평가
squareOf('z'); // 에러: "z" 타입의 인수는 'number' 타입의 매개변수에 할당 할 수 없음.
```

1. `squareOf`의 매개변수 `n`은 number로 제한된다.
2. `2` 값은 number에 할당할 수 있는(호환되는) 타입이다.

&nbsp;  

## 3.1. 타입의 종류

아래는 타입의 계층 구조이다. (ex. any 타입은 void, null, number 등 하위 타입을 포함한다.)

* unknown
  * any
    * void
      * undefined
    * null
    * number
      * number enum
      * never
    * bigint
      * never
    * boolean
      * never
    * string
      * string enum
      * never
    * symbol
      * unique symbol
      * never
    * object
      * array
        * tuple
        * never
      * function
        * never
      * constructor
        * never

&nbsp;  

### 3.1.1. any

* `any`로 무엇이든 할 수 있지만, 꼭 필요한 상황이 아니라면 사용하지 않는 것이 좋다.
  * `any`는 모든 값의 집합이므로 `any` 타입의 값으로 덧셈, 곱셈, `.pizza()` 호출 등 무슨 작업이든 할 수 있다.
  * `any`를 사용하게되면 값이 자바스크립트처럼 동작하며, 타입 검사기가 무용지물이된다.
* 타입스크립트에서는 **프로그래머와 타입스크립트 둘 다 타입을 알 수 없는 상황**에서는 기본 타입인 `any`로 가정한다.
* **`any`를 사용하려면 명시적으로 선언해야 한다.**
  * 타입스크립트가 어떤 값을 `any`로 추론해야 하는 상황(ex. 함수의 매개변수 타입 정의 누락, 타입을 사용하지 않는 자바스크립트 모듈 import)에는 컴파일 타임 예외가 발생한다. (`noImplicitAny` 설정이 적용되어 있는 경우)

```typescript
let a: any = 666; // any
let b: any = ['danger']; // any
let c = a + b; // any
```

&nbsp;  

> **TSC 플래그: `noImplicitAny`**
>
> 타입스크립트의 기본 설정은 `any`로 추론되는 값을 발견하더라도 예외를 발생시키지 않는다. 따라서 암묵적인 `any`가 나타났을 때 예외를 발생시키고 싶다면 `tsconfig.json`에서 `noImplicitAny` 플래그를 활성화한다.
>
> `noImplicitAny`는 TSC 플래그의 `strict` 패밀리에 속하므로, `strict` 설정이 활성화되어 있다면 `noImplicitAny` 플래그를 따로 설정하지 않아도된다.

&nbsp;  

### 3.1.2. unknown

* 타입을 미리 알 수 없는 어떤 값이 있을 때 `any` 대신 `unknown`을 사용한다.
* `any` 와 같이 모든 값을 대표하지만, `unknown` 의 타입을 검사하여 정제하기 전까지는 타입스크립트가 `unknown` 타입의 값을 사용 할 수 없게 강제한다.
* 비교 연산(`==`, `===`, `||`, `&&`, `?`)과 반전(`!`), 자바스크립트의 `typeof`, `instanceof` 연산자로 정제할 수 있다.
* `unknown` 타입을 사용하고자 한다면 개발자가 명시적으로 설정해야 한다. (단, 유니온 타입에 `unknown` 이 포함되어 있으면 결과는 `unknown` 이 된다.)

```typescript
// unknown 타입을 사용하고자 한다면 개발자가 명시적으로 설정해야 한다.
// 단, 유니온 타입에 `unknown` 이 포함되어 있으면 결과는 `unknown` 이 된다.
let a: unknown = 30; // unknown

// unkown 타입이 아닌 값과 unknown 타입인 값을 비교할 수 있다.
let b = a === 123; // boolean

// unkown 값이 특정 타입이라고 가정하고 해당 타입의 동작을 수행할 수 없다.
// 먼저 타입스크립트에게 해당 값의 특정 타입임을 증명해야 한다.
let c = a + 10; // 에러: Operator '+' cannot be applied to types 'unknown' and '10'.
if (typeof a === 'number') {
  let d = a + 10; // number
}

let f: string | unknown = 'f'; // unknown
```

&nbsp;  

### 3.1.3. boolean

* `true` 혹은 `false` 값을 가진다
* 비교연산, 혹은 반전 연산만 할 수 있다.
* **타입 리터럴** - 오직 하나의 값을 나타내는 타입

```typescript
// 1. 타입스크립트가 boolean으로 추론하게 한다.
let a = true; // boolean
var b = true; // boolean

// 2. 타입스크립트가 특정 boolean(ex. true)으로 추론하게 한다.
const c = true; // true

// 3. 값의 타입이 boolean임을 명시적으로 타입스크립트에게 알린다.
let d: boolean = true; // boolean

// 4. 값의 타입이 특정 boolean(ex. true)임을 명시적으로 타입스크립트에게 알린다.
let e: true = true; // true
let f: true = false; // 에러: false 타입을 true 타입에 할당할 수 없음
```

위 예제의 2, 4번은 **타입 리터럴**을 사용한다. 타입 리터럴이란, **오직 하나의 값을 나타내는 타입**이다. 위 예제의 `c`, `e`, `f`의 값은 boolean 타입이 가질 수 있는 값 중 특정 하나의 값으로 한정된다. `const` 키워드를 사용하면 타입스크립트는 그 변수의 값이 절대 변하지 않을 것이라는 사실을 알게되어 해당 변수가 가질 수 있는 **가장 좁은 타입으로 추론한다.** 

타입 리터럴은 모든 곳에서 일어날 수 있는 실수를 방지하여 안정성을 추가로 확보해주는 강력한 언어 기능이다.

&nbsp;  

### 3.1.4. number

* 모든 숫자(정수, 소수, 양수, 음수, `Infinity`, `NaN` 등)의 집합
* 산술, 비교 연산 등을 지원

```typescript
// 1. 타입스크립트가 값이 number임을 추론하게 한다
let a = 1234; // number
let b = Infinity * 0.1; // number
let d = a < b; // boolean

// 2. const 키워드를 사용하여 타입스크립트가 값이 특정 number임을 추론하게 한다.
const c = 5678; // 5678

// 3. 값이 number임을 명시적으로 타입스크립트에 알린다.
let e: number = 100; // number

// 4. 타입스크립트에 값이 특정 number임을 명시적으로 알린다.
let f: 26.218 = 26.218; // 26.218
let g: 26.218 = 10; // 에러: 10 타입을 26.218 타입에 할당할 수 없음
```

&nbsp;  

### 3.1.5. string

* 모든 문자열의 집합
* 연결(`+`), 슬라이스(`.slice`) 등의 연산을 수행할 수 있다.

```typescript
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
```

&nbsp;  

### 3.1.6. 객체

* 타입스크립트의 객체 타입은 **객체의 형태(shape)를 정의한다.** 즉, 객체 리터럴로 만든 간단한 객체 `{}`와 `new` 키워드를 사용해 만든 복잡한 객체를 구분할 수 없다. 이는 자바스크립트가 구조 기반 타입을 갖도록 설계되었기 때문이다.
* **구조 기반 타입화** - 객체의 이름과 상관없이 **객체가 어떤 프로퍼티를 갖고 있는지를 따진다.** Duck typing이라고도 불린다.
* 타입스크립트에서 객체를 정의하는 방법은 크게 4가지로 요약할 수 있다.
  * **객체 리터럴** (ex. `{ a: string }`) - 객체가 어떤 필드를 포함할 수 있는지 알고 있거나, 객체의 모든 값이 같은 타입을 가질 때 사용한다.
  * 빈 객체 리터럴 (`{}`) - 사용하지 않는 것이 좋다.
  * **`object` 타입** - 어떤 필드를 가지고 있는지는 관심 없고, 그저 객체가 필요할 때 사용
  * `Object` 타입 - 사용하지 않는 것이 좋다.
* **인덱스 시그니처** - `{ [key: T]: U }` 같은 문법을 인덱스 시그니처라 부른다. 타입스크립트에 어떤 객체가 여러 키를 가질 수 있음을 알려준다.
  * 명시적으로 정의한 키 외에 다양한 키를 객체에 안전하게 추가할 수 있다.
  * **인덱스 시그니처의 키(T) 타입은 반드시 number나 string 타입에 할당할 수 있어야한다.**
    * 자바스크립트 객체는 문자열을 키의 타입으로 사용한다. 배열은 숫자 키를 사용하는 객체의 일종이다.

&nbsp;  

**1. `object` 타입**

* `object`는 단지 `any`보다 조금 더 좁은 타입이다. `object`는 서술하는 값에 관한 정보를 거의 알려주지 않으며, 값 자체가 자바스크립트 객체라고(`null`이 아니라고) 말해줄 뿐이다.

```typescript
let a: object = { b: 'b' }; // object

a.b; // 에러: 'b' 프로퍼티는 'object'에 존재하지 않음.
```

&nbsp;  

**2. 객체 리터럴**

* 타입스크립트가 객체의 형태를 추론하게 하거나, 중괄호 안에서 명시적으로 타입을 묘사할 수 있다.

```typescript
// 타입 추론
let c = { d: 'd' }; // { d: string }
let e = { f: { g: 'g' } }; // { f: { g: string } }

// 타입 명시
let h: { i: string } = { i: 'i' }; // { i: string }
```

&nbsp;  

* 주의할 것은 `const` 키워드로 선언한 객체 리터럴은 `const` 키워드로 선언한 원시 값처럼(`1`, `'foo'`, `true` 등) 타입 리터럴이 적용되지 않는다. 객체의 값은 바뀔 수 있으며, 타입스크립트도 객체를 만든 후 필드 값이 바뀔 수 있다는 것을 알기 때문이다.

```typescript
const j = { k: 'k' }; // { k: string }
```

&nbsp;  

* 객체 리터럴 문법은 "이런 형태의 물건이 있어"라고 말한다. 이 물건은 객체 리터럴 또는 클래스 인스턴스일 수 있다. 즉, **특정 객체의 형태를 충족한다면 객체 리터럴을 사용하든, 클래스 인스턴스를 사용하든 모두 할당 가능**하다.

```typescript
let person: { firstName: string; lastName: string } = {
  firstName: 'Jin',
  lastName: 'Kim',
};

class Person {
  constructor(public firstName: string, public lastName: string) {}
}

person = new Person('Jay', 'Park');
```

&nbsp;  

* 객체 형태에 정의되지 않은 프로퍼티를 추가하거나 필요한 프로퍼티를 제공하지 않으면 에러가 발생한다.

```typescript
let l: { m: number };
l = {};
// 에러: '{}' 타입에는 '{ m: number }' 타입에 필요한 'b' 프로퍼티가 없음

l = { m: 10, n: 20 };
// 에러: '{ m: number, n: number }' 타입을 '{ m: number }' 타입에 할당할 수 없음
// 객체 리터럴은 알려진 프로퍼티만 지정할 수 있는데, 'n'은 '{ m: number }' 타입에 존재하지 않음
```

&nbsp;  

* 선택형 프로퍼티, 추가될 수 있는 프로퍼티를 타입스크립트에게 알려줄 수 있다.

```typescript
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
```

&nbsp;  

* 객체 타입을 정의할 때 `readonly` 한정자를 사용하여 특정 필드를 읽기 전용으로 정의할 수 있다. 이는 마치 객체 프로퍼티에 const를 적용한 듯한 효과를 낸다.

```typescript
let user: { readonly firstName: string } = {
  firstName: 'Jin'
};

user.firstName; // 'Jin'
user.firstName = 'Jay'; // 에러: 'firstName'은 읽기 전용 프로퍼티이므로 할당 할 수 없음
```

&nbsp;  

**3. 빈 객체 리터럴**

* 빈 객체 리터럴(`{}`)을 사용하여 타입을 나타낸다.
* `null`, `undefined`를 제외한 모든 타입의 값을 빈 객체 타입에 할당할 수 있다. (사용 X)

```typescript
let danger: {};
danger = {};
danger = { x: 1 };
danger = [];
danger = 2;
```

&nbsp;  

### 3.1.7. 타입 별칭, 유니온, 인터섹션

**타입 별칭**

* 변수로 값을 표현하듯, 타입 별칭으로 타입을 표현할 수 있다.
* 타입스크립트는 별칭을 추론하지는 않으므로 반드시 별칭의 타입을 명시적으로 정의해야한다.
* 타입 별칭은 복잡한 타입을 반복하여 작성하지 않도록(DRY)하며, 변수가 어떤 목적으로 사용되었는지 쉽게 이해할 수 있게 도와준다.
* 값을 변수로 할당할지를 결정하는 것과 같은 기준으로 타입 별칭을 사용할지 여부를 결정할 수 있다.

```typescript
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
```

&nbsp;  

* 하나의 타입을 두 번 정의할 수 없다.

```typescript
type Color = 'red';
type Color = 'blue'; // 에러: 'Color' 식별자를 중복 정의함
```

&nbsp;  

* let, const 키워드로 선언한 변수처럼 블록 레벨 스코프를 따른다.

```typescript
type Color = 'red';

let x = Math.random() < 0.5;

if (x) {
  type Color = 'blue';
  let b: Color = 'blue'; // 위의 Color 정의를 덮어씀
} else {
  let c: Color = 'red';
}
```

&nbsp;  

**유니온과 인터섹션 타입**

* **유니온**: A, B 타입이 합쳐진 타입 (`A | B`) - 합집합
  * 유니온 타입에 사용된 값이 꼭 유니온을 구성하는 타입 중 하나일 필요는 없으며, 양쪽 모두에 속할 수 있다. 둘 중 하나의 타입으로 좁혀져야한다면, 차별된 유니온 타입을 사용할 수 있다.
* **인터섹션**: A, B 타입 중 공통 부분만을 가진 타입 (`A & B`) - 교집합

```typescript
type Cat = { name: string; purrs: true };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;

type Cat = { name: string; purrs: true };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;

// Cat
let a: CatOrDogOrBoth = {
  name: 'Terry',
  purrs: true,
};

// Dog
a = {
  name: 'Domino',
  barks: true,
  wags: true,
};

// 둘 다
// CatOrDogOrBoth와 CatAndDog 타입 모두 충족한다.
a = {
  name: 'Donkers',
  barks: true,
  wags: true,
  purrs: true,
};
```

&nbsp;  

* 함수의 반환 값이 유니온 타입일 수 있다.

```typescript
function trueOrNull(isTrue: boolean) {
  if (isTrue) {
    return 'true';
  }
  return null;
}

trueOrNull(/* ... */); // 'true' | null

function stringOrNumber(a: string, b: number) {
  return a || b;
}

stringOrNumber(/* ... */); // string | number
```

&nbsp;  

### 3.1.8. 배열

* `T[]` 혹은 `Array<T>` 문법을 사용하여 작성한다.
* 보통 배열은 동형(homogeneous)으로 만든다. 그렇지 않으면 타입스크립트에 배열과 관련한 작업이 안전한지 증명해야 하므로 추가 작업을 해야한다.
* 배열을 선언하고 특정 타입의 값을 추가했을 때, 타입스크립트는 이미 이 배열이 특정 타입의 값을 갖는 배열이라 추론한다.
  * 배열이 초기화된 이후에 해당 배열에서 취급하지 않는 타입의 값을 추가하려하면 에러가 발생한다.

```typescript
let a = [1, 2, 3]; // number[]
var b = ['a', 'b']; // string[]
let c: string[] = ['a']; // string[]
let d = [1, 'a']; // (number | string)[]
const e = [2, 'b']; // (number | string)[]

let f = ['red'];
f.push('blue');
f.push(true); // 에러: true 타입 인수를 number 타입 매개변수에 할당할 수 없음

let g = []; // any[]
g.push(1); // number[]
g.push('red'); // (string | number)[]
```

&nbsp;  

* 2개 이상의 타입을 포함하는 배열을 대상으로 `map` 같은 배열 메소드를 사용할 때, 각 요소의 타입에 맞는 동작을 수행해야한다. (ex. `typeof` 연산자 사용)

```typescript
let d = [1, 'a'];
d.map(elem => {
  if (typeof elem === 'number') {
    return elem * 3;
  }
  return elem.toUpperCase();
})
```

&nbsp;  

* 객체와 마찬가지로 배열을 `const` 키워드로 만들어도 타입스크립트는 타입을 더 좁게 추론하지 않는다.

```typescript
const e = [2, 'b']; // (number | string)[]
```



* 빈 배열로 초기화하면 타입스크립트는 배열의 요소 타입을 알 수 없으므로 `any[]`일 것으로 추론한다.

```typescript
let g = []; // any[]
```

&nbsp;  

* 배열이 정의된 영역을 벗어나면 타입스크립트는 배열을 더 이상 확장할 수 없도록 최종 타입을 할당한다.

```typescript
function buildArray() {
  let a = []; // any[]
  a.push(1); // number[]
  a.push('x'); // (number | string)[]
  return a;
}

let myArray = buildArray(); // (number | string)[]
myArray.push(true); // 에러: 'true' 타입의 인수는 'string | number' 타입의 매개변수에 할당할 수 없음
```

&nbsp;  

### 3.1.9. 튜플

* 배열의 서브타입
* 길이가 고정되어있고, 각 인텍스의 타입이 알려진 배열의 일종이다.
* 다른 타입과 달리 튜플은 선언할 때 타입을 명시해야 한다.
  * 타입스크립트에서는 대괄호(`[]`)를 배열 타입으로 추론하기 때문이다.
* 튜플은 이형 배열을 안전하게 관리할 뿐 아니라, 배열 타입의 길이도 조절한다.

```typescript
let a: [number] = [1];

// [이름, 성씨, 생년]
let b: [string, string, number] = ['Jin', 'Kim', 1900];
b = ['Queen', 'Elizabeth', 'ii', 1929]; // 에러: 'string'은 'number' 타입에 할당할 수 없음
```

&nbsp;  

* 튜플은 선택형 요소도 지원한다. 객체 타입에서와 마찬가지로 `?`는 '선택형'을 뜻한다.

```typescript
// 방향에 따라 다른 값을 갖는 기차 요금 배열
let trainFares: [number, number?][] = [
  [3.75],
  [8.25, 7.7],
  [10.5]
];

// 아래 방법으로 작성할 수 있다.
let moreTrainFares: ([number] | [number, number])[] = [
  // ...
];
```

&nbsp;  

* 튜플이 최소 길이를 갖도록 지정할 때는 나머지 요소(`...`)를 사용할 수 있다.

```typescript
// 최소 한 개의 요소를 갖는 string 배열
let friends: [string, ...string[]] = ['Sara', 'Tali', 'Chloe', 'Claire'];

// 최소 두 개의 요소를 갖는 이형 배열
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c'];
```

&nbsp;  

### 3.1.10. 읽기 전용 배열과 튜플

* 일반 배열은 가변적(mutable)이다 (`push`, `splice`, 갱신 등의 작업이 가능).
* 상황에 따라 불변(immutable)인 배열이 필요할 수 있다.
* 타입스크립트의 `readonly` 배열 타입을 사용하여 불변 배열을 만들 수 있다. 이때 명시적으로 타입을 작성한다.
* 읽기 전용 배열을 갱신하려면 `push`, `splice`와 같은 mutator를 사용하지 않고, `concat`, `slice` 메소드 등을 사용하여 새로운 배열을 생성한다.
* 읽기 전용 배열 수정하기 위해서는 원래 배열을 복사해야 하므로, 주의하지 않으면 프로그램의 성능이 느려질 수 있다.

```typescript
// 읽기 전용 배열
let as: readonly number[] = [1, 2, 3]; // readonly number[]
let bs: readonly number = as.concat(4); // readonly number[]

let three = bs[2]; // number
as[4] = 5; // 에러: 'readonly number[]'의 인덱스 시그니처 타입은 읽기만 허용함
as.push(6); // 에러: 'push' 프로퍼티는 'readonly number[]' 타입에 존재하지 않음
```

&nbsp;  

* 다양한 형태로 읽기 전용 배열과 튜플 타입을 선언할 수 있다.

```typescript
type A = readonly string[]; // readonly string[]
type B = ReadonlyArray<string>; // readonly string[]
type C = Readonly<string[]>; // readonly string[]

type D = readonly [number, string]; // readonly [number, string]
type E = Readonly<[number, string]>; // readonly [number, string]
```

&nbsp;  

### 3.1.11. null, undefined, void, never

* `unknown`이 모든 타입의 상위 타입이라면, `never`는 모든 타입의 서브 타입이다.

| 타입      | 의미                                       |
| --------- | ------------------------------------------ |
| null      | 값이 없음                                  |
| undefined | 아직 값을 변수에 할당하지 않음             |
| void      | return 문을 포함하지 않는 함수의 반환 타입 |
| never     | 절대 반환하지 않는 함수 타입               |

```typescript
// number 또는 null을 반환하는 함수
function a(x: number) {
  if (x < 10) {
    return x;
  }
  return null;
}

// undefined를 반환하는 함수
function b() {
  return undefined;
}

// void를 반환하는 함수
function c() {
  let a = 2 + 2;
  let b = a * a;
}

// never를 반환하는 함수
function d() {
  throw new TypeError('I always error');
}

// never를 반환하는 함수
function e() {
  while (true) {
    // ...
  }
}
```

&nbsp;  

> **엄격한 null 확인**
>
> TSC의 `strictNullChecks` 옵션이 `false`로 설정되어 있다면 `null`은 `never`와 같이 모든 타입의 하위 타입이된다. 즉, 모든 타입이 `null`이 될 수 있으므로, 모든 값이 `null`인지 확인하지 않고는 타입이 무엇이라고 단정할 수 없다. 컴파일 타임에 가능한 많은 버그를 검출하는 것이 목표라면 타입 시스템에서 `null`을 확인 할 수 있어야 한다.

&nbsp;  