// any를 사용하게되면 값이 자바스크립트처럼 동작하며, 타입 검사기가 무용지물이된다.
// any를 사용하려면 명시적으로 선언해야 한다. (noImplicitAny가 설정되어 있을 때)
let a: any = 666; // any
let b: any = ['danger']; // any
let c = a + b; // any

export {};
