# 타입스크립트 프로그래밍

**Why use?**

- 타입스크립트는 코드를 자동으로 검사하여 개발자가 놓칠 수 있는 실수를 지적해준다.
- 프로그램의 충돌을 줄이고 더 좋은 코드 문서화를 제공하며, 다양한 사용자, 개발자, 서버가 응용 프로그램을 이용할 수 있도록 확장성을 확보하는 방법 제공한다.
- 실용성 - 간결하고 정확하게 원하는 바를 표현 할 수 있다.

&nbsp;

**Code style**

- 명시적 타입을 남용하지 않는다. 그래야 코드가 깨끗하고, 간결하며, 잘못된 타입을 대충 넘기지 않고 검출되도록 하여 안정성을 개선할 수 있기 때문이다.
- 재사용할 수 있는 범용 코드를 만들려 노력한다. (다형성)

&nbsp;

## 1. 소개

- **타입 안전성(type-safety)** - 타입을 이용해 프로그램이 **유효하지 않은 작업을 수행하지 않도록 방지**한다 (ex. 숫자와 리스트 곱하기).
- 자바스크립트에서는 코드에 실수를 저지른 시점과 그 실수를 처음 인지하는 시점이 달라지기 쉽다. 즉, 프로그램을 실행해봐야 실수를 인지 할 수 있다.
- 타입스크립트를 사용하면 **코드 편집기에 코드를 입력하는 순간** (유효하지 않은 코드를 대상으로) 곧바로 에러 메시지를 발생시킨다.

&nbsp;

자바스크립트는 아래와 같은 코드에 대해 예외를 던지지 않고, 최선을 다해 결과를 도출한다.

```javascript
3 + []; // 문자열 "3"으로 평가

let obj = {};
obj.foo; // undefined로 평가

function a(b) {
  return b / 2;
}
a('z'); // NaN으로 평가
```

때문에 자바스크립트에서는 코드에 실수를 저지른 시점과 그 실수를 처음 인지하는 시점이 달라지기 쉽다. 즉, 프로그램을 실행해봐야 실수를 인지 할 수 있다.

타입스크립트를 사용하면 **코드 편집기에 코드를 입력하는 순간** 곧바로 에러 메시지를 발생시킨다. 위 예제를 타입스크립트를 사용하여 작성하면 아래와 같은 결과를 확인 할 수 있다.

```typescript
3 + []; // 에러: '3' 타입과 'never[]' 타입에 연산자 '+'를 적용할 수 없음

let obj = {};
obj.foo; // '{}' 타입에 'foo' 프로퍼티가 존재하지 않음

function a(b) {
  return b / 2;
}
a('z'); // number 타입의 매개변수에 'z'라는 인수 타입을 할당할 수 없음
```

모든 타입 관련 버그가 사라질 뿐 아니라, 코드를 작성하는 방식도 달라진다. 프로그램을 설계하며 극단적인 상황을 먼저 고려하게 되며 더 간단하고, 빠르고, 이해하기 쉬우며, 유지하기 쉬운 프로그램을 설계할 수 있다.

&nbsp;

## 2. 타입스크립트 Overview

### 2.1. 컴파일러

- 타입 검사기 - 코드의 타입 안전성을 검증하는 특별한 프로그램

&nbsp;

<strong>일반적인 컴파일러의 동작 순서 (Node, 브라우저 환경에서의)</strong>

1. 프로그램(코드)를 AST로 파싱
2. AST가 바이트코드로 컴파일
3. 런타임이 바이트코드를 평가

&nbsp;

**TSC의 동작 순서**

1. 타입스크립트 소스 -> 타입스크립트 AST
2. 타입 검사기(typechecker)가 AST를 확인
   1. 타입 확인 과정을 거쳐 프로그램이 개발자의 기대대로 실행 될 수 있도록 해주고, 명백한 실수가 들어가지 않게 방지
3. 타입스크립트 AST -> 자바스크립트 소스
   1. 타입스크립트 컴파일러는 코드를 바이트코드 대신 자바스크립트 코드로 변환한다.
   2. 이 과정에서 개발자가 사용한 타입을 확인하지 않는다. **개발자가 코드에 기입한 타입 정보는 최종적으로 만들어지는 프로그램에 아무런 영향을 주지 않으며, 단지 타입을 확인하는 데만 쓰인다.**
4. 일반적인 컴파일러의 동작 순서를 이어서 진행

&nbsp;

> **컴파일러와 런타임**
>
> 보통 자바스크립트 컴파일러와 런타임은 엔진이라는 하나의 프로그램으로 합쳐진다. V8(NodeJS, 크롬 등), 스파이더몽키(FireFox), JSCore(사파리), 샤크라(엣지) 등 여러 엔진의 종류가 있으며, 자바스크립트가 해석되는(interpreted) 언어의 모습을 갖게 만든다.

&nbsp;

### 2.2. 타입 시스템

- 타입 시스템 - 타입 검사기가 프로그램에 타입을 할당하는 데 사용하는 **규칙 집합**
  - 명시적 타입 시스템(타입 어노테이션 사용)
  - 타입 추론

&nbsp;

타입 어노테이션을 사용하여 명시적으로 타입을 정할 수 있다.

```typescript
let a: number = 1; // a는 number
let b: string = 'hello'; // b는 string
let c: boolean[] = [true, false]; // c는 boolean 배열
```

반대로 타입스크립트가 타입을 추론하도록 코드를 작성 할 수 있다.

```typescript
let a = 1; // a는 number
let b = 'hello'; // b는 string
let c = [true, false]; // c는 boolean 배열
```

타입스크립트가 타입을 추론하도록 두는 것이 코드를 줄일 수 있는 방법이므로, 보통 어노테이션은 생략한다.

&nbsp;

#### 2.2.1 타입스크립트 vs. 자바스크립트

| 타입 시스템 기능            | 자바스크립트   | 타입스크립트        |
| --------------------------- | -------------- | ------------------- |
| 타입 결정 방식              | 동적           | 정적                |
| 타입이 자동으로 변환되는가? | O              | X(대부분)           |
| 언제 타입을 확인하는가?     | 런타임         | 컴파일 타임         |
| 언제 에러를 검출하는가?     | 런타임(대부분) | 컴파일 타임(대부분) |

&nbsp;

**타입은 어떻게 결정되는가?**

- 자바스크립트는 프로그램을 실행하기 전에는 타입을 알 수 없다. (동적 타입 바인딩)
- 타입스크립트는 점진적으로 타입을 확인하는(**gradually typed**) 언어이다.
  - 컴파일 타임에 프로그램의 모든 타입을 알아야 하는 것은 아니다. (자바스크립트 코드를 타입스크립트로 마이그레이션할 때 유용하다.)
  - 단, 프로그램의 모든 타입을 알고 있을 때 최상의 결과를 보여줄 수 있다.

&nbsp;

**자동으로 타입이 변환되는가?**

- 자바스크립트는 약한 타입(weakly typed) 언어다. 즉, 유효하지 않은 연산(ex. 숫자와 리스트 더하기)을 수행하면 다양한 규칙을 적용해가며 최상의 결과를 도출한다.
  - 암묵적 형변환으로 인해 문제의 원인을 추적하기 어렵다.
- 타입스크립트는 올바르지 않아 보이는 작업을 발견하는 즉시 불평한다. 의도를 명시해야 이러한 지적을 무사히 통과할 수 있다.

&nbsp;

**언제 타입을 검사하는가?**

- 자바스크립트는 대부분의 상황에서 타입이 무엇인지 따지지 않는다.
- 타입스크립트는 정적으로 코드를 분석해 이런 에러를 검출하여 코드를 실행하기도 전에 알려준다.

&nbsp;

**에러는 언제 검출되는가?**

- 자바스크립트는 프로그램을 실행해야만 어떤 문제가 있음을 확인할 수 있다.
- 타입스크립트는 컴파일 타임에 문법 에러와 타입 관련 에러를 모두 검출한다.
  - 단, 스택오버플로, 네트워크 연결 끊김, 잘못된 사용자 입력 등 컴파일 타임에 검출 할 수 없는 런타임 예외도 많다.

&nbsp;

### 2.3. 코드 편집기 설정

- 모든 타입스크립트 프로젝트는 루트 디렉터리에 `tsconfig.json` 파일이 존재해야한다.
- `tsconfig.json` 파일은 타입스크립트의 프로젝트에서 어떤 파일을 컴파일하고, 어떤 자바스크립트 버전으로 방출하는지 등을 정의한다.

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["es2015"], // TSC가 코드 실행 환경에서 이용할 수 있다고 가정하는 API
    "module": "commonjs", // TSC가 코드를 컴파일할 대상 모듈 시스템
    "outDir": "dist", // 생성된 자바스크립트 코드를 출력할 디렉터리
    "sourceMap": true,
    "strict": true, // 유효하지 않은 코드를 검사할 때 엄격하게 검사 (코드가 타입을 갖추도록 강제)
    "target": "es2015" // TSC가 코드를 컴파일할 자바스크립트 버전
  },
  "include": ["src"] // TSC가 타입스크립트 파일을 찾을 디렉터리
}
```

&nbsp;

## 3. 타입의 모든 것

- **타입** - 값과 이 값으로 할 수 있는 일의 집합이다. 즉, 값을 가지고 어떤 일을 할 수 있고 어떤 일을 할 수 없는지 알 수 있다.
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

### 3.1. 타입의 종류

아래는 타입의 계층 구조이다. (ex. any 타입은 void, null, number 등 하위 타입에 할당될 수 있다.)

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

#### 3.1.1. any

* `any`로 무엇이든 할 수 있지만, 꼭 필요한 상황이 아니라면 사용하지 않는 것이 좋다.
  * `any`는 모든 값의 집합이므로 `any` 타입의 값으로 덧셈, 곱셈, `.pizza()` 호출 등 무슨 작업이든 할 수 있다.
  * `any`를 사용하게되면 값이 자바스크립트처럼 동작하며, 타입 검사기가 무용지물이된다.
* 타입스크립트에서는 프로그래머와 타입스크립트 둘 다 타입을 알 수 없는 상황에서는 기본 타입인 `any`로 가정한다.
* **`any`를 사용하려면 명시적으로 선언해야 한다.**
  * 타입스크립트가 어떤 값을 `any`로 추론해야 하는 상황(ex. 함수의 매개변수 타입 정의 누락, 타입을 사용하지 않는 자바스크립트 모듈을 import)에는 컴파일 타임 예외가 발생한다. (`noImplicitAny` 설정이 적용되어 있는 경우)

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

#### 3.1.2. unknown

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

#### 3.1.3. boolean

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

#### 3.1.4. number

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

#### 3.1.5. string

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

#### 3.1.6. 객체

* 타입스크립트의 객체 타입은 **객체의 형태(shape)를 정의한다.** 즉, 객체 리터럴로 만든 간단한 객체 `{}`와 `new` 키워드를 사용해 만든 복잡한 객체를 구분할 수 없다. 이는 자바스크립트가 구조 기반 타입을 갖도록 설계되었기 때문이다.
* **구조 기반 타입화** - 객체의 이름과 상관없이 **객체가 어떤 프로퍼티를 갖고 있는지를 따진다.** Duck typing이라고도 불린다.
* 타입스크립트에서 객체를 정의하는 방법은 크게 4가지로 요약할 수 있다.
  * **객체 리터럴** (ex. `{ a: string }`) - 객체가 어떤 필드를 포함할 수 있는지 알고 있거나, 객체의 모든 값이 같은 타입을 가질 때 사용한다.
  * 빈 객체 리터럴 (`{}`) - 사용하지 않는 것이 좋다.
  * **`object` 타입** - 어떤 필드를 가지고 있는지는 관심 없고, 그저 객체가 필요할 때 사용
  * `Object` 타입 - 사용하지 않는 것이 좋다.
* **인덱스 시그니처** - `{ [key: T]: U }` 같은 문법을 인덱스 시그니처라 부른다.
  * 타입스크립트에 어떤 객체가 여러 키를 가질 수 있음을 알려준다.
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

* 주의할 것은 `const` 키워드로 선언한 객체 리터럴은 `const` 키워드로 선언한 원시 값(`1`, `'foo'`, `true` 등)처럼 타입 리터럴이 적용되지 않는다. 객체의 값은 바뀔 수 있으며, 타입스크립트도 객체를 만든 후 필드 값이 바뀔 수 있다는 것을 알기 때문이다.

```typescript
const j = { k: 'k' }; // { k: string }
```

&nbsp;  

* 객체 리터럴 문법은 "이런 형태의 물건이 있어"라고 말한다. 이 물건은 객체 리터럴 또는 클래스일 수 있다. 즉, **특정 객체의 형태를 충족한다면 객체 리터럴을 사용하든, 클래스 인스턴스를 사용하든 모두 할당 가능**하다.

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

#### 3.1.7. 타입 별칭, 유니온, 인터섹션

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

