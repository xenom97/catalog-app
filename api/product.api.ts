import { NuxtAxiosInstance } from '@nuxtjs/axios';

const BASE_URL = 'https://fakestoreapi.com/products';

export function getCategories($axios: NuxtAxiosInstance): Promise<string[]> {
  return $axios.$get(`${BASE_URL}/categories`);
}
