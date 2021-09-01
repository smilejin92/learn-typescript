class Parent {
  constructor(public name: string) {}

  sayHello() {
    return `Hi ${this.name}!`;
  }
}

class Child extends Parent {
  constructor(public name: string, public cityName: string) {
    super(name);
  }

  sayHello() {
    return `${super.sayHello()} Welcome to ${this.cityName}!`;
  }
}

const parent = new Parent('Jin');
const child = new Child('Jin', 'Seattle');

console.log(parent.sayHello()); // Hi Jin!
console.log(child.sayHello()); // Hi Jin! Welcome to Seattle!

export {};
