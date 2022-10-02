export type Items = {
    name: string;
    amount: number;
    unit: string;
    price: {
        value: number;
        currency: string;
    };
  }