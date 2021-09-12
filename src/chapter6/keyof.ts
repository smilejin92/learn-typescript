// keyof 연산자를 사용하면 **객체의 모든 키를 문자열 리터럴 타입 유니온**으로 얻을 수 있다.
type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

type ReponseKeys = keyof APIResponse; // 'user'
type UserKeys = keyof APIResponse['user']; // "userId" | "friendList"
type FrinedListKeys = keyof APIResponse['user']['friendList']; // "count" | "friends"

function get<O extends object, K extends keyof O>(o: O, k: K) {
  return o[k];
}

export {};
