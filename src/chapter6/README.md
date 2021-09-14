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

## 6.2. 종합성

* 철저 검사라고도 불리는 **종합성**은 필요한 **모든 상황을 제대로 처리했는지** 타입 검사기가 검사하는 기능이다. 종합성은 실제로 일어날 버그를 방지하는 데 도움이 되는 기능이다.

```typescript
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

// BAD
// 에러: 함수에 마무리 반환문이 없으며 반환 타입은 'undefined'를 포함하지 않음
function getNextDay(w: Weekday): Day {
  switch (w) {
    case 'Mon':
      return 'Tue';
  }
}

// GOOD
function getNextDay(w: Weekday): Day {
  switch (w) {
    case 'Mon':
      return 'Tue';
    case 'Tue':
      return 'Wed';
    case 'Wed':
      return 'Thu';
    case 'Thu':
      return 'Fri';
    case 'Fri':
      return 'Sat';
  }
}
```

&nbsp;  

## 6.3. 고급 객체 타입

### 6.3.1. 객체 타입의 타입 연산자

**키인(key-in) 연산자**

* 객체에서 값을 찾는 것처럼 형태에서 타입을 찾을 수 있다.
* 모든 형태(객체, 클래스 생성자, 클래스 인스턴스)와 배열에 키인할 수 있다.
* 배열 타입에 키인을 적용하기 위해서는 인덱스를 가리키는 number, 혹은 숫자 리터럴을 사용할 수 있다.
* 키인 연산자를 사용하기 위해서는 대괄호 표기법을 사용한다.

```typescript
// key-in 연산자를 사용하지 않았을 때
type Friend = {
  firstName: string;
  lastName: string;
}

type FriendList = {
  count: number;
  friends: Friend[];
}

type APIResponse = {
  user: {
    userId: string;
    friendList: FriendList;
  }
}
```

```typescript
// key-in 연산자를 사용했을 때
type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    }
  }
}

type FriendList = APIResponse['user']['friendList'];
type Friend = FriendList['friends'][number];
```

&nbsp;  

**keyof 연산자**

* keyof 연산자를 사용하면 **객체의 모든 키를 문자열 리터럴 타입 유니온**으로 얻을 수 있다.

```typescript
type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

type ReponseKeys = keyof APIResponse; // 'user'
type UserKeys = keyof APIResponse['user']; // "userId" | "friendList"
type FrinedListKeys = keyof APIResponse['user']['friendList']; // "count" | "friends"

```

&nbsp;  

> **keyOfStringsOnly** 플래그
>
> 자바스크립트에서 객체와 배열 모두 문자열과 심벌 키를 가질 수 있다. 배열에는 숫자 키를 쓰는 것이 보통인데, 런타임에 숫자 키는 문자열로 강제 변환된다.
>
> 이런 이유로 타입스크립트의 keyof는 기본적으로 number | string | symbol 타입의 값을 반환한다. 타입스크립트에게 특정 키가 string이고 number나 symbol이 아니라는 사실을 증명해야하는 상황이 귀찮다면 keyofStringsOnly 플래그를 사용할 수 있다.

&nbsp;  

### 6.3.2. Record 타입

* 타입스크립트의 내장 타입 중 하나
* 무언가를 매핑하는 용도로 객체를 사용할 때, 그 객체의 타입을 Record로 쓸 수 있다.
* 일반 인덱스 시그니처에서는 객체 값의 타입은 제한할 수 있지만, 키는 반드시 일반 string, number, symbol이어야 한다. 하지만 Record에서는 객체의 키 타입도 string과 number의 서브타입으로 제한할 수 있다.

```typescript
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

// Record<keyType, valueType>
const nextDay: Record<Weekday, Day> = {
  Mon: 'Tue',
  Tue: 'Wed',
  Wed: 'Thu',
  Thu: 'Fri',
  Fri: 'Sat',
};
```

&nbsp;  

### 6.3.3. 매핑된 타입

* 매핑된 타입은 객체의 키와 값 타입을 매핑하는 수단을 제공한다.
* 인데스 시그니처와 마찬가지로 한 객체당 **최대 한개**의 매핑된 타입을 가질 수 있다.

```typescript
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

const nextDay: { [K in Weekday]: Day } = {
  Mon: 'Tue',
};
// 에러: Type '{ Mon: "Tue"; }' is missing the following properties from type '{ Mon: Day; Tue: Day; Wed: Day; Thu: Day; Fri: Day; }': Tue, Wed, Thu, Fri
```

&nbsp;  

* 매핑된 타입은 객체의 키와 값에 타입을 제공한다.
* 키인 타입과 조합하면 **키 이름별로 매핑할 수 있는 값 타입을 제한할 수 있다.**

```typescript
type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

// 모든 필드를 선택형으로 만듦
type OptionalAccount = {
  [K in keyof Account]?: Account[K];
};

// type OptionalAccount = {
//   id?: number | undefined;
//   isEmployee?: boolean | undefined;
//   notes?: string[] | undefined;
// }

// 모든 필드를 nullable로 만듦
type NullableAccount = {
  [K in keyof Account]: Account[K] | null;
};

// type NullableAccount = {
//   id: number | null;
//   isEmployee: boolean | null;
//   notes: string[] | null;
// }

// 모든 필드를 읽기 전용으로 만듦
type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K];
};

// type ReadonlyAccount = {
//   readonly id: number;
//   readonly isEmployee: boolean;
//   readonly notes: string[];
// }

// 모든 필드를 다시 쓸 수 있도록 만듦
// 매핑된 타입에서만 사용할 수 있는 특별 타입 연산자인 마이너스(-)로 ?와 readonly 표시를 제거할 수 있다.
type Account2 = {
  -readonly [K in keyof ReadonlyAccount]: Account[K];
};

// type Account2 = {
//   id: number;
//   isEmployee: boolean;
//   notes: string[];
// }

// 모든 필드를 다시 필수형으로 만듦
type Account3 = {
  [K in keyof OptionalAccount]-?: Account[K];
};

// type Account3 = {
//   id: number;
//   isEmployee: boolean;
//   notes: string[];
// }
```

&nbsp;  

**내장 매핑된 타입**

* `Record<Keys, Values>` - Keys 타입의 키와 Values 타입의 값을 갖는 객체
* `Partial<Object>` - Object의 모든 필드를 선택형으로 표시
* `Required<Object>` - Object의 모든 필드를 필수형으로 표시
* `Readonly<Object>` - Object의 모든 필드를 읽기 전용으로 표시
* `Pick<Object, Keys>` - 주어진 Keys에 대응하는 Object의 서브타입을 반환

&nbsp;  

## 6.4. 고급 함수 타입들

### 6.4.1. 튜플의 타입 추론 개선

* 타입스크립트는 튜플의 길이, 특정 인덱스에 어떤 타입이 들어있는지 무시하고 주어진 상황에서 제공할 수 있는 가장 일반적인 타입으로 튜플의 타입을 추론한다.

```typescript
const a = [1, true]; // (number | boolean)[]
```

&nbsp;  

* 고정된 길이의 튜플로 취급하고 싶을 경우 타입 어서션, `as const` 어서션을 이용하여 튜플의 타입을 가능한 좁게 추론하는 동시에 읽기 전용으로 만들 수 있다.

```typescript
const a = [1, true] as [1, true]; // [1, true]
const b = [1, true] as const; // readonly [1, true]
```

&nbsp;  

* 타입 어서션, as const 어서션을 사용하지 않고 튜플 타입으로 만들기 위해서는 함수의 나머지 매개변수를 사용할 수 있다.
* 튜플 타입이 많이 등장하는 코드라면 이 기법을 활용해 타입 어서션 사용을 줄일 수 있다.

```typescript
// T는 나머지 매개변수를 나타내므로 타입스크립트는 이를 튜플 타입으로 추론한다.
function tuple<T extends unknown[]>(...ts: T) {
  return ts;
}

const a = tuple(1, true); // [number, boolean]
```

&nbsp;  

