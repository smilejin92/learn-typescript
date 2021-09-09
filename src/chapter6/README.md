# 6. 고급 타입

## 6.1. 타입 간의 관계

### 6.1.1. 서브타입과 슈퍼타입

* **서브타입** - 두 개의 타입 A와 B가 있고, B가 A의 서브타입이면 A가 필요한 곳에는 어디든 B를 안전하게 사용할 수 있다.
  * 배열은 객체의 서브타입이다.
  * 튜플은 배열의 서브타입이다.
* **슈퍼타입** - 두 개의 타입 A와 B가 있고, B가 A의 슈퍼타입이면 B가 필요한 곳에는 어디든 A를 안전하게 사용할 수 있다.
  * 배열은 튜플의 슈퍼타입이다.
  * 객체는 배열의 슈퍼타입이다.

&nbsp;  

### 6.1.2. 가변성

* **복합 타입** - 다른 타입을 포함하는 타입
  * `Array<A>`처럼 타입 매개변수를 갖는 타입
  * `{ a: number }` 같은 필드를 갖는 타입
  * `(a: A) => B` 같은 함수
* 복합 타입의 서브타입 규칙은 프로그래밍 언어마다 다르며, 같은 규칙을 가진 언어가 거의 없을 정도이다.

&nbsp;  

**형태와 배열 가변성**

```typescript
type LegacyUser = {
  id?: number | string;
  name: string;
}

const legacyUser: LegacyUser = {
  id: '123456',
  name: 'Jin'
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}

deleteUser(legacyUser);
// 에러: deleteUser의 매개변수 user의 타입은 { id: number | undefined, ... } 인데,
// 전달한 인수의 타입은 { id: number | string | undefined, ... } 이기 때문
```

* 요구되는 타입에 전달할 수 있는 타입은, 요구되는 타입과 같거나 서브타입이어야 한다 (요구되는 타입 >: 전달하는 타입).
* 타입과 관련해 타입스크립트 형태(객체와 클래스)는 그들의 프로퍼티 타입에 공변(covariant)한다고 말한다. 즉, 객체 B에 할당할 수 있는 객체 A가 있다면, '객체 A의 각 프로퍼티 <: B의 대응 프로퍼티'라는 조건을 만족해야한다.
* 공변은 가변성의 네 종류 중 하나이다.
  * 불변(invariance) - 정확히 T를 원함
  * 공변(covariance) - <: T를 원함
  * 반변(contravariance) - >: T를 원함
  * 양변(bivariance) - <: T 혹은 >:T를 원함
* 타입스크립트에서 모든 복합 타입의 멤버(객체, 클래스, 배열, 함수, 반환 타입)는 공변이며, 함수 매개변수 타입만 예외적으로 반변이다.

&nbsp;  

**함수 가변성**

* 아래의 조건을 만족할 때 함수 A는 함수 B의 서브타입이다.
  * B와 같거나 적은 수의 매개변수를 가진다.
  * A의 this 타입을 따로 지정하지 않으면, 'A의 this 타입 >: B의 this 타입'이다.
  * 'A의 각 매개변수 >: B의 대응 매개변수'이다.
  * 'A의 반환 타입 <: B의 반환타입'이다.

&nbsp;  

### 6.1.3. 할당성

* **할당성** - A라는 타입을 다른 B라는 타입이 필요한 곳에 사용할 수 있는지 결정하는 타입스크립트의 규칙
* 열거형이 아닌 타입에서는 다음 규칙으로 A를 B에 할당할 수 있는지 결정한다.
  * A <: B (A는 B의 서브타입이거나 같은 타입)
  * A는 any (자바스크립트 코드와 상호 운용할 때 유용)

&nbsp;  

### 6.1.4. 타입 넓히기

* `let`이나 `var` 키워드로 변수를 선언하면, 그 변수의 타입이 리터럴 값에서 리터럴 값이 속한 기본 타입으로 넓혀진다.

```typescript
let a = 'a'; // string
let b = 3; // number
var c = true; // boolean
const d = { x: 3 }; // { x: number }
```

&nbsp;  

* 타입을 명시하면 타입이 넓어지지 않도록 막을 수 있다.

```typescript
let a: 'a' = 'a'; // 'a'
let b: 3 = 3; // 3
var c: true = true;
const d: { x: 3 } = { x: 3 }; // { x: 3 }
```

&nbsp;  

* 값을 바꿀 수 없는 변수의 타입은 리터럴 타입으로 좁혀진다.

```typescript
const a = 'a'; // 'a'
const b = 3; // 3
const c = true; // true
```

&nbsp;  

* `null`이나 `undefined`로 초기화된 변수는 `any` 타입으로 넓혀진다.

```typescript
let a = null; // any
a = 3; // any
a = 'b'; // any
```

&nbsp;  

* `null`이나 `undefined`로 초기화된 변수가 **선언 범위를 벗어나면** 타입스크립트는 확실한 타입을 할당한다.

```typescript
function x() {
  let a = null; // any
  a = 3; // any
  a = 'b'; // any
  return a;
}

x(); // string
```

&nbsp;  

**const 타입**

* 타입스크립트는 **타입이 넓혀지지 않도록 해주는**  `const`라는 특별 타입을 제공한다.
* const 타입은 타입 어서션으로 활용된다.
* const를 사용하면 타입 넓히기가 중지되며, 멤버들까지 자동으로 readonly가 된다 (**중첩된 자료구조에도 재귀적으로 적용된다.**)

```typescript
let a = { x: 3 }; // { x: number }
let b: { x: 3 }; // { x: 3 }
let c = { x: 3 } as const; // { readonly x: 3 }
let d = [1, { x: 2 }] as const; // [1, { readonly x: 2 }]
```

&nbsp;  

**초과 프로퍼티 확인**

* 타입스크립트는 한 객체 타입을 다른 객체 타입에 할당할 수 있는지 확인할 때도 타입 넓히기를 사용한다.
* 이때 "객체 타입과 그 멤버들은 공변 관계이다."라는 규칙만을 적용하면 문제가 발생할 수 있다.

```typescript
type Options = {
	baseURL: string;
  cacheSize?: number;
  tier?: 'prod' | 'dev';
}

class API {
  constructor(private options: Options) {}
}

// 만약 초과 프로퍼티 확인을 하지 않는다면 아래 코드는 유효하다.
new API({
  baseURL: 'https://api.mysite.com',
  // tier가 아닌 tierr로 작성했지만, 객체 타입과 그 멤버들은 공변 관계이기 때문에
  // Options 타입의 서브타입으로서 인정될 수 있다.
  tierr: 'prod',
});
```

&nbsp;  

* 신선한(fresh) 객체 리터럴 타입 T를 다른 타입 U에 할당하려는 상황에서, T가 U에는 존재하지 않는 프로퍼티를 가지고 있다면 타입스크립트는 이를 에러로 처리한다.
  * **신선한 객체 리터럴 타입** - 타입스크립트가 객체 리터럴로부터 추론한 타입. 객체 리터럴이 타입 어서션을 사용하거나, 변수로 할당되면 신선한 객체 리터럴 타입은 일반 객체 타입으로 넓혀지면서 신선함은 사라진다.

```typescript
type Options = {
	baseURL: string;
  cacheSize?: number;
  tier?: 'prod' | 'dev';
}

// 1. { baseURL: string, cacheSize?: number, tier?: 'prod' | 'dev' } 타입이 필요하다.
class API {
  constructor(private options: Options) {}
}

// 2. { baseURL: string, tierr: string } 타입을 전달했다.
new API({
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
});

// 3. 필요한 타입의 서브타입을 전달했지만, 타입스크립트는 이를 에러로 판단한다.
// 에러: '{ baseURL: string, tierr: string }' 타입은 파라미터 타입 Options에 할당할 수 없음
// 객체 리터럴은 알려진 프로퍼티만 지정할 수 있는데, 'tierr'라는 프로퍼티는 Options에 존재하지 않음

// 4. 유효하지 않은 옵션 객체를 Options 타입으로 타입 어서션했다. 이때 객체 리터럴은 더 이상 신선하지 않으므로 초과 프로퍼티 검사를 수행하지 않으며, 아무 에러도 발생하지 않는다.
new API({
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
} as Options);

// 5. 옵션 객체를 변수 badOptions에 할당했다. 타입스크립트는 이 객체를 더 이상 신선하지 않다고 여기기 때문에 초과 프로퍼티 검사를 수행하지 않으며, 아무 에러도 발생하지 않는다.
let badOptions = {
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
};

new API(badOptions)

// 6. options의 타입을 Options로 명시하면 할당된 객체는 신선한 객체로 취급한다.
// 따라서 타입스크립트는 초과 프로퍼티 검사를 수행하고 버그를 찾아낸다.
let options: Options = {
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
}
// 에러: '{ baseURL: string, tierr: string }' 타입은 파라미터 타입 Options에 할당할 수 없음
// 객체 리터럴은 알려진 프로퍼티만 지정할 수 있는데, 'tierr'라는 프로퍼티는 Options에 존재하지 않음
```

&nbsp;  

### 6.1.5. 정제

* 타입 검사기는 `typeof`, `instanceof`, `in` 등의 타입 질의 뿐 아니라, `if`, `?`, `switch` 같은 제어 흐름 문장까지 고려하여 타입을 정제(refinement)한다.

```typescript
type Width = {
  value: number;
  unit: 'cm' | 'px' | '%';
};

function parseWidth(width: number | string | null | undefined): Width | null {
  // width가 null이거나 undefined면 반환
  if (width == null) {
    return null;
  }

  // width가 숫자면 픽셀로 취급
  if (typeof width === 'number') {
    return {
      unit: 'px',
      value: width,
    };
  }

  // width로부터 단위 파싱
  const unit = parseUnit(width); // 'cm' | 'px' | '%'
  if (unit) {
    return {
      unit,
      value: parseFloat(width),
    };
  }

  // 이 외의 경우엔 null 반환
  return null;
}
```

&nbsp;  

**차별된 유니온 타입**

* 유니온 타입을 정제할 때, 유니온의 멤버가 서로 중복될 수 있으므로 타입스크립트는 유니온의 어떤 타입에 해당하는지를 안정적으로 파악할 수 있어야 한다.

```typescript
type UserTextEvent = {
  value: string;
  target: HTMLInputElement;
};

type UserMouseEvent = {
  value: [number, number]; // 마우스 좌표
  target: HTMLElement;
};

function handle(event: UserTextEvent | UserMouseEvent) {
  if (typeof event.value === 'string') {
    event.value; // string (value는 잘 정제되지만, target은 정제되지 않는다)
    event.target; // HTMLInputElement | HTMLElement (!!!)
    return;
  }

  event.value; // [number, number] (value는 잘 정제되지만, target은 정제되지 않는다)
  event.target; // HTMLInputElement | HTMLElement (!!!)
}
```

&nbsp;  

* **리터럴 타입**을 이용해 유니온 타입이 만들어낼 수 있는 각 경우를 태그(tag)하는 방식으로 유니온 타입을 구별할 수 있다.
* 태그는 유니온 타입에서 고유하므로, 타입스크립트는 둘이 상호 배타적임을 알 수 있다.
* 유니온 타입의 다양한 경우를 처리하는 함수를 구현해야 한다면 태그된 유니온을 사용할 수 있다. (ex. 리덕스 리듀서)

```typescript
type UserTextEvent = {
  value: string;
  target: HTMLInputElement;
  type: 'TextEvent'; // 태그 추가
};

type UserMouseEvent = {
  value: [number, number];
  target: HTMLElement;
  type: 'MouseEvent'; // 태그 추가
};

function handle(event: UserTextEvent | UserMouseEvent) {
  if (event.type === 'TextEvent') {
    event.value; // string
    event.target; // HTMLInputElement
    return;
  }

  event.value; // [number, number]
  event.target; // HTMLElement
}

```

&nbsp;  

