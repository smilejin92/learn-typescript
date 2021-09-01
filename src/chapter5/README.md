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

new CustomSet(/* ... */).add(3); // CustomSet 인스턴스
new MutableSet(/* ... */).add(3); // MutableSet 인스턴스
```

&nbsp;  

## 5.4. 인터페이스

