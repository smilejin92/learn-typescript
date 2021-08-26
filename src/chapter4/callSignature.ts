// 함수 호출 시그니처는 타입 수준 코드, 즉 값이 아닌 타입 정보만 포함한다.
// 함수 호출 시그니처는 바디를 포함하지 않아 타입스크립트가 타입을 추론할 수 없으므로, **반환 타입을 반드시 명시해야한다.**

// add(a: number, b: number) 함수
// a, b라는 매개변수 이름은 문서화 용도일 뿐 함수의 타입과 할당 동작에는 아무 영향도 주지 않는다.
type Add = (a: number, b: number) => number;

const add: Add = (x, y) => {
  return x + y;
};

const sum = add(1, 2);

// greet(name: string) 함수
type Greet = (name: string) => string;

// log(message: string, userId?: string) 함수
type Log = (message: string, userId?: string) => void;

// sum(...numbers: number[]) 함수
type Sum = (...numbers: number[]) => number;
