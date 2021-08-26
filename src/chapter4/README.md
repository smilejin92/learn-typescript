# 4. 함수

* 타입스크립트에서 함수를 선언하고 실행하는 다양한 방법
* 시그니처 오버로딩
* 다형적 함수
* 다형적 타입 별칭

&nbsp;  

## 4.1. 함수 선언과 호출

* 보통 함수 매개변수의 타입은 명시적으로 정의한다. 타입스크립트는 항상 함수의 본문에서 사용된 타입들을 추론하지만, 특별한 상황(ex. 문맥적 타이핑)을 제외하면 매개변수 타입은 추론하지 않기 때문이다.
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

* 기본 매개변수에도 타입을 명시 할 수 있다.

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

* 일반 함수에서 `this`를 사용할 경우 `call`, `apply` 메소드로 `this`가 가리킬 객체를 전달한다. 만약 `this`로 사용될 객체를 전달하지 않으면(함수가 일반 함수로 호출되면) `this`는 전역 객체를 가리킨다.

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

* 타입스크립트로 작성한 일반 함수에서 `this`를 사용할 경우 `this`가 가리킬 객체의 타입을 첫 번째 매개변수로 선언한다.

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
function add(a: number, b: number) {
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

