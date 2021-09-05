# 6. 고급 타입

## 6.1. 타입 간의 관계

### 6.1.1. 서브타입과 슈퍼타입

* **서브타입** - 두 개의 타입 A와 B가 있고, B가 A의 서브타입이면 A가 필요한 곳에는 어디든 B를 안전하게 사용할 수 있다.
  * 배열은 객체의 서브타입이다.
  * 튜플은 배열의 서브타입이다.
* **슈퍼타입** - 두 개의 타입 A와 B가 있고, B가 A의 슈퍼타입이면 B가 필요한 곳에는 어디든 A를 안전하게 사용할 수 있다.
  * 배열은 튜플의 슈퍼타입이다.
  * 객체는 배열의 슈퍼타입이다.

&nbsp;  

### 6.1.2. 가변성

* **복합 타입** - 다른 타입을 포함하는 타입
  * `Array<A>`처럼 타입 매개변수를 갖는 타입
  * `{ a: number }` 같은 필드를 갖는 타입
  * `(a: A) => B` 같은 함수
* 복합 타입의 서브타입 규칙은 프로그래밍 언어마다 다르며, 같은 규칙을 가진 언어가 거의 없을 정도이다.

&nbsp;  

**형태와 배열 가변성**

```typescript
type LegacyUser = {
  id?: number | string;
  name: string;
}

const legacyUser: LegacyUser = {
  id: '123456',
  name: 'Jin'
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}

deleteUser(legacyUser);
// 에러: deleteUser의 매개변수 user의 타입은 { id: number | undefined, ... } 인데,
// 전달한 인수의 타입은 { id: number | string | undefined, ... } 이기 때문
```

* 요구되는 타입에 전달할 수 있는 타입은, 요구되는 타입과 같거나 서브타입이어야 한다 (요구되는 타입 >: 전달하는 타입).
* 타입과 관련해 타입스크립트 형태(객체와 클래스)는 그들의 프로퍼티 타입에 공변(covariant)한다고 말한다. 즉, 객체 B에 할당할 수 있는 객체 A가 있다면, '객체 A의 각 프로퍼티 <: B의 대응 프로퍼티'라는 조건을 만족해야한다.
* 공변은 가변성의 네 종류 중 하나이다.
  * 불변(invariance) - 정확히 T를 원함
  * 공변(covariance) - <: T를 원함
  * 반변(contravariance) - >: T를 원함
  * 양변(bivariance) - <: T 혹은 >:T를 원함
* 타입스크립트에서 모든 복합 타입의 멤버(객체, 클래스, 배열, 함수, 반환 타입)는 공변이며, 함수 매개변수 타입만 예외적으로 반변이다.

&nbsp;  

