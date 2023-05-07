export interface EarphoneProduct {
}
export class EarphoneProduct {
  constructor(
    public _id: string="",
    public name: string="",
    public brand: string="",
    public image: string="",
    public discount_amount: number = 0,
    public initial_price: number = 0,
    public general_info: Array<info> = [],
    public details: Array<detail> = []
  ){
  }
}
interface info{
  type: string,
  connect: string,
  features: string,
}
interface detail{
  type_detail: string,
  connection_detail: string,
  features_detail: string,
  origin_detail: string,
  warranty_detail: string
}
