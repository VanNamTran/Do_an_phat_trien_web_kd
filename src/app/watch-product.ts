export interface WatchProduct {
}
export class WatchProduct {
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
  material: string,
  screen: number,
}
interface detail{
  material_detail: string,
  screen_detail: string,
  compatible_os_detail: string,
  battery_detail: string
}
