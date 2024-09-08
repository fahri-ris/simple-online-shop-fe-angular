export interface Items {
  itemId: number;
  itemsName: string;
  itemsCode?: string;
  stock: number;
  price: number;
  isAvailable?: boolean;
  lastReStock?: number;
}
