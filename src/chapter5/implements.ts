// 인터페이스로 인스턴스 프로퍼티를 정의할 수 있지만, 가시성 한정자(`public`, `private`, `protected`)는 선언할 수 없으며, static 키워드도 사용할 수 없다.
// 인스턴스 프로퍼티를 `readonly`로 설정할 수 있다.
interface Animal {
  readonly name: string;
  eat(food: string): void;
  sleep(hours: number): void;
}

interface Feline {
  meow(): void;
}

// 클래스를 선언할 때 `implements` 키워드를 사용하여 특정 인터페이스를 만족시킴을 표현할 수 있다.
// 인터페이스를 `implements`할 때 인터페이스에 선언된 모든 프로퍼티와 메소드를 구현해야하며, 필요하다면 메서드나 프로퍼티를 추가로 구현할 수 있다.
class Cat implements Animal {
  constructor(public name: string) {}

  eat(food: string) {
    console.log(`eat ${food}`);
  }

  sleep(hours: number) {
    console.log(`sleep ${hours}`);
  }
}

// 한 클래스가 여러 인터페이스를 구현할 수 있다.
class Cat2 implements Animal, Feline {
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
