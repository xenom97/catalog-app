import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IProduct, ProductCategory } from '~/entities/product.entity';

const BASE_URL = 'https://fakestoreapi.com/products';

export function getCategories(
  $axios: NuxtAxiosInstance
): Promise<ProductCategory[]> {
  return $axios.$get(`${BASE_URL}/categories`);
}

export function getProducts($axios: NuxtAxiosInstance): Promise<IProduct[]> {
  return $axios.$get(BASE_URL);
}

export function getProductsInCategory({
  $axios,
  category,
}: {
  $axios: NuxtAxiosInstance;
  category: ProductCategory;
}): Promise<IProduct[]> {
  return $axios.$get(`${BASE_URL}/category/${category}`);
}
