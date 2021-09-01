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
  age: number;
}

// 제네릭을 선언한 인터페이스의 경우 제네릭의 선언 방법과 이름까지 똑같아야 합칠 수 있다.
interface Human<Age extends number> {
  age: Age;
}

interface Human<Age extends string> {
  age: Age;
}

export {};
