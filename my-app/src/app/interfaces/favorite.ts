export interface IFavorites{
  customerId:string;
  favorite:IFavorites_favorite[]
}
export interface IFavorites_favorite{
  productId: string;
  add_date:Date
}
export interface Iputfavorite{
  customerId:string;
  productId: string;
  isFavorite: boolean
}
