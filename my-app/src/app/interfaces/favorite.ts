export interface IFavirites{
  customerId:string;
  favorite:IFavirites_favorite[]
}
export interface IFavirites_favorite{
  productId: string;
  add_date:Date
}
export interface Iputfavorite{
  customerId:string;
  productId: string;
  isFavorite: boolean
}
