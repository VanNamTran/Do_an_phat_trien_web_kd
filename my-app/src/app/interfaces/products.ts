export class Products{
  constructor(
    public _id:string="",
    public name:string="",
    public brand:string="",
    public image:string="",
    public discount_amount:string="",
    public initial_price:string="",
  ){}
}
export interface PropertyMap {
  [key: string]: string;
}
