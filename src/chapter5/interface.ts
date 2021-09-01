// 타입 별칭과 확장
// type Food = {
//   calories: number;
//   tasty: boolean;
// };

// type Shushi = Food & {
//   salty: boolean;
// };

// type Cake = Food & {
//   sweet: boolean;
// };

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

// 인터페이스를 상속할 때 상속받는 인터페이스(`A`)의 타입에 상위 인터페이스(`B`)를 할당 할 수 있는지 확인한다.
// interface A {
//   good(x: number): string;
//   bad(x: number): string;
// }

// interface B extends A {
//   good(x: number | string): string;
//   bad(x: string): string; // 에러: 인터페이스 'B'는 인터페이스 'A'를 올바르게 상속받지 않음
// }

// 인터섹션(`&`)으로 타입을 확장하면, 타입스크립트는 최대한 조합하는 방향으로 동작한다.
//  `B` 타입은 `bad`를 오버로드한 시그니처를 만들어낸다.
type A = {
  good(x: number): string;
  bad(x: number): string;
};

type B = A & {
  good(x: number | string): string;
  bad(x: string): string;
};

const b: B = {
  good(x) {
    return 'good';
  },
  bad(x) {
    return 'bad';
  },
};

b.bad(3);
b.bad('3');
