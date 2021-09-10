// key-in 연산자를 사용하지 않았을 때
// type Friend = {
//   firstName: string;
//   lastName: string;
// };

// type FriendList = {
//   count: number;
//   friends: Friend[];
// };

// type APIResponse = {
//   user: {
//     userId: string;
//     friendList: FriendList;
//   };
// };

// key-in 연산자를 사용했을 때
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

type FriendList = APIResponse['user']['friendList'];
type Friend = FriendList['friends'][number];

export {};
