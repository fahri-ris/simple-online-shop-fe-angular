export interface Orders {
  orderId: number;
  orderCode: string;
  customerId: number;
  customerName: string;
  itemsId: number;
  itemsName: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
}
