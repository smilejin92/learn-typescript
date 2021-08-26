// number 또는 null을 반환하는 함수
function a(x: number) {
  if (x < 10) {
    return x;
  }
  return null;
}

// undefined를 반환하는 함수
function b() {
  return undefined;
}

// void를 반환하는 함수
function c() {
  let a = 2 + 2;
  let b = a * a;
}

// never를 반환하는 함수
function d() {
  throw new TypeError('I always error');
}

// never를 반환하는 함수
function e() {
  while (true) {
    // ...
  }
}

export {};
