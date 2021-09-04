// 타입스크립트는 값과 타입의 네임스페이스를 따로 관리한다.
type Shoe = {
  purpose: string;
};

class BalletFalt implements Shoe {
  purpose = 'dancing';
}

class Boot implements Shoe {
  purpose = 'woodcutting';
}

class Sneaker implements Shoe {
  purpose = 'walking';
}

// 타입스크립트는 값과 타입의 네임스페이스를 따로 관리한다.
const Shoe = {
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
    switch (type) {
      case 'balletFlat':
        return new BalletFalt();
      case 'boot':
        return new Boot();
      case 'sneaker':
        return new Sneaker();
    }
  },
};

// 호출자는 팩토리가 특정 인터페이스를 만족하는 클래스를 제공할 것이라는 사실만 알 뿐, 어떤 구체 클래스가 이일을 하는지 알 수 없어야 한다.
const boot = Shoe.create('boot'); // Shoe

export {};
