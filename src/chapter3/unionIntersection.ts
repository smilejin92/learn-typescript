type Cat = { name: string; purrs: true };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;

// Cat
let a: CatOrDogOrBoth = {
  name: 'Terry',
  purrs: true,
};

// Dog
a = {
  name: 'Domino',
  barks: true,
  wags: true,
};

// 둘 다
a = {
  name: 'Donkers',
  barks: true,
  wags: true,
  purrs: true,
};

// 함수의 반환 값이 유니온 타입일 수 있다.
function trueOrNull(isTrue: boolean) {
  if (isTrue) {
    return 'true';
  }
  return null;
}

function stringOrNumber(a: string, b: number) {
  return a || b;
}

export {};
