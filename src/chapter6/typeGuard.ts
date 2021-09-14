// function isString(a: unknown) {
//   return typeof a === 'string';
// }

function isString(a: unknown): a is string {
  return typeof a === 'string';
}

function parseInput(input: string | number) {
  let formattedInput: string;
  if (isString(input)) {
    // 에러: 'number' 타입에 toUpperCase 프로퍼티가 존재하지 않음
    formattedInput = input.toUpperCase();
  }
}

type LegacyDialog = 'LegacyDialog';
type Dialog = 'Dialog';

function isLegacyDialog(dialog: LegacyDialog | Dialog): dialog is LegacyDialog {
  return dialog === 'LegacyDialog';
}
