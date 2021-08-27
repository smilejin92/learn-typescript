// 함수 오버로드 시그니처
type Reserve = {
  (from: Date, to: Date, destination: string): void;
  (from: Date, destination: string): void;
};

// 여러 개의 오버로드 시그니처를 갖는 함수를 구현하는 관점에서는 **단일한 구현**으로 조합된 타입을 나타낼 수 있어야 한다.
// 함수 f를 호출 할 수 있는 방법이 2개 이상인 경우 타입스크립트에 f가 어떤 방식으로 호출되지는지 확인 시켜주어야한다.
const reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 왕복 여행 예약
  } else if (typeof toOrDestination === 'string') {
    // 편도 여행 예약
  }
};

// 함수 f에 여러 개의 오버로드 시그니처를 선언하면, 호출자 관점에서 f의 타입은 오버로드 시그니처들의 유니온이 된다.
reserve(new Date(), 'bali');

// 타입스크립트는 선언한 순서대로 오버로드를 해석한다
// 오버로드에 지정되지 않은 매개변수 타입을 전달할 수 있도록 함수를 구현하는 경우, 적절한 리턴 타입을 작성해주어야한다.
function createElement(tag: 'a'): HTMLAnchorElement;
function createElement(tag: 'canvas'): HTMLCanvasElement;
function createElement(tag: 'table'): HTMLTableElement;
function createElement(tag: string): HTMLElement {
  if (tag === 'a') {
    return new HTMLAnchorElement();
  } else if (tag === 'canvas') {
    return new HTMLCanvasElement();
  } else if (tag === 'table') {
    return new HTMLTableElement();
  } else {
    return new HTMLElement();
  }
}

export {};
