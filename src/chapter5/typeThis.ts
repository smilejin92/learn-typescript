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

  // add(value: number): MutableSet {
  //   // ...
  //   return this;
  // }
}
