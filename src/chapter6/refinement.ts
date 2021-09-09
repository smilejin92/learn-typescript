type Width = {
  value: number;
  unit: 'cm' | 'px' | '%';
};

function parseWidth(width: number | string | null | undefined): Width | null {
  // width가 null이거나 undefined면 반환
  if (width == null) {
    return null;
  }

  // width가 숫자면 픽셀로 취급
  if (typeof width === 'number') {
    return {
      unit: 'px',
      value: width,
    };
  }

  // width로부터 단위 파싱
  const unit = parseUnit(width); // 'cm' | 'px' | '%'
  if (unit) {
    return {
      unit,
      value: parseFloat(width),
    };
  }

  // 이 외의 경우엔 null 반환
  return null;
}

export {};
