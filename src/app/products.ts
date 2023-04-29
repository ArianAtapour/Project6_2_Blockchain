export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'IPhone XS',
    price: 799,
    description: 'A large phone with one of the best screens'
  },
  {
    id: 2,
    name: 'IPhone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras'
  }
];
