// type UserTextEvent = {
//   value: string;
//   target: HTMLInputElement;
// };

// type UserMouseEvent = {
//   value: [number, number]; // 마우스 좌표
//   target: HTMLElement;
// };

// function handle(event: UserTextEvent | UserMouseEvent) {
//   if (typeof event.value === 'string') {
//     event.value; // string (value는 잘 정제되지만, target은 정제되지 않는다)
//     event.target; // HTMLInputElement | HTMLElement (!!!)
//     return;
//   }

//   event.value; // [number, number] (value는 잘 정제되지만, target은 정제되지 않는다)
//   event.target; // HTMLInputElement | HTMLElement (!!!)
// }

type UserTextEvent = {
  value: string;
  target: HTMLInputElement;
  type: 'TextEvent'; // 태그 추가
};

type UserMouseEvent = {
  value: [number, number];
  target: HTMLElement;
  type: 'MouseEvent'; // 태그 추가
};

function handle(event: UserTextEvent | UserMouseEvent) {
  if (event.type === 'TextEvent') {
    event.value; // string
    event.target; // HTMLInputElement
    return;
  }

  event.value; // [number, number]
  event.target; // HTMLElement
}

export {};
