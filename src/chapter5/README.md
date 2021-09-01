# 5. 클래스와 인터페이스

* 클래스는 코드를 조직하고 이해할 수 있는 방법을 제공하며, 캡슐화의 주요 단위이기도 하다.
* 프로퍼티 초기자와 데코레이터 같은 타입스크립트 일부 기능은 자바스크립트에서도 지원하므로 실제 런타임 코드를 생성한다.
* 반면 가시성 접근자, 인터페이스, 제네릭 등은 타입스크립트만의 고유 기능이므로 컴파일 타임에만 존재하며 응용 프로그램을 자바스크립트로 컴파일할 때는 아무 코드도 생성하지 않는다.

&nbsp;  

## 5.1. 클래스와 상속

* 타입스크립트는 클래스의 프로퍼티와 메서드에 세 가지 접근 한정자를 제공한다.
  * `public` - 어디에서나 접근할 수 있다. 기본적으로 주어지는 접근 수준이다.
  * `protected` - 이 클래스와 서브클래스의 인스턴스에서만 접근할 수 있다.
  * `private` - 이 클래스의 인스턴스에서만 접근할 수있다. (같은 클래스 인스턴스끼리는 서로의 `private` 멤버에 접근 가능)
* 접근 한정자를 이용하여 내부 구현 정보를 너무 많이 공개하지 않고 잘 정의된 API만 노출하도록 클래스를 설계할 수 있다.

```typescript
type Color = 'Black' | 'White';
type Column = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 생성자의 private 접근 한정자는 자동으로 매개변수를 this에 할당한다.
// Position 인스턴스 안의 코드는 이 매개변수를 읽고 쓸 수 있지만, Position 인스턴스 외부에서는 접근할 수 없다.
class Position {
  constructor(private column: Column, private row: Row) {}
}

// protected도 프로퍼티를 this에 할당하지만, Piece의 인스턴스와 Piece의 서브클래스 인스턴스 모두에 접근을 허용한다.
// readonly 프로퍼티는 초기에 값을 할당한 다음 더 이상 값을 덮어쓸 수 없게 한다.
class Piece {
  protected position: Position;

  constructor(private readonly color: Color, column: Column, row: Row) {
    this.position = new Position(column, row);
  }
}
```

&nbsp;  

* 클래스는 구체 클래스와 추상 클래스로 분류된다.
* 추상 클래스를 구현할 때는 추상 메서드도 반드시 구현해야한다.
* `abstract` 키워드는 특정 클래스를 바로 인스턴스화할 수 없음을 의미한다.
* 추상 메서드를 주어진 시그니처와 호환되도록 구현해야 한다.

```typescript
abstract class Piece2 {
  protected position: Position;

  constructor(private readonly color: Color, column: Column, row: Row) {
    this.position = new Position(column, row);
  }

  moveTo(position: Position) {
    this.position = position;
  }

  abstract canMoveTo(position: Position): boolean;
}


// 1. 에러: 추상 클래스의 인스턴스는 생성할 수 없음.
new Piece2('White', 'E', 1);

// 2. 추상 클래스를 extends하여 추상 메소드를 구현
class King extends Piece2 {
  canMoveTo(position: Position) {
    let distance = this.position.distanceFrom(position);
    return distance.row < 2 && distance.column < 2;
  }
}
```

&nbsp;  

## 5.2. super 키워드

* 자식 클래스가 부모 클래스에 정의된 메서드를 오버라이드하면, 자식 인스턴스는 `super` 키워드를 사용하여 부모 버전의 메소드를 호출할 수 있다.
* 자식 클래스에 생성자 함수(contructor)가 있다면 `super()`를 호출해야 부모 클래스와 정상적으로 연결된다.
* supper로 부모 클래스의 메소드에만 접근할 수 있고, 프로퍼티에는 접근할 수 없다.

```typescript
class Parent {
  constructor(public name: string) {}

  sayHello() {
    return `Hi ${this.name}!`;
  }
}

class Child extends Parent {
  constructor(public name: string, public cityName: string) {
    super(name);
  }

  sayHello() {
    return `${super.sayHello()} Welcome to ${this.cityName}!`;
  }
}

const parent = new Parent('Jin');
const child = new Child('Jin', 'Seattle');

console.log(parent.sayHello()); // Hi Jin!
console.log(child.sayHello()); // Hi Jin! Welcome to Seattle!
```

&nbsp;  

## 5.3. this를 반환 타입으로 사용하기

* `this`를 반환 타입으로 사용하지 않는 서브클래스는 `this`를 반환하는 모든 메서드의 시그니처를 오버라이드 해야한다.

```typescript
class CustomSet {
  has(value: number): boolean {
    // ...
    return true;
  }
	
  // CustomSet 인스턴스 반환
  add(value: number): CustomSet {
    // ...
    return this;
  }
}

class MutableSet extends CustomSet {
  delete(value: number): boolean {
    // ...
    return true;
  }

  // 부모 클래스의 add 메소드를 오버라이드 할 때, 반환 타입을 변경해야한다.
  // MutableSet 인스턴스 반환
  add(value: number): MutableSet {
    // ...
    return this;
  }
}
```

&nbsp;  

* 클래스 메서드의 반환 타입을 `this`로 지정하면 위 예제에서의 문제를 해결할 수 있다.

```typescript
class CustomSet {
  has(value: number): boolean {
    // ...
    return true;
  }
	
  // add 메소드의 반환 타입을 this로 지정하여, 서브 클래스에서 오버라이드 할 필요가 없어졌다.
  add(value: number): this {
    // ...
    return this;
  }
}

class MutableSet extends CustomSet {
  delete(value: number): boolean {
    // ...
    return true;
  }
}

new CustomSet().add(3); // CustomSet 인스턴스
new MutableSet().add(3); // MutableSet 인스턴스
```

&nbsp;  

## 5.4. 인터페이스

* 타입 별칭처럼 인터페이스도 타입에 이름을 지어주는 수단이다.
* 타입 별칭과 인터페이스는 문법만 다를 뿐 거의 같은 기능을 수행한다.
* 인터페이스는 다른 인터페이스, 객체 타입, 클래스 모두를 상속 받을 수 있다.

```typescript
// 타입 별칭과 확장
type Food = {
  calories: number;
  tasty: boolean;
};

type Shushi = Food & {
  salty: boolean;
};

type Cake = Food & {
  sweet: boolean;
};

// 인터페이스와 상속
interface Food {
  caloris: number;
  tasty: boolean;
}

interface Sushi extends Food {
  salty: boolean;
}

interface Cake extends Food {
  sweet: boolean;
}
```

&nbsp;  

### 5.4.1. 인터페이스 vs. 타입 별칭

* 타입 별칭은 더 일반적이어서 타입 별칭의 오른편에는 타입 표현식을 포함한 모든 타입이 등장할 수 있다. 반면, **인터페이스의 오른편에는 반드시 형태가 나와야한다.**
  * 타입 표현식: 타입, `&`, `|` 등의 타입 연산자

```typescript
// 아래 타입 별칭 코드는 인터페이스로 작성할 수 없다.
type A = number;
type B = A | string;
```

&nbsp;  

* 인터페이스를 상속할 때 상속받는 인터페이스(`A`)의 타입에 상위 인터페이스(`B`)를 할당 할 수 있는지 확인한다. 이러한 **할당성 확인 기능**을 통해 객체 타입의 상속을 표현할 때 발생하는 에러를 쉽게 검출 할 수 있다.
* 반면, 인터섹션(`&`)으로 타입을 확장하면, 타입스크립트는 최대한 조합하는 방향으로 동작한다. 아래 예제에서 `B` 타입은 `bad`를 오버로드한 시그니처를 만들어낸다.

```typescript
interface A {
  good(x: number): string;
  bad(x: number): string;
}

interface B extends A {
  good(x: number | string): string;
  bad(x: string): string; // 에러: 인터페이스 'B'는 인터페이스 'A'를 올바르게 상속받지 않음
}
```

```typescript
type A = {
  good(x: number): string;
	bad(x: number): string;
}

type B = A & {
  good(x: number | string): string;
	bad(x: string): string;
}
```

&nbsp;  

* 이름과 범위가 같은 인터페이스가 여러 개 있다면, 이들이 자동으로 합쳐진다. 이를 **선언 합침**이라 부른다.
  * 프로퍼티 키가 같을 경우, 프로퍼티 값의 타입이 동일하지 않다면 에러가 발생한다.
  * 제네릭을 선언한 인터페이스들의 경우 제네릭의 선언 방법과 이름까지 똑같아야 합칠 수 있다.
* 중복된 타입 별칭은 사용할 수 없다.

```typescript
// 선언 합침
interface User {
  name: string;
}

interface User {
  age: number;
}

const a: User = {
  name: 'Jin',
  age: 999,
};

// 프로퍼티 키가 같을 경우, 프로퍼티 값의 타입이 동일하지 않다면 에러가 발생한다.
interface Person {
  age: string;
}

interface Person {
  age: number; // 에러: 다른 프로퍼티 선언도 같은 타입을 가져야 함
}

// 제네릭을 선언한 인터페이스의 경우 제네릭의 선언 방법과 이름까지 똑같아야 합칠 수 있다.
interface Human<Age extends number> { // 에러: 'Human'의 모든 선언은 같은 타입 매개변수를 가져야 함
  age: Age;
}

interface Human<Age extends string> {
  age: Age;
}
```

```typescript
// 중복된 타입 별칭은 사용할 수 없다.
// 에러: 중복된 식별자 'Person'
type Person = {
  name: string
};

// 에러: 중복된 식별자 'Person'
type Person = {
  age: number
};
```

&nbsp;  

### 5.4.2. 구현

* 클래스를 선언할 때 `implements` 키워드를 사용하여 특정 인터페이스를 만족시킴을 표현할 수 있다. `implements` 키워드는 타입 수준의 제한을 추가하여 구현에 문제가 있을 때 어디가 잘못되었는지 쉽게 파악할 수 있게 해준다.
* 인터페이스를 `implements`할 때 인터페이스에 선언된 모든 프로퍼티와 메소드를 구현해야하며, 필요하다면 메서드나 프로퍼티를 추가로 구현할 수 있다.
* 인터페이스로 인스턴스 프로퍼티를 정의할 수 있지만, 가시성 한정자(`public`, `private`, `protected`)는 선언할 수 없으며, static 키워드도 사용할 수 없다.
* 인스턴스 프로퍼티를 `readonly`로 설정할 수 있다.

```typescript
interface Animal {
  readonly name: string;
  eat(food: string): void;
  sleep(hours: number): void;
}

class Cat implements Animal {
  constructor(public name: string) {}

  eat(food: string) {
    console.log(`eat ${food}`);
  }

  sleep(hours: number) {
    console.log(`sleep ${hours}`);
  }
}

new Cat('neo');
```

&nbsp;  

* 한 클래스가 여러 인터페이스를 구현할 수 있다.

```typescript
interface Animal {
  readonly name: string;
  eat(food: string): void;
  sleep(hours: number): void;
}

interface Feline {
  meow(): void;
}

class Cat implements Animal, Feline {
  constructor(public name: string) {}

  eat(food: string) {
    console.log(`eat ${food}`);
  }

  sleep(hours: number) {
    console.log(`sleep ${hours}`);
  }

  meow() {
    console.log('meow');
  }
}
```

&nbsp;  

### 5.4.3. 인터페이스 구현 vs. 추상 클래스 상속

* 여러 클래스에서 공유하는 구현이라면 추상 클래스를 사용
* 가볍게 "이 클래스는 T다"라고 말하는 것이 목적이면 인터페이스를 사용

| 특징                         | 인터페이스                                   | 추상 클래스                  |
| ---------------------------- | -------------------------------------------- | ---------------------------- |
| 형태를 정의하는 수단         | 객체, 배열, 함수, 클래스, 클래스 인스턴스 등 | 오직 클래스만 정의           |
| 런타임 코드 생성             | X                                            | O (자바스크립트 클래스 코드) |
| 프로퍼티, 메소드 접근 한정자 | X                                            | O                            |
| 생성자와 기본 구현           | X                                            | O                            |
| `readonly` 키워드            | O                                            | O                            |

&nbsp;  

## 5.5. 클래스는 구조 기반 타입을 지원한다.

* 타입스크립트는 클래스를 비교할 때 다른 타입과 달리 이름이 아니라 구조를 기준으로 삼는다. 즉, **클래스는 자신과 똑같은 프로퍼티와 메서드를 정의하는 기존의 일반 객체, 혹은 클래스의 형태를 공유하는 다른 모든 타입과 호환된다.**

```typescript
class Zebra {
  trot() {
    // ...
  }
}

class Poodle {
  trot() {
    // ...
  }
}

function ambleAround(animal: Zebra) {
  animal.trot();
}

ambleAround(new Zebra()); // OK
ambleAround(new Poodle()); // OK

```

&nbsp;  

* 단, `private`이나 `protected` 필드를 가지는 클래스 인스턴스는 일반 객체와는 호환되지 않는다.

```typescript
class A {
  private x = 1;
}

class B extends A {}

function f(a: A) {}

f(new A());
f(new B());

// 에러: 인수 '{ x: number }' 타입은 매개변수 'A' 타입에 할당할 수 없음.
// 'A'의 'x' 프로퍼티는 private이지만, '{ x: number }'는 private이 아님.
f({ x: 1 });
```

&nbsp;  

## 5.6. 클래스는 값과 타입을 모두 선언한다.

* 타입스크립트의 거의 모든 것은 값 아니면 타입이다.
* 값과 타입은 타입스크립트에서 별도의 네임스페이스에 존재한다.

```typescript
// 값
let a = 1999;
function b() {}

// 타입
type a = number;
interface b {
  (): void;
}

// 문맥상 타입스크립트는 값 a로 추론함
if (a + 1 > 3) { /* ... */ }

// 문맥상 타입스크립트는 타입 a로 추론함
const x: a = 3;
```

&nbsp;  

* 클래스와 열거형은 타입 네임스페이스에 타입을, 값 네임스페이스에 값을 동시에 생성한다.
* 클래스와 열거형은 타입 수준에서 타입을 생성하기 때문에 'is-a' 관계를 쉽게 표현할 수 있다.

```typescript
class C {}

let c: C // 문맥상 C는 C 클래스의 인스턴스 타입을 가리킨다.
	= new C(); // 문맥상 C는 값 C를 가리킨다.
```

&nbsp;  

* 클래스 자체(생성자 타입)를 가리키기 위해서는 `typeof` 연산자를 사용하면 된다.

```typescript
type State = {
  [key: string]: string;
};

class StringDatabase {
  state: State = {};

  get(key: string) {
    return key in this.state ? this.state[key] : null;
  }

  set(key: string, value: string): void {
    this.state[key] = value;
  }

  static from(state: State) {
    let db = new StringDatabase();

    for (const key in state) {
      db.set(key, state[key]);
    }

    return db;
  }
}
```

```typescript
// 위 StringDatabae 클래스는 아래 2개 타입을 생성한다.
// StringDatabase 인스턴스 타입
interface StringDatabase {
  state: State;
  get(key: string): string | null;
  set(key: string, value: string): void;
}

// 생성자 타입 (typeof StringDatabase)
interface StringDatabaseConstructor {
  new(): StringDatabase;
  from(state: State): StringDatabase;
}
```

* `new()` 코드를 생성자 시그니처(contructor signature)라 부르며, 생성자 시그니처는 `new` 연산자로 해당 타입을 인스턴스화할 수 있음을 정의하는 타입스크립트의 방식이다.
  * 타입스크립트는 구조를 기반으로 타입을 구분하기 때문에, 이 방식이 "클래스란 `new`로 인스턴스화할 수 있는 어떤 것"이라고 기술할 수 있는 최선이다.

&nbsp;  

## 5.7. 다형성

* 클래스와 인터페이스도 기본값과 상한/하한 제네릭 타입 매개변수 기능을 지원한다.
* 제네릭 타입의 범위는 클래스나 인터페이스 전체가 되게 할 수도 있고, 특정 메소드로 한정할 수도 있다.

```typescript
// 1. class와 함께 제네릭을 선언했으므로 클래스 전체에서 타입을 사용할 수 있다.
// MyMap의 모든 인스턴스 메서드, 인스턴스 프로퍼티에서 K와 V를 사용할 수 있다.
class MyMap<K, V> {
  constructor(public initialKey: K, public initialValue: V) {
    // 2. constructor에서는 제네릭 타입을 선언할 수 없다.
  }

  get(key: K): V {
    // 3. 클래스로 한정된 제네릭 타입은 클래스 내부의 어디에서나 사용할 수 있다.
  }

  set(key: K, value: V): void {
    // ...
  }

  merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
    // 4. 인스턴스 메서드는 클래스 수준 제네릭을 사용할 수 있으며, 자신만의 제네릭도 추가로 선언할 수 있다.
  }

  static of<K, V>(k: K, v: V): MyMap<K, V> {
    // 5. 정적 메서드는 클래스 수준의 제네릭을 사용할 수 없다.
    // 따라서 of는 1에서 선언한 K와 V에 접근할 수 없고, 자신만의 K와 V를 직접 선언했다.
  }
}
```

&nbsp;  

