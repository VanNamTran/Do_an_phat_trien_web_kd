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

export interface PhoneGeneralInfo {
  cpu: string;
  screen: string;
  ram: string;
  rom: string;
}

export interface PhoneDetails {
  screen_details: string;
  backcamera_details: string;
  frontcamera_details: string;
  ram_details: string;
  rom_details: string;
  cpu_details: string;
  GPU: string;
  battery_details: string;
  sim_details: string;
  os_details: string;
  origin_details: string;
  release_details: string;
}

export interface PhoneProduct {
  _id: string;
  name: string;
  brand: string;
  image: string;
  discount_amount: number;
  initial_price: number;
  general_info: PhoneGeneralInfo;
  details_id: string;
  details: {
    _id: string;
    details_id: string;
    details: PhoneDetails;
    description: string;
  }[];
}



