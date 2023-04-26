export interface IOrder{
  _orderId: string;
  customerId: number;
  products: IOrderProducts;
  datetime:Date
}
export interface IOrderProducts{
  quantity: number;
  productId:string
}
