import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ProductCategory } from '~/entities/product.entity';

const BASE_URL = 'https://api.unsplash.com/search';

export function getSamplePhotos({
  $axios,
  accessKey,
  category,
  limit = 5,
}: {
  $axios: NuxtAxiosInstance;
  accessKey: string;
  category: ProductCategory;
  limit?: number;
}): Promise<any> {
  return $axios.$get(BASE_URL, {
    params: {
      page: 1,
      per_page: limit,
      query: `product ${category}`,
    },
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });
}
