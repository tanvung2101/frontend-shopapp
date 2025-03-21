import { useParams } from "react-router-dom";
import { formatCurrency, formatNumberToSocialStyles, getIdFromNameId, rateSale } from "../../utils/utils";
import productApi from "../../apis/productApi";
import { useEffect, useMemo, useState } from "react";
import { ProductDetails } from "../../interface/product.interface";


export default function ProductDetail() {
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);
    const [productDetail, setProductDetail] = useState<ProductDetails>();
    const [currentIndexImage, setCurrentIndexImage] = useState([0, 5]);
    const [activeImage, setActiveImage] = useState("");
    const currentImages = useMemo(
      () => (productDetail ? productDetail.product_images.slice(...currentIndexImage) : []),
      [productDetail, currentIndexImage]
    );

  const fetchProductById = async () => {
    const result = await productApi.getProductById(id);
    setProductDetail(result.data);
  };
  useEffect(() => {
    fetchProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const next = () => {
      if (productDetail && currentIndexImage[1] < productDetail.product_images.length) {
        setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1]);
      }
    };

    const prev = () => {
      if (currentIndexImage[0] > 0) {
        setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1]);
      }
    };
    const chooseActive = (image: string) => {
      setActiveImage(image);
    };
  console.log(activeImage);
  return (
    <div className="bg-gray-200 py-6">
      <div className="layout">
        {productDetail && (
          <div className="bg-white p-4 shadow">
            <div className="grid grid-cols-12 gap-9">
              <div className="col-span-5">
                <div className="relative w-full pt-[100%] shadow">
                  <img
                    src={activeImage}
                    alt={productDetail?.name}
                    className="absolute top-0 left-0 bg-white w-full h-full object-cover"
                  />
                </div>
                <div className="relative mt-4 grid grid-cols-5 gap-1">
                  <button
                    className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                      onClick={prev}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                    {currentImages.map((img, index) => {
                  const isActive = img.image_url === activeImage;
                  return (
                    <div
                      className="relative w-full pt-[100%]"
                      key={index}
                      onMouseEnter={() => chooseActive(img.image_url)}
                    >
                      <img
                        src={img.image_url}
                        className="absolute top-0 left-0 bg-white w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-orange"></div>
                      )}
                    </div>
                  );
                })}
                  <button
                    className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                      onClick={next}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="col-span-7">
                <h1 className="text-xl font-medium uppercase">
                  {productDetail?.name}
                </h1>
                <div className="mt-8 flex items-center">
                  <div className="flex items-center">
                    <span className="mr-1 border-b border-b-orange text-orange">
                      {/* {productDetail?.rating} */}
                    </span>
                    {/* <ProductRating
                    rating={product.rating}
                    activeClassName="fill-orange text-orange h-4 w-4"
                    nonActiveClassName="fill-gray-300 text-gray-300 h-4 w-4"
                  /> */}
                  </div>
                  <div className="mx-4 h-4 w-[1px] bg-gray-300 "></div>
                  <div>
                    <span>{formatNumberToSocialStyles(productDetail.buyturn)}</span>
                    <span className="ml-1 text-gray-500">Da ban</span>
                  </div>
                </div>
                <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                  <div className="text-gray-500 line-through">
                    d{formatCurrency(productDetail.oldprice)}
                  </div>
                  <div className="ml-3 text-3xl font-medium text-orange">
                    d{formatCurrency(productDetail.price)}
                  </div>
                  <div className="ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white">
                    {rateSale(
                      productDetail?.oldprice as number,
                      productDetail?.price as number
                    )}
                  </div>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="capitalize text-gray-500">Số lượng</div>
                  {/* <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={product.quantity}
                  /> */}
                  <div className="ml-6 text-sm text-gray-500">
                    {productDetail.quantity} sản phẩm có sẵn
                  </div>
                </div>
                <div className="mt-8 flex items-center">
                  <button
                    // onClick={addToCart}
                    className="flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5"
                  >
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x={0}
                      y={0}
                      className="mr-[10px] h-5 w-5 fill-current stroke-orange text-orange"
                    >
                      <g>
                        <g>
                          <polyline
                            fill="none"
                            points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy="13.5" r={1} stroke="none" />
                          <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                        </g>
                        <line
                          fill="none"
                          strokeLinecap="round"
                          strokeMiterlimit={10}
                          x1="7.5"
                          x2="10.5"
                          y1={7}
                          y2={7}
                        />
                        <line
                          fill="none"
                          strokeLinecap="round"
                          strokeMiterlimit={10}
                          x1={9}
                          x2={9}
                          y1="8.5"
                          y2="5.5"
                        />
                      </g>
                    </svg>
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    // onClick={buyNow}
                    className="flex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        <div className="container">
          <div className=" bg-white p-4 shadow">
            <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
              Mô tả sản phẩm
            </div>
                      {productDetail && <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
                          <div
                              dangerouslySetInnerHTML={{
                                  __html: (productDetail.description),
                              }}
                          />
                      </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
