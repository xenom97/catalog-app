export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ProductCategory =
  | 'electronics'
  | 'jewelery'
  | "men's clothing"
  | "women's clothing";
