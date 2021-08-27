function times(f: (index: number) => void, n: number) {
  for (let i = 0; i < n; i++) {
    f(i);
  }
}

// times를 호출할 때 함수 선언을 인라인으로 제공하면 인수로 전달하는 함수의 타입을 명시할 필요가 없다.
// 만약 f를 인라인으로 선언하지 않으면 타입스크립트는 타입을 추론할 수 없다.
function log(n) {
  // 에러: 매개변수 'n'의 타입은 암묵적으로 'any' 타입이 됨
  console.log(n);
}
times(log, 4);

// times의 시그니처에서 f의 인수 index를 number로 선언했으므로
// 타입스크립트는 문맥상 n이 number임을 추론할 수 있다.
times((n) => console.log(n), 4);

export {};
