import { useContext, useEffect, useMemo, useState } from "react";
import cartApi from "../../apis/cartApis";
import { data } from "../../components/Header";
import { Link, useLocation } from "react-router-dom";
import path from "../../constants/path";
import { generateNameId } from "../../utils/utils";
import Button from "../../components/Button";
import { CartItems } from "../../interface/cart.interface";
import QuantityController from "../../components/QuantityController";
import { useMutation } from "@tanstack/react-query";
import {keyBy} from 'lodash'
import { toast } from "react-toastify";
import { AppContext } from "../../contexts/app.context";

export interface ExtendedCartItems extends CartItems {
  disabled?: boolean;
  checked?: boolean;
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
  const { isAuthenticated } = useContext(AppContext)
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const location = useLocation()
  const choosePurchaseIdFromLocation = (location.state as { purchaseId: number } | null)?.purchaseId
  const [purchases, SetPurchase] = useState<data>();
  const isAllChecked = useMemo(
    () => extendedPurchase?.cart_items.every((purchase) => purchase.checked),
    [extendedPurchase]
  );
  console.log(extendedPurchase)
  const fetchCartDetails = async () => {
    const result = await cartApi.getCarts();
    console.log(result)
    if (result?.data) {
      SetPurchase(result.data);
      return result.data;
    }
    if(!result.data){
      localStorage.removeItem('cart')
    }
    return null;
  };
  // const fetchCartDetails1 = async () => {
  //   const result = await cartApi.getCarts();
  //   console.log(result)
  // };
  const updatePurchaseMutation = useMutation({
    mutationFn: cartApi.updateCartItem,
    onSuccess: (data) => {
      // refetch()
      // console.log(data)
      fetchCartDetails()
    }
  })
  
  const deleteCartItemMutation = useMutation({
    mutationFn: cartApi.deleteCartItem, // nhớ tạo API tương ứng
    onSuccess: async () => {
      const cart = await fetchCartDetails()
  
      if (!cart) {
        localStorage.removeItem('cart') 
      }
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: cartApi.buyProduct,
    onSuccess: async () => {
      const cart = await fetchCartDetails()
  
      if (!cart) {
        localStorage.removeItem('cart') 
        setExtendedPurchase(undefined)
      }
    },
  });
  
  
  

  const checkedPurchases = () => {
    return extendedPurchase?.cart_items.filter((item) => item.checked) || [];
  };

  const totalCheckedPurchasePrice = checkedPurchases().reduce(
    (acc, item) => acc + (item.product.price as number) * (item.quantity as number),
    0
  );

  const calculateTotalSaving = () => {
    if (!extendedPurchase) return 0;
  
    const totalSaving = extendedPurchase.cart_items.reduce((total, item) => {
      if (item.checked && item.product.oldprice && item.product.price) {
        const saving = item.product.oldprice - item.product.price;
        return total + saving * item.quantity;
      }
      return total;
    }, 0);
  
    return totalSaving;
  };
  
  
  

  useEffect(() => {
      fetchCartDetails();
  }, []);
  useEffect(() => {
    if (purchases?.id && purchases?.user_id) {
      const extendedPurchasesObject = keyBy(extendedPurchase?.cart_items, 'id');

      setExtendedPurchase({
        id: purchases.id,
        session_id: purchases.session_id,
        user_id: purchases.user_id,
        created_at: purchases.created_at ?? "",
        updated_at: purchases.updated_at ?? "",
        cart_items: purchases.cart_items.map((pur) => {
          const isChoosePurchaseIdFromLocation = choosePurchaseIdFromLocation === pur.product.id
          return ({
            ...pur,
            disabled: false,
            checked: isChoosePurchaseIdFromLocation || Boolean(extendedPurchasesObject[pur.id]?.checked),
          })
        }),
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

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase?.cart_items[purchaseIndex]
      setExtendedPurchase(
        (prev) => {
          if (!prev) return prev;
          const newCartItems = [...prev.cart_items];
          newCartItems[purchaseIndex] = {
            ...newCartItems[purchaseIndex],
            disabled: true,
          };

          return {
            ...prev,
            cart_items: newCartItems,
          };
        }
      )
      // console.log(purchase)
      updatePurchaseMutation.mutate({ product_id: purchase?.product.id as number, cart_id: Number(purchase?.cart_id) , quantity: value})
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      (prev) => {
        if (!prev) return prev;
        const newCartItems = [...prev.cart_items];
        newCartItems[purchaseIndex] = {
          ...newCartItems[purchaseIndex],
          quantity: value,
        };

        return {
          ...prev,
          cart_items: newCartItems,
        };
      }
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchase = extendedPurchase?.cart_items[purchaseIndex];
    if (purchase?.id) {
      deleteCartItemMutation.mutate(purchase.id);
      toast.success("Đã xoá sản phẩm");
    }
  };
  

  const handleDeleteManyPurchases = () => {
    if (!extendedPurchase) return;
  
    const checkedItems = extendedPurchase.cart_items.filter((item) => item.checked);
  
    if (checkedItems.length === 0) {
      toast.warn("Vui lòng chọn sản phẩm để xoá!");
      return;
    }
  
    const deletePromises = checkedItems.map((item) =>
      cartApi.deleteCartItem(item.id as number)
    );
  
    Promise.all(deletePromises)
      .then(() => {
        toast.success("Đã xoá các sản phẩm đã chọn");
        fetchCartDetails();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Có lỗi xảy ra khi xoá sản phẩm");
      });
  };

  const handleBuyPurchase = async () => {
    const selectedItems = checkedPurchases();
  
    if (selectedItems.length > 0 && extendedPurchase) {
      console.log(extendedPurchase)
      const cart_item_ids = selectedItems.map((item) => item.id);
      const total = totalCheckedPurchasePrice;
  
      buyProductsMutation.mutate({
        cart_id: extendedPurchase.id as number,
        total,
        payment: 1, // hoặc 1 nếu bạn xử lý VNPay
        cart_item_ids,
      });
    } else {
      toast.warn("Vui lòng chọn sản phẩm để mua!");
    }
  };
  
  


  return (
    <div className="bg-neutral-100 py-16">
      {extendedPurchase ? <>
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
                          <QuantityController
                            max={purchase.product.stock}
                            value={purchase.quantity}
                            classNameWrapper="flex items-center"
                            onIncrease={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value <= purchase.product.stock
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
                                  value <= purchase.product.stock &&
                                  value !==
                                    purchases?.cart_items[index].quantity
                              )
                            }
                            onType={handleTypeQuantity(index)}
                            disabled={purchase.disabled}
                          />
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
                            onClick={handleDelete(index)}
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
              Chọn tất cả ({extendedPurchase?.cart_items.length})
            </button>
            <button
              className="mx-3 border-none bg-none"
            onClick={() => handleDeleteManyPurchases()}
            >
              Xoá
            </button>
          </div>
          <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center sm:justify-end">
                <div className="">
                  Tổng thanh toán ({ totalCheckedPurchasePrice} sản phẩm):
                </div>
                <div className="ml-2 text-2xl text-orange">
                  {/* đ{formatCurrency(totalCheckedPurchasePrice)} */}
                </div>
              </div>
              <div className="flex items-center text-sm sm:justify-end">
                <div className="text-gray-500">Tiệt kiểm</div>
                <div className="ml-6 text-orange">
                  {/* đ{formatCurrency(totalCheckedPurchaseSavingPrice)} */}
                  {calculateTotalSaving()}
                </div>
              </div>
            </div>
            <Button
              onClick={handleBuyPurchase}
              // disabled={buyProductsMutation.isLoading}
              className="mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0"
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
      </>: <div></div>}
    </div>
  );
}

// 1725
