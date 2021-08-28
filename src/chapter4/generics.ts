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

let filter: Filter2 = (array, f) => {
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
filter([1, 2, 3], (num) => num > 2);

// T는 string으로 한정됨
filter(['a', 'b'], (str) => str !== 'b');

let names = [{ firstName: 'Kim' }, { firstName: 'Lee' }, { firstName: 'Park' }];

// T는 { firstName: string }으로 한정됨
filter(names, ({ firstName }) => firstName.startsWith('b'));

// 제네릭 타입을 Filter 타입 별칭의 일부로 선언. Filter 타입을 사용할 때 T를 명시적으로 한정하게 해야함.
type Filter3<T> = {
  (array: T[], f: (item: T) => boolean): T[];
};
