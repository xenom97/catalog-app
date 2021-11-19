import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IProduct, ProductCategory } from '~/entities/product.entity';

const BASE_URL = 'https://fakestoreapi.com/products';

export function getCategories(
  $axios: NuxtAxiosInstance
): Promise<ProductCategory[]> {
  return $axios.$get(`${BASE_URL}/categories`);
}

export function getProducts(
  $axios: NuxtAxiosInstance,
  limit: number = 12
): Promise<IProduct[]> {
  return $axios.$get(`${BASE_URL}/?limit=${limit}`);
}
