export interface Customers {
  customerId: number;
  customerCode?: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  pic: string;
  lastOrderDate?: Date;
  isActive: boolean;
}
