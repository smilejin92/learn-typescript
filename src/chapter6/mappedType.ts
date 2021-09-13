type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

// 에러: Type '{ Mon: "Tue"; }' is missing the following properties from type '{ Mon: Day; Tue: Day; Wed: Day; Thu: Day; Fri: Day; }': Tue, Wed, Thu, Fri
const nextDay: { [K in Weekday]: Day } = {
  Mon: 'Tue',
};

type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

// 모든 필드를 선택형으로 만듦
type OptionalAccount = {
  [K in keyof Account]?: Account[K];
};

// type OptionalAccount = {
//   id?: number | undefined;
//   isEmployee?: boolean | undefined;
//   notes?: string[] | undefined;
// }

// 모든 필드를 nullable로 만듦
type NullableAccount = {
  [K in keyof Account]: Account[K] | null;
};

// type NullableAccount = {
//   id: number | null;
//   isEmployee: boolean | null;
//   notes: string[] | null;
// }

// 모든 필드를 읽기 전용으로 만듦
type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K];
};

// type ReadonlyAccount = {
//   readonly id: number;
//   readonly isEmployee: boolean;
//   readonly notes: string[];
// }

// 모든 필드를 다시 쓸 수 있도록 만듦
// 매핑된 타입에서만 사용할 수 있는 특별 타입 연산자인 마이너스(-)로 ?와 readonly 표시를 제거할 수 있다.
type Account2 = {
  -readonly [K in keyof ReadonlyAccount]: Account[K];
};

// type Account2 = {
//   id: number;
//   isEmployee: boolean;
//   notes: string[];
// }

// 모든 필드를 다시 필수형으로 만듦
type Account3 = {
  [K in keyof OptionalAccount]-?: Account[K];
};

// type Account3 = {
//   id: number;
//   isEmployee: boolean;
//   notes: string[];
// }

export {};
