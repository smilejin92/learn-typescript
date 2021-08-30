# 4. 함수

* 타입스크립트에서 함수를 선언하고 실행하는 다양한 방법
* 시그니처 오버로딩
* 다형적 함수
* 다형적 타입 별칭

&nbsp;  

## 4.1. 함수 선언과 호출

* 보통 함수 **매개변수의 타입은 명시적으로 정의**한다. 타입스크립트는 항상 함수의 본문에서 사용된 타입들을 추론하지만, 특별한 상황(ex. 문맥적 타이핑)을 제외하면 **매개변수 타입은 추론하지 않기 때문**이다.
* 반환 타입은 자동으로 추론된다. (굳이 반환 타입을 명시할 필요가 없다.)

```typescript
function add(a: number, b: number) {
  return a + b;
}

add(1, 2); // number
```



* 타입스크립트로 함수 호출문을 작성하면, 전달된 인수의 타입이 매개변수의 타입과 호환되는지 확인한다.

```typescript
add(1, 2); // OK
add(1, '2'); // 에러: 'a' 인수 타입은 'number' 매개변수 타입에 할당할 수 없음
```

&nbsp;  

### 4.1.1. 선택적 매개변수와 기본 매개변수

* 함수에서도 `?`를 사용해 선택적 매개변수를 지정할 수 있다. 이때 필수 매개변수를 먼저 지정하고 선택적 매개변수를 뒤에 추가한다.
* 선택적 매개변수는 뒤에 와야 하지만, 기본 매개변수는 어디에나 추가할 수 있다.
* 타입스크립트는 기본 매개변수의 타입을 추론할 수 있기 때문에 선택적 매개변수를 굳이 사용 할 필요없다.

```typescript
function log(message: string, userId = 'Not signed in') {
  const time = new Date().toISOString();
  console.log(time, message, userId);
}
```

&nbsp;  

* 기본 매개변수에도 타입을 명시할 수 있다.

```typescript
type Context = {
  appId?: string;
  userId?: string;
}

function log(message: string, context: Context = {}) {
	// ...
}
```

&nbsp;  

### 4.1.2. 나머지 매개변수

* 가변 인자 함수를 구현할 때 사용한다.
* 기존 자바스크립트의 `arguments`를 사용하면 전달된 인수의 타입 추론이 불가능하며, 매개변수 개수(0개)와 전달된 인수의 개수가 맞지 않으므로 에러가 발생한다.
* 함수는 최대 한 개의 나머지 매개변수를 가질 수 있으며, 나머지 매개변수는 함수의 매개변수 목록 중 마지막에 위치해야 한다.

```typescript
// arguments 사용
function sum() {
  // 반환 타입이 any로 추론된다.
  return Array.from(arguments).reduce((total, n) => {
    // total과 n이 any로 추론된다.
    return total + n;
  }, 0)
}

sum(1, 2, 3); // 에러: 0개의 인수가 필요한데 3개의 인수가 제공됨
```

```typescript
// rest 파라미터 사용
function sum2(...numbers: number[]) {
  // 반환 타입이 number로 추론된다.
  return numbers.reduce((total, n) => {
    // total과 n이 number로 추론된다.
    return total + n;
  }, 0);
}

sum2(1, 2, 3); // 6으로 평가
```

&nbsp;  

### 4.1.3. this의 타입

* 함수에서 `this`를 사용할 경우 `call`, `apply` 메소드로 `this`가 가리킬 객체를 전달한다. 만약 `this`로 사용될 객체를 전달하지 않으면(일반 함수로 호출되면) `this`는 전역 객체를 가리킨다.

```javascript
function fancyDate() {
  return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`
}

// call 메소드로 호출
fancyDate.call(new Date());

// 일반 함수로 호출
fancyDate(); // TypeError: this.getDate는 함수가 아님 (런타임 에러)
```

&nbsp;  

* 타입스크립트로 작성한 함수에서 `this`를 사용할 경우 `this`가 가리킬 객체의 타입을 첫 번째 매개변수로 선언한다.

```typescript
function fancyDate(this: Date) {
  return `${this.getDate()} / ${this.getMonth()} / ${this.getFullYear()}`
}

// call 메소드로 호출
fancyDate.call(new Date());

// 일반 함수로 호출
fancyDate(); // 에러: void 타입의 'this'를 'Date' 타입의 'this'에 할당할 수 없음 (컴파일 에러)
```

&nbsp;  

> TSC의 `no-invalid-this` 플래그를 활성화하면 클래스 메소드를 제외한 다른 모든 곳에서 `this` 키워드 사용을 금한다. 자바스크립트에서의 `this`는 모든 함수에서 정의되며, 혼란을 발생시킨다.
>
> `noImplicitThis` 플래그를 활성화하면 함수에서 항상 `this` 타입을 명시적으로 설정하도록 강제할 수 있다. 단, `noImplicitThis`는 클래스와 객체의 함수에는 `this`를 지정하라고 강제하지 않는다.

&nbsp;  

### 4.1.4. 호출 시그니처

* 함수의 전체 타입을 표현하는 방법
* `object` 타입이 모든 객체를 가리킬 수 있는 것처럼, `Function` 타입은 모든 함수의 타입을 뜻할 뿐이며 함수의 타입과 관련된 정보는 아무것도 알려주지 않는다.

```typescript
function add(x: number, y: number) {
  return a + b;
}

// add 함수의 타입(호출 시그니처)은 아래와 같다.
// a, b라는 매개변수 이름은 문서화 용도일 뿐 함수의 타입과 할당 동작에는 아무 영향도 주지 않는다.
(a: number, b: number) => number
```

&nbsp;  

* 함수 호출 시그니처는 타입 수준 코드, 즉 값이 아닌 타입 정보만 포함한다.
* 함수 호출 시그니처는 바디를 포함하지 않아 타입스크립트가 타입을 추론할 수 없으므로, **반환 타입을 반드시 명시해야한다.**

```typescript
// add(a: number, b: number) 함수
type Add = (a: number, b: number) => number;

// greet(name: string) 함수
type Greet = (name: string) => string;

// log(message: string, userId?: string) 함수
type Log = (message: string, userId?: string) => void;

// sum(...numbers: number[]) 함수
type Sum = (...numbers: number[]) => number;
```

&nbsp;  

* 특정 호출 시그니처를 만족하는 함수를 구현하기 위해선 함수 표현식을 사용할 수 있다.
* 호출 시그니처를 사용하여 함수를 정의하면 매개변수의 타입을 생략할 수 있다. 타입이 생략된 매개변수는 타입스크립트가 **문맥적 타입화(contextual typing)**를 통해 타입을 추론할 수 있다.

```typescript
type Add = (a: number, b: number) => number;

const add: ADD = (x, y) => {
  return x + y;
};

const sum = add(1, 2); // number
```



> **타입 수준 vs. 값 수준**
>
> 타입 수준 코드는 타입과 타입 연산자를 포함하는 코드를 의미한다. 반면 값 수준 코드는 그 밖의 모든 것을 가리킨다. 어떤 코드가 유효한 자바스크립트 코드라면 값 수준이고, 유효한 자바스크립트 코드는 아니지만 유효한 타입스크립트 코드라면 타입 수준이라고 말한다.
>
> 단, 열거형, 클래스, 네임스페이스는 실제로 타입과 값 모두 생성하며 네임스페이스는 값 수준에서 존재하기 때문에 타입 수준 혹은 값 수준으로 나눌 수 없다.

&nbsp;  

### 4.1.5. 문맥적 타입화

* 타입스크립트의 타입 추론 기능

```typescript
function times(f: (index: number) => void, n: number) {
  for (let i = 0; i < n; i++) {
    f(i);
  }
}

// times를 호출할 때 함수 선언을 인라인으로 제공하면 인수로 전달하는 함수의 타입을 명시할 필요가 없다.
// 만약 f를 인라인으로 선언하지 않으면 타입스크립트는 타입을 추론할 수 없다.
function f(n) { // 에러: 매개변수 'n'의 타입은 암묵적으로 'any' 타입이 됨
  console.log(n);
}
times(f, 4);

// times의 시그니처에서 f의 인수 index를 number로 선언했으므로
// 타입스크립트는 문맥상 n이 number임을 추론할 수 있다.
times((n) => console.log(n), 4);
```

&nbsp;  

### 4.1.6. 오버로드된 함수 타입

* 호출 시그니처가 여러 개인 함수
* 단축 호출 시그니처가 아닌 전체 호출 시그니처를 작성하여 함수 오버로딩을 표현할 수 있다.
* 자바스크립트는 동적 언어이므로 어떤 함수를 호출하는 방법이 여러 가지이다. 또한 인수 입력 타입에 따라 반환 타입이 달라질 때도 있다.
* **타입스크립트는 자바스크립트 함수의 동적 특징을 오버로드된 함수 선언으로 제공하고, 입력 타입에 따라 달라지는 함수의 출력 타입은 정적 타입 시스템으로 각각 제공한다.**

```typescript
// 단축 호출 시그니처
type Log = (message: string, userId?: string) => void;

// 전체 호출 시그니처
type Reserve = {
  (from: Date, to: Date, destination: string): void;
  (from: Date, destination: string): void;
};
```

&nbsp;  

* 여러 개의 오버로드 시그니처를 갖는 함수를 구현하는 관점에서는 **단일한 구현**으로 조합된 타입을 나타낼 수 있어야 한다. **조합된 시그니처는 자동으로 추론되지 않으므로 f를 구현할 때 직접 선언해야한다.**
* 함수 f를 호출 할 수 있는 방법이 2개 이상인 경우 타입스크립트에게 f가 어떤 방식으로 호출되지는지 확인 시켜주어야한다 (정제)
* 오버로드를 사용할 때는 함수를 쉽게 구현할 수 있도록 가능한 **구현의 시그니처를 특정**하는 것이 좋다. (ex. `from` 매개변수의 타입을 `any`가 아닌 `Date`으로)

```typescript
type Reserve = {
  (from: Date, to: Date, destination: string): void;
  (from: Date, destination: string): void;
};

const reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 왕복 여행 예약
  } else if (typeof toOrDestination === 'string') {
    // 편도 여행 예약
  }
};
```

&nbsp;  

* 함수 f에 여러 개의 오버로드 시그니처를 선언하면, 호출자 관점에서 f의 타입은 오버로드 시그니처들의 유니온이 된다.

<img src="https://user-images.githubusercontent.com/32444914/131142287-9999d9dd-19fe-45eb-b0ee-27a9295d17e5.png" alt="Screen Shot 2021-08-27 at 9.33.31 PM" style="zoom:50%;" />

<img src="https://user-images.githubusercontent.com/32444914/131142310-ac9f9fa1-88fd-4bab-82aa-b31b8d20d81f.png" alt="Screen Shot 2021-08-27 at 9.33.38 PM" style="zoom:50%;" />

&nbsp;  

* 타입스크립트는 선언한 순서대로 오버로드를 해석한다
* 오버로드에 지정되지 않은 매개변수 타입을 전달할 수 있도록 함수를 구현하는 경우, 적절한 리턴 타입을 작성해주어야한다.

```typescript
// 함수 선언을 오버로딩
function createElement(tag: 'a'): HTMLAnchorElement;
function createElement(tag: 'canvas'): HTMLCanvasElement;
function createElement(tag: 'table'): HTMLTableElement;
function createElement(tag: string): HTMLElement {
  if (tag === 'a') {
    return new HTMLAnchorElement();
  } else if (tag === 'canvas') {
    return new HTMLCanvasElement();
  } else if (tag === 'table') {
    return new HTMLTableElement();
  } else {
    return new HTMLElement();
  }
}
```

&nbsp;  

## 4.2. 다형성 (feat. 제네릭)

* 기대하는 타입을 정확하게 알고 있고, 실제 이 타입이 전달되었는지 확인할 때는 구체 타입이 유용하다.
  * 구체 타입(concrete type) - `boolean`, `string`, `Date[]` 등
* 어떤 타입을 사용할지 미리 알 수 없는 상황이라면 함수를 특정 타입으로 제한하기 어렵다.
* 범용 함수를 작성하기 위해 함수 오버로딩을 사용할 수 있지만, 사용할 타입이 많아질 수록 코드량이 늘어난다.

```typescript
// 함수를 범용적으로 사용하기 위해 오버로딩하였으나, 경우가 늘어남에 따라 작성해야할 코드도 많아진다.
type Filter = {
  (array: number[], f: (item: number) => boolean): number[];
  (array: string[], f: (item: string) => boolean): string[];
	// ...
}
```

&nbsp;  

* **제네릭 타입 매개변수** - 여러 장소에 타입 수준의 제한을 적용할 때 사용하는 플레이스 홀더 타입.
* 플레이스 홀더 타입은 "자리를 맡아둔다는" 의미로 사용되며, 타입 검사기가 문맥을 보고 전달된 타입 매개변수를 플레이스 홀더 타입에 대체하여 사용한다. 즉, **타입을 매개변수화 한다.**
* 꺾쇠 기호를 추가하는 위치에 따라 제네릭의 범위가 결정되며, 타입스크립트는 지정된 영역에 속하는 모든 제네릭 타입 매개변수 인스턴스가 **한 개의 구체 타입으로 한정되도록 보장한다.**
* 필요하면 꺾쇠괄호 안에 제네릭 타입 매개변수 여러 개를 콤마로 구분해 선언할 수 있다.
* 제네릭은 함수의 기능을(구체 타입을 사용할 때보다) 더 일반화하여 설명할 수 있는 강력한 도구이다.

```typescript
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
}

let filter: Filter = (array, f) => {
  // ...
}

// T는 number로 한정됨
filter([1, 2, 3], num => num > 2);

// T는 string으로 한정됨
filter(['a', 'b'], str => str !== 'b');

let names = [
  { firstName: 'Kim' },
  { firstName: 'Lee' },
  { firstName: 'Park' },
];

// T는 { firstName: string }으로 한정됨
filter(names, ({ firstName }) => firstName.startsWith('b'));
```

&nbsp;  

### 4.2.1. 언제 제네릭 타입이 한정되는가?

* 제네릭 타입의 선언 위치에 따라 타입의 범위뿐 아니라 타입스크립트가 제네릭 타입을 언제 구체 타입으로 한정하는지도 결정된다.
  * `<T>`를 호출 시그니처의 일부로 선언하면, 함수를 실제 호출할 때 구체 타입을 T로 한정한다.
  * `<T>`를 타입 별칭으로 한정하려면 타입 별칭을 사용할 때 타입을 명시적으로 한정하게 해야한다.

```typescript
// 제네릭 타입을 Filter 함수 호출 시그니처의 일부로 선언. Filter를 호출할 때 T를 구체 타입으로 한정한다.
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
}

let filter: Filter = <number>(array, f) => {
  // ...
}

// 제네릭 타입을 Filter 타입 별칭의 일부로 선언. Filter 타입을 사용할 때 T를 명시적으로 한정하게 해야함.
type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[];
}

let filter: Filter<number> = (array, f) => {
  // ...
}
```

&nbsp;  

### 4.2.2. 제네릭 타입 추론

* 제네릭의 타입을 명시할 때는 모든 필요한 제네릭 타입을 명시하거나 반대로 아무것도 명시해서는 안 된다.

```typescript
function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}

// T는 number, U는 boolean으로 추론된다.
map([1, 2, 3], (num) => num < 10);

// T는 number, U는 number로 타입을 명시한다.
map<string, number>(['a', 'b'], (str) => str.length);

// 제네릭 타입을 명시할 때는 필요한 모든 제네릭 타입을 명시해야한다.
// 에러: 두 개의 타입 인수가 필요한 데 한 개만 전달됨.
map<string>(['a', 'b'], (str) => str.length);
```

&nbsp;  

### 4.2.3. 제네릭 타입 별칭

* 타입 별칭에서는 타입 별칭명과 할당 기호(`=`) 사이에만 제네릭 타입을 선언할 수 있다.
* 제네릭 타입 별칭을 사용할 때는 제네릭 타입이 자동으로 추론되지 않으므로 타입 매개변수를 명시적으로 한정해야 한다.

```typescript
type MyEvent<T> = {
	target: T;
  type: string;
}

let myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#myButton'),
  type: 'click'
}
```

&nbsp;  

### 4.2.4. 한정된 다형성

* 타입의 상한 한계(upper bound) - "U 타입은 적어도 T 타입을 포함한다."
* T 타입에 대한 최소한의 정보를 제공하여 T 타입으로 할 수 있는 동작을 안전하게 처리할 수 있음.
* `extends` 키워드를 사용하여 T의 상한 한계를 정할 수 있다. (ex. `T`의 상한 한계를 `TreeNode`로 정하여 `node.value`를 안전하게 읽을 수 있다.)
* `T extends U`라고 표현함으로써 `U`의 서브타입을 사용하더라도, 해당 서브타입의 정보를 보존할 수 있다. (ex. `LeafNode`를 전달하여 `mapNode`를 호출하면, 반환 타입이 `LeafNode`로 보존된다.)

```typescript
// 일반 TreeNode
type TreeNode = {
  value: string;
};

// 자식 노드가 없는 LeafNode
type LeafNode = TreeNode & {
  isLeaf: boolean;
};

// 자식을 갖는 TreeNode
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};

// TreeNode를 인수로 받아 value에 매핑 함수를 적용하여 새로운 TreeNode를 반환하는 함수
// T의 상한 경계는 TreeNode이다. 즉, T는 TreeNode이거나, TreeNode의 서브타입이어야한다.
function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value),
  };
}

const a: TreeNode = { value: 'a' };
const b: LeafNode = { value: 'b', isLeaf: true };
const c: InnerNode = { value: 'c', children: [b] };

const a1 = mapNode(a, (str) => str.toUpperCase()); // TreeNode
const b1 = mapNode(b, (str) => str.toUpperCase()); // LeafNode
const c1 = mapNode(c, (str) => str.toUpperCase()); // InnerNode
```

&nbsp;  

**여러 제한을 적용한 한정된 다형성**

* 타입의 상한 한계(타입 제한)을 타입 인터섹션(`&`)을 통해 여러 개 추가 할 수 있다.

```typescript
type HasSides = {
  numberOfSides: number;
};

type SidesHaveLength = {
  sideLength: number;
};

// 여러 제한을 적용한 한정된 다형성
function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape) {
  console.log(s.numberOfSides * s.sideLength);
  return s;
}

type Square = HasSides & SidesHaveLength;
const square: Square = { numberOfSides: 4, sideLength: 3 };
logPerimeter(square);
```

&nbsp;  

### 4.2.5. 제네릭 타입 기본 값

* 제네릭 타입 매개변수에도 기본 타입을 지정할 수 있다.

```typescript
type MyEvent<T = HTMLElement> = {
  target: T;
  type: string;
};

let buttonEvent: MyEvent2<HTMLButtonElement> = {
  target: new HTMLButtonElement(),
  type: 'string',
};
```

&nbsp;  

* 제네릭 타입 기본 값과 한정된 다형성을 함께 사용할 수 있다.

```typescript
// T는 HTMLElement의 서브셋이며, 기본 타입은 HTMLElement이다.
type MyEvent<T extends HTMLElement = HTMLElement> = {
  target: T;
  type: string;
};
```

&nbsp;  

* 함수의 선택적 매개변수처럼 기본 타입을 갖는 제네릭은 반드시 기본 타입을 갖지 않는 제네릭의 뒤에 위치해야 한다.

```typescript
type MyEvent<
  Type extends string,
  Target extends HTMLElement = HTMLElement
> = {
	target: Target;
  type: Type;
}
```

&nbsp;  

## 4.3. 타입 주도 개발

* **타입 주도 개발** - 타입 시그니처를 먼저 정하고 값을 나중에 채우는 프로그래밍 방식
* 표현식이 수용할 수 있는 값의 타입을 제한하는 것이 정적 타입 시스템의 핵심이다.
* 타입스크립트 프로그램을 구현할 때는 먼저 함수의 타입 시그니처를 정의한 다음(type driven), 구현을 추가한다. 구현을 시작하기 전에 프로그램을 타입 수준에서 구상해보면 모든 것이 이치에 맞는지를 상위 수준에서 확일할 수있다.

&nbsp;  
