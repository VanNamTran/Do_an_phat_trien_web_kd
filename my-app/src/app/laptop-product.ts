export interface LaptopProduct {
}
export class LaptopProduct {
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
  cpu: string,
  screen: number,
  ram: string,
  rom: string,
  graphic: string,
  weight: number
}
interface detail{
  cpu_detail: string,
  screen_detail: string,
  ram_detail: string,
  rom_detail: string,
  graphic_detail: string,
  os_detail: string,
  weight_detai: string,
  size_detail: string,
  origin_detail: string,
  release_detail:string,
}
