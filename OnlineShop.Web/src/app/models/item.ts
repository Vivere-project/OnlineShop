export class Item {
  id : number = 0;
  name: string = "";
  description: string = "";
  volume: number | null = null;
  price: number = 0;
  minimalBuyQuantity: number = 0;
  quantityInStock: number = 0;
  color: ItemColor | null = null;
}

export class ItemColor {
  id: number = 0;
  name: string = "";
  colorHex: string = "";
}
