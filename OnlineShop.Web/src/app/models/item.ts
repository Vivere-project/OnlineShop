export class Item {
  id : number = 0;
  name: string = "";
  description: string = "";
  volume: number | null = null;
  price: number = 0;
  minimalBuyQuantity: number = 0;
  quantityInStock: number = 0;
  color: ItemColor | null = null;
  hasPhoto: boolean = false;

  constructor() {
    return {
      id: 0,
      name: "",
      description: "",
      volume: null,
      price: 0,
      minimalBuyQuantity: 0,
      quantityInStock: 0,
      color: null,
      hasPhoto: false
    }
  }
}

export class ItemColor {
  id: number = 0;
  name: string = "";
  colorHex: string = "";
}
