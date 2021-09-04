class RequestBuilder<T> {
  private url: string | null = null;
  private method: 'get' | 'post' | null = null;
  private data: T | null = null;

  // 빌더의 메소드는 인스턴스(this)를 반환한다.
  setURL(url: string): this {
    this.url = url;
    return this;
  }

  setMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }

  setData(data: T): this {
    this.data = data;
    return this;
  }

  // url, method, data를 설정하였는지 검사가 필요
  send() {
    // ...
  }
}

new RequestBuilder()
  .setURL('/users')
  .setMethod('post')
  .setData({ firstName: 'Jin' })
  .send();

export {};
