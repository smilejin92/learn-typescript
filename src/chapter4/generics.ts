// 함수를 범용적으로 사용하기 위해 오버로딩하였으나, 경우가 늘어남에 따라 작성해야할 코드도 많아진다.
type Filter1 = {
  (array: number[], f: (item: number) => boolean): number[];
  (array: string[], f: (item: string) => boolean): string[];
  // ...
};

// 제네릭 적용
// 제네릭 타입을 Filter 함수 호출 시그니처의 일부로 선언. Filter를 호출할 때 T를 구체 타입으로 한정한다.
type Filter2 = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

let filter2: Filter2 = (array, f) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};

// T는 number로 한정됨
filter2([1, 2, 3], (num) => num > 2);

// T는 string으로 한정됨
filter2(['a', 'b'], (str) => str !== 'b');

let names = [{ firstName: 'Kim' }, { firstName: 'Lee' }, { firstName: 'Park' }];

// T는 { firstName: string }으로 한정됨
filter2(names, ({ firstName }) => firstName.startsWith('b'));

// 제네릭 타입을 Filter 타입 별칭의 일부로 선언. Filter 타입을 사용할 때 T를 명시적으로 한정하게 해야함.
type Filter3<T> = {
  (array: T[], f: (item: T) => boolean): T[];
};

let filter3: Filter3<number> = (array, f) => {
  // ...
};

// 제네릭을 사용하여 아래와 같이 작성 할 수 있다.
// function map(array: unknown[], f: (item: unknown) => unknown): unknown[] {
//   let result = [];
//   for (let i = 0; i < array.length; i++) {
//     result[i] = f(array[i]);
//   }
//   return result;
// }

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

// 타입 별칭에서는 타입 별칭명과 할당 기호(`=`) 사이에만 제네릭 타입을 선언할 수 있다.
type MyEvent<T> = {
  target: T;
  type: string;
};

// 제네릭 타입 별칭을 사용할 때는 제네릭 타입이 자동으로 추론되지 않으므로 타입 매개변수를 명시적으로 한정해야 한다.
let myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#myButton'),
  type: 'click',
};

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

// 여러 제한을 적용한 한정된 다형성
type HasSides = {
  numberOfSides: number;
};

type SidesHaveLength = {
  sideLength: number;
};

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape) {
  console.log(s.numberOfSides * s.sideLength);
  return s;
}

type Square = HasSides & SidesHaveLength;
const square: Square = { numberOfSides: 4, sideLength: 3 };
logPerimeter(square);

export {};
