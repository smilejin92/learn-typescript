type State = {
  [key: string]: string;
};

class StringDatabase {
  state: State = {};

  get(key: string) {
    return key in this.state ? this.state[key] : null;
  }

  set(key: string, value: string): void {
    this.state[key] = value;
  }

  static from(state: State) {
    let db = new StringDatabase();

    for (const key in state) {
      db.set(key, state[key]);
    }

    return db;
  }
}

// 위 StringDatabae 클래스는 아래 2개 타입을 생성한다.
// StringDatabase 인스턴스 타입
interface StringDatabase {
  state: State;
  get(key: string): string | null;
  set(key: string, value: string): void;
}

// 생성자 타입 (typeof StringDatabase)
interface StringDatabaseConstructor {
  new (): StringDatabase;
  from(state: State): StringDatabase;
}

export {};
