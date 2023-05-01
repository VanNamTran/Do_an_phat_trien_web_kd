export class User{
  constructor(
    public _id: string,
    public phone: string,
    public email: string,
    public name: string,
    public address: string,
    public password: string,
    public salt: string,
  ){}
}
