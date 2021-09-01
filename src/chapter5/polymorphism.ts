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

export {};
