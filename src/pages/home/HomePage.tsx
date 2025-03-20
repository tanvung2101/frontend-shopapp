import { useEffect, useState } from "react";
import Product from "../../components/Product";
import SideFilter from "../../components/SideFilter";
import SortProductList from "../../components/SortProductList";
import { ProductListConfig, Products } from "../../interface/product.interface";
import productApi from "../../apis/productApi";
import useQueryConfig from "../../hooks/useQueryConfig";
import Pagination from "../../components/Pagination";
import categoryApi from "../../apis/categoryApi";
import { Category } from "../../interface/category.interface";

export default function HomePage() {
  const queryConfig = useQueryConfig();
  console.log(queryConfig)
  const [products, setProducts] = useState<Products>()
  const [categories, setCategories] = useState<Category[]>([]);
  console.log(products)
    const getProduct = async () => {
        const result = await productApi.getProduct(
          queryConfig as ProductListConfig
        );
        setProducts(result)
  }
  const fetchCategories = async () => {
      const data = await categoryApi.getCategory();
    setCategories(data.data)
  };
    useEffect(() => {
      getProduct()
      fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryConfig.page, queryConfig.category, queryConfig.price_min, queryConfig.price_max, queryConfig.sort_price])
  return (
    <div className="bg-gray-200 py-6">
      <div className="layout">
        {(
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <SideFilter
              queryConfig={queryConfig}
              categories={categories}
              />
            </div>
            <div className="col-span-9">
              {products && <SortProductList
                queryConfig={queryConfig}
                pageSize={products.total_pages}
              />}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {products?.data.map((product) => (
                  <div key={product.id} className="col-span-1">
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {products && <Pagination
                queryConfig={queryConfig}
                pageSize={products.total_pages}
              />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
