// 1. 클래스와 인터페이스의 차이는 무엇인가?
// -> 클래스는 구현체, 클래스 필드 초기화, 가시성 한정자를 작성할 수 있다. 또한 런타임 자바스크립트 코드를 생성하며, 값과 타입 모두 생성한다.
// -> 인터페이스는 단지 형태(타입)를 정의하는 수단이며, 런타임 자바스크립트 코드를 생성하지 않는다. 타입 레벨 프로퍼티만 작성할 수 있고, 가시성 한정자를 사용할 수 없다.

// 2. 클래스의 생성자를 private으로 선언하면 인스턴스를 만들 수 없고 클래스를 확장할 수도 없다.
// 생성자를 protected로 선언하면 어떻게 될까?
// -> private 생성자와 달리, 확장될 수 있다. 하지만 인스턴스를 생성할 수 없는 것은 동일하다.
// class A {
//   protected constructor() {}
// }

// class B extends A {} // ok
// new A(); // error
// new B(); // error

// 3. 아래 Shoe 팩토리를 사용하여 인스턴스를 생성하면 항상 Shoe 타입의 인스턴스가 반환된다.
// 코드를 수정하여 Shoe.create('boot')은 Boot 타입 인스턴스를, Shoe.create('balletFlat')은 BalletFlat 타입 인스턴스를 반환하도록 작성하라.
type Shoe = {
  purpose: string;
};

class BalletFlat implements Shoe {
  purpose = 'dancing';
}

class Boot implements Shoe {
  purpose = 'woodcutting';
}

class Sneaker implements Shoe {
  purpose = 'walking';
}

type ShoeCreator = {
  create(type: 'balletFlat'): BalletFlat;
  create(type: 'boot'): Boot;
  create(type: 'sneaker'): Sneaker;
};

let Shoe: ShoeCreator = {
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
    switch (type) {
      case 'balletFlat':
        return new BalletFlat();
      case 'boot':
        return new Boot();
      case 'sneaker':
        return new Sneaker();
    }
  },
};

Shoe.create('balletFlat'); // BalletFlat
Shoe.create('boot'); // Boot
Shoe.create('sneaker'); // Sneaker

// 4.a.
class RequestBuilder {
  protected data: Record<string, unknown> | null = null;
  protected method: 'get' | 'post' | null = null;
  protected url: string | null = null;

  setMethod(method: 'get' | 'post'): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
  }
  setData(data: Record<string, unknown> | null): this {
    this.data = data;
    return this;
  }
}

class RequestBuilderWithMethod extends RequestBuilder {
  setMethod(method: 'get' | 'post' | null): this {
    this.method = method;
    return this;
  }
  setURL(url: string): RequestBuilderWithMethodAndURL {
    return new RequestBuilderWithMethodAndURL()
      .setMethod(this.method)
      .setURL(url)
      .setData(this.data);
  }
}

class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
  setURL(url: string): this {
    this.url = url;
    return this;
  }
  send() {
    // ...
  }
}

new RequestBuilder().setMethod('get').setData({}).setURL('foo.com').send();

// 4.b.
interface BuildableRequest {
  data?: Record<string, unknown>;
  method: 'get' | 'post';
  url: string;
}

class RequestBuilder2 {
  data?: Record<string, unknown>;
  method?: 'get' | 'post';
  url?: string;

  setData(
    data: Record<string, unknown>
  ): this & Pick<BuildableRequest, 'data'> {
    return Object.assign(this, { data });
  }

  setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'> {
    return Object.assign(this, { method });
  }

  setURL(url: string): this & Pick<BuildableRequest, 'url'> {
    return Object.assign(this, { url });
  }

  build(this: BuildableRequest) {
    return this;
  }
}

new RequestBuilder2()
  .setData({})
  .setMethod('post') // Try removing me!
  .setURL('bar') // Try removing me!
  .build();
