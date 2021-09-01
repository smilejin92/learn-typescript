// 클래스는 자신과 똑같은 프로퍼티와 메서드를 정의하는 기존의 일반 객체, 혹은 클래스의 형태를 공유하는 다른 모든 타입과 호환된다.
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

// 단, `private`이나 `protected` 필드를 가지는 클래스 인스턴스는 일반 객체와는 호환되지 않는다.
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

export {};
