//Mô tả thuộc tính trong reset_passwords
export class Otp{
  constructor(
    public _id: string,
    public otp: string,
    public createdDay: Date
  ){}
}
