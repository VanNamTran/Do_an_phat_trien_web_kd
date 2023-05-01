export interface IPhones{

    _id: string,
    name: string,
    brand: string,
    image: string,
    discount_amount: number,
    initial_price: number,
    general_info: Iphones_general_info
    details_id: string
}
export interface Iphones_general_info{
  cpu:string
  screen: string,
  ram: string,
  rom: string
}
