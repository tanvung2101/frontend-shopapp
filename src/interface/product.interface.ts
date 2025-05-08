export interface Products {
  message: "Lấy danh sách sản phẩm thành công";
  data: Product[];
  current_page: number;
  total_pages: number;
  total: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldprice: number;
  image: string;
  description: string;
  specification: string;
  stock: number;
  rating: number;
  total_ratings: number;
  total_sold: number;
  brand_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  // attributes: [
  //   {
  //     id: number;
  //     product_id: number;
  //     attribute_id: number;
  //     value: number;
  //     created_at: string;
  //     updated_at: string;
  //     Attribute: {
  //       id: number;
  //       name: string;
  //       created_at: string;
  //       updated_at: string;
  //     };
  //   }
  // ];
}

export interface ProductImage {
  id: number;
  image_url: string;
}

export interface ProductDetails extends Product {
  product_images: ProductImage[];
  category: Category;
  brand: Brand;
  attributes: { id: number; name: string; value: string }[];
}

interface Category {
  id: number;
  name: string;
}
interface Brand {
  id: number;
  name: string;
}


export interface ProductListConfig {
  page?: number | string;
  limit?: number | string;
  sort_by?: "created_at" | "view" | "sold" | "price";
  sort_price?: "asc" | "desc";
  exclude?: string;
  rating_filter?: number | string;
  price_max?: number | string;
  price_min?: number | string;
  name?: string;
  category?: string;
}
