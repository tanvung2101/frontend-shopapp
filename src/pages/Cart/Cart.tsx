import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useMemo, useState } from "react";
import { getFromLocalStorage } from "../../utils/storage";
import { StorageKeys } from "../../constants/storageKeys";
import cartApi from "../../apis/cartApis";
import { data } from "../../components/Header";
import { Link } from "react-router-dom";
import path from "../../constants/path";
import { generateNameId } from "../../utils/utils";
import Button from "../../components/Button";
import { CartItems } from "../../interface/cart.interface";

export interface ExtendedCartItems extends CartItems {
  disabled: boolean;
  checked: boolean;
}

export interface ExtendedPurchase {
  id?: number;
  session_id?: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  cart_items: ExtendedCartItems[];
};

export default function Cart() {
  const { token } = useSelector((state: RootState) => state.account);
  const [extendedPurchase, setExtendedPurchase ] = useState<ExtendedPurchase>();
  const [purchases, SetPurchase] = useState<data>();
  const cartInfo = getFromLocalStorage(StorageKeys.CART);
  const isAllChecked = useMemo(
    () => extendedPurchase?.cart_items.every((purchase) => purchase.checked),
    [extendedPurchase]
  );
  const fetchCartDetails = async () => {
    const result = await cartApi.cartDetail(cartInfo?.data.id as number);
    SetPurchase(result.data);
  };
  console.log(purchases)
  // console.log(cartDetails?.cart_items)
  useEffect(() => {
    if (token) {
      fetchCartDetails();
    }
  }, [token]);
  useEffect(() => {
    if (purchases?.id && purchases?.user_id) {
      setExtendedPurchase({
        id: purchases.id,
        session_id: purchases.session_id,
        user_id: purchases.user_id,
        created_at: purchases.created_at ?? "",
        updated_at: purchases.updated_at ?? "",
        cart_items: purchases.cart_items.map((pur) => ({
          ...pur,
          disabled: false,
          checked: false,
        })),
      });
    }
  }, [purchases]);

  const handleCheck =
    (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchase((prev) =>
        prev
          ? {
              ...prev,
              cart_items: prev.cart_items.map((item, index) =>
                index === purchaseIndex
                  ? { ...item, checked: event.target.checked }
                  : item
              ),
            }
          : prev
      );
    };
  const handleCheckAll = () => {
    setExtendedPurchase((prev) => {
      if (!prev) return prev; // Nếu không có dữ liệu, giữ nguyên state

      return {
        ...prev,
        cart_items: prev.cart_items.map((item) => ({
          ...item,
          checked: !isAllChecked,
        })),
      };
    });
  };


  return (
    <div className="bg-neutral-100 py-16">
      <div className="layout">
        <div className="overflow-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
              <div className="col-span-6">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center justify-center pr-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-orange"
                      checked={isAllChecked || false}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className="flex-grow text-black">Sản phẩm</div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-5 text-center">
                  <div className="col-span-2">Đơn giá</div>
                  <div className="col-span-1">Số lượng</div>
                  <div className="col-span-1">Số tiền</div>
                  <div className="col-span-1">Thao tác</div>
                </div>
              </div>
            </div>
            {extendedPurchase && extendedPurchase?.cart_items?.length > 0 ? (
              <div className="my-3 rounded-sm bg-white p-5 shadow">
                {extendedPurchase.cart_items?.map((purchase, index) => (
                  <div
                    key={purchase.id}
                    className="mb-5 first:mt-0 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500"
                  >
                    <div className="col-span-6">
                      <div className="flex">
                        <div className="flex flex-shrink-0 items-center justify-center pr-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 accent-orange"
                            checked={purchase.checked}
                            onChange={handleCheck(index)}
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex">
                            <Link
                              className="w-20 h-20 flex-shrink-0"
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: String(purchase.product.id),
                              })}`}
                            >
                              <img
                                alt={purchase.product.name}
                                src={purchase.product.image}
                              />
                            </Link>
                            <div className="flex-grow px-2 pt-1 pb-2">
                              <Link
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: String(purchase.product.id),
                                })}`}
                                className="line-clamp-2 text-left"
                              >
                                <span>{purchase.product.name}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="grid grid-cols-5 items-center">
                        <div className="col-span-2">
                          <div className="flex items-center justify-center">
                            <span className="text-gray-300 line-through">
                              đ{purchase.product.oldprice}
                            </span>
                            <span className="ml-3">
                              đ {purchase.product.price}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1">
                          {/* <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper="flex items-center"
                            onIncrease={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value <= purchase.product.quantity
                              )
                            }
                            onDecrease={(value) =>
                              handleQuantity(index, value, value >= 1)
                            }
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !==
                                    (purchasesInCart as Purchase[])[index]
                                      .buy_count
                              )
                            }
                            onType={handleTypeQuantity(index)}
                            disabled={purchase.disabled}
                          /> */}
                        </div>
                        <div className="col-span-1">
                          <span className=" text-orange">
                            {" "}
                            đ
                            {Number(purchase.product.price) * purchase.quantity}
                          </span>
                        </div>
                        <div className="col-span-1">
                          <button
                            // onClick={handleDelete(index)}
                            className="bg-none text-black transition-colors hover:text-orange"
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="my-3"></div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 z-10 flex items-center rounded-sm bg-white p-5 shadow border border-gray-100">
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center justify-center pr-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-orange"
                checked={isAllChecked || false}
                onChange={handleCheckAll}
              />
            </div>
            <button
              className="mx-3 border-none bg-none"
              onClick={handleCheckAll}
            >
              {/* Chọn tất cả ({extendedPurchase.length}) */}
            </button>
            <button
              className="mx-3 border-none bg-none"
              // onClick={() => handleDeleteManyPurchases()}
            >
              Xoá
            </button>
          </div>
          <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center sm:justify-end">
                <div className="">
                  Tổng thanh toán ({} sản phẩm):
                </div>
                <div className="ml-2 text-2xl text-orange">
                  {/* đ{formatCurrency(totalCheckedPurchasePrice)} */}
                </div>
              </div>
              <div className="flex items-center text-sm sm:justify-end">
                <div className="text-gray-500">Tiệt kiểm</div>
                <div className="ml-6 text-orange">
                  {/* đ{formatCurrency(totalCheckedPurchaseSavingPrice)} */}
                </div>
              </div>
            </div>
            <Button
              // onClick={handleBuyPurchase}
              // disabled={buyProductsMutation.isLoading}
              className="mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0"
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 1725
