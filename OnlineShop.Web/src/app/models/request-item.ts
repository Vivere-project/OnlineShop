export class RequestItem {
  name: string = "";
  description: string = "";
  price: number = 0;
  volume: number | null  = null;
  minimalBuyQuantity: number = 0;
  quantityInStock: number = 0;
  color: ItemColorRequest | null = null;
}

export  class ItemColorRequest {
  name: string = "";
  colorHex: string = "";
}
