type Options = {
  baseURL: string;
  cacheSize?: number;
  tier?: 'prod' | 'dev';
};

// 1. { baseURL: string, cacheSize?: number, tier?: 'prod' | 'dev' } 타입이 필요하다.
class API {
  constructor(private options: Options) {}
}

// 2. { baseURL: string, tierr: string } 타입을 전달했다.
new API({
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
});

// 3. 필요한 타입의 서브타입을 전달했지만, 타입스크립트는 이를 에러로 판단한다.
// 에러: '{ baseURL: string, tierr: string }' 타입은 파라미터 타입 Options에 할당할 수 없음
// 객체 리터럴은 알려진 프로퍼티만 지정할 수 있는데, 'tierr'라는 프로퍼티는 Options에 존재하지 않음

// 4. 유효하지 않은 옵션 객체를 Options 타입으로 타입 어서션했다. 이때 객체 리터럴은 더 이상 신선하지 않으므로 초과 프로퍼티 검사를 수행하지 않으며, 아무 에러도 발생하지 않는다.
new API({
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
} as Options);

// 5. 옵션 객체를 변수 badOptions에 할당했다. 타입스크립트는 이 객체를 더 이상 신선하지 않다고 여기기 때문에 초과 프로퍼티 검사를 수행하지 않으며, 아무 에러도 발생하지 않는다.
let badOptions = {
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
};

new API(badOptions);

// 6. options의 타입을 Options로 명시하면 할당된 객체는 신선한 객체로 취급한다.
// 따라서 타입스크립트는 초과 프로퍼티 검사를 수행하고 버그를 찾아낸다.
let options: Options = {
  baseURL: 'https://api.mysite.com',
  tierr: 'prod',
};
// 에러: '{ baseURL: string, tierr: string }' 타입은 파라미터 타입 Options에 할당할 수 없음
// 객체 리터럴은 알려진 프로퍼티만 지정할 수 있는데, 'tierr'라는 프로퍼티는 Options에 존재하지 않음
