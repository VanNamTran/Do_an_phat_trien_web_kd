export interface PhoneProduct {
}

export class PhoneProduct {
  constructor(
    public _id: string="",
    public name: string="",
    public brand: string="",
    public image: string="",
    public discount_amount: number = 0,
    public initial_price: number = 0,
    public general_info: Array<info> = [],
    public details_id: Array<details_id> = []
  ){
  }
}
interface info{
  cpu: string,
  screen: number,
  ram: string,
  rom: string
}
interface details_id{
  _id: string,
  dt_id: string,
  details: Array<detail>
}
interface detail{
  cpu_detail: string,
  screen_detail: string,
  backcamera_detail: string,
  frontcamera_detail: string,
  ram_detail: string,
  rom_detail: string,
  battery_detail: string,
  sim_detail: string,
  os_detail: string,
  origin_detail: string,
  release_detail:string,

}

