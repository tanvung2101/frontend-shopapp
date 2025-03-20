import { Link } from "react-router-dom";
import { Product as TypeProduct } from "../interface/product.interface";

export default function Product({ product }: { product: TypeProduct }) {
  return (
    <Link to="/">
      <div className="bg-white shadow rounded-sm hover:translate-y-[-0.4rem] hover:shadow-md duration-100 transition-transform overflow-hidden">
        <div className="w-full pt-[100%] relative">
          {product.image && <img
            src={product.image || ""}
            alt={product.name}
            width="100"
            height="100"
            className="absolute top-0 left-0 bg-white w-full h-full object-cover"
          />}
        </div>
        <div className="p-2 overflow-hidden">
          <div className="min-h-[2rem] line-clamp-2 text-xs">
            {product.name}
          </div>
          <div className="flex items-center mt-3">
            <div className="line-through max-w-[50%] text-gray-500 truncate">
              <span className="text-xs">đ</span>
              <span className="text-sm">{product.oldprice}</span>
            </div>
            <div className="text-orange truncate ml-1">
              <span className="text-xs">đ</span>
              <span className="text-sm">{product.price}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end">
            {/* <ProductRating rating={product.rating} /> */}
            <div className="ml-2 text-sm">
              <span>12</span>
              <span className="ml-1">Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
