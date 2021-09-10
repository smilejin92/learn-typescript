type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

// BAD
// 에러: 함수에 마무리 반환문이 없으며 반환 타입은 'undefined'를 포함하지 않음
// function getNextDay(w: Weekday): Day {
//   switch (w) {
//     case 'Mon':
//       return 'Tue';
//   }
// }

// GOOD
function getNextDay(w: Weekday): Day {
  switch (w) {
    case 'Mon':
      return 'Tue';
    case 'Tue':
      return 'Wed';
    case 'Wed':
      return 'Thu';
    case 'Thu':
      return 'Fri';
    case 'Fri':
      return 'Sat';
  }
}

export {};
