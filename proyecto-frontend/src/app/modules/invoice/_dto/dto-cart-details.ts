import { Product } from '../../product/_model/product';

export class DtoCartDetails {
  cart_id: number = 0;
  quantity: number = 0;
  image: string = '';
  product: Product = new Product();
}
