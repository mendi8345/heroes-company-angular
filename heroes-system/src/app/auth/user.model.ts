export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    private password: string,
    public roles: string[],
    private tokenType?: string,
    public accessToken?: string
  ) {}

  // get token() {
  //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //     return null;
  //   }
  //   return this._token;
  // }
  public getAccessToken(){
    return this.accessToken
  }

}
