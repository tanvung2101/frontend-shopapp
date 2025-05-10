import Product from "../../components/Product";
import SideFilter from "../../components/SideFilter";
import SortProductList from "../../components/SortProductList";
import { ProductListConfig } from "../../interface/product.interface";
import productApi from "../../apis/productApi";
import useQueryConfig from "../../hooks/useQueryConfig";
import Pagination from "../../components/Pagination";
import categoryApi from "../../apis/categoryApi";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const queryConfig = useQueryConfig();
  const { data: productsData, isLoading, } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    placeholderData: (previousData) => previousData,
    staleTime: 3 * 60 * 1000
  })
  const { data: categories, } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryApi.getCategory();
    },
  })

  return (
    <div className="bg-gray-200 py-6">
      <div className="layout">
        {(
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <SideFilter
                queryConfig={queryConfig}
                categories={categories?.data}
              />
            </div>
            <div className="col-span-9">
              {productsData && <SortProductList
                queryConfig={queryConfig}
                pageSize={productsData.total_pages}
              />}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {productsData?.data.map((product) => (
                  <div key={product.id} className="col-span-1">
                    <Product product={product} />
                  </div>
                ))}

                {isLoading && Array(10).fill(0).map(() => <div className="col-span-1"><ProductSkeleton></ProductSkeleton></div>)}

              </div>
              {productsData && <Pagination
                queryConfig={queryConfig}
                pageSize={productsData.total_pages}
              />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
