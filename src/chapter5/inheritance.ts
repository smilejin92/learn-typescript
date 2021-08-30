type Color = 'Black' | 'White';
type Column = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 생성자의 private 접근 한정자는 자동으로 매개변수를 this에 할당한다.
// Position 인스턴스 안의 코드는 이 매개변수를 읽고 쓸 수 있지만, Position 인스턴스 외부에서는 접근할 수 없다.
class Position {
  constructor(private column: Column, private row: Row) {}

  distanceFrom(position: Position) {
    return {
      row: Math.abs(position.row - this.row),
      column: Math.abs(
        position.column.charCodeAt(0) - this.column.charCodeAt(0)
      ),
    };
  }
}

// protected도 프로퍼티를 this에 할당하지만, Piece의 인스턴스와 Piece의 서브클래스 인스턴스 모두에 접근을 허용한다.
// readonly 프로퍼티는 초기에 값을 할당한 다음 더 이상 값을 덮어쓸 수 없게 한다.
class Piece {
  protected position: Position;

  constructor(private readonly color: Color, column: Column, row: Row) {
    this.position = new Position(column, row);
  }
}

abstract class Piece2 {
  protected position: Position;

  constructor(private readonly color: Color, column: Column, row: Row) {
    this.position = new Position(column, row);
  }

  moveTo(position: Position) {
    this.position = position;
  }

  abstract canMoveTo(position: Position): boolean;
}

// 에러: 추상 클래스의 인스턴스는 생성할 수 없음.
new Piece2('White', 'E', 1);

// 추상 클래스를 extends하여 추상 메소드를 구현
class King extends Piece {
  canMoveTo(position: Position) {
    let distance = this.position.distanceFrom(position);
    return distance.row < 2 && distance.column < 2;
  }
}

export {};
