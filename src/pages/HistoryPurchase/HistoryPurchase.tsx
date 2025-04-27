import { useEffect, useState } from "react"
import { purchaseStatus } from "../../constants/purchase"
import orderApis from "../../apis/OrderApis"
import { Product } from "../../interface/product.interface"
import { createSearchParams, Link } from "react-router-dom"
import path from "../../constants/path"
import { formatCurrency, generateNameId } from "../../utils/utils"
import classNames from "classnames"
import useQueryParams from "../../hooks/useQueryParams"

const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgress, name: 'Đang giao' },
  { status: purchaseStatus.delivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã huỷ' }
]


export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all
  const [orderInCartData, setOrderInCartData] = useState<{
    "message": string,
    "data": [
      {
        "id": number,
        "user_id": number,
        "status": number,
        "note": string,
        "phone": string,
        "address": string,
        "total": number,
        "session_id": string,
        "created_at": string,
        "updated_at": string,
        "order_details": [
          {
            "id": number,
            "order_id": number,
            "product_id": number,
            "price": number,
            "quantity": number,
            "created_at": string,
            "updated_at": string,
            "product": Product
          }
        ]
      }
    ],
    "current_page": number,
    "total_pages": number,
    "total": number
  }>()
  const fetchOrder = async () => {
    const data = await orderApis.getOrders()
    setOrderInCartData(data)
  }
  useEffect(() => {
    fetchOrder()
  }, [])

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      key={tab.name}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {orderInCartData && orderInCartData.data.length > 0 && orderInCartData.data.map((order) => {
              return (
                <div key={order.id}>{
                  order.order_details.map((item) => {
                    return (<div key={item.id}>
                      <div key={item.id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                        <Link
                          to={`${path.home}${generateNameId({ name: item.product.name, id: String(item.product.id) })}`}
                          className='flex'
                        >
                          <div className='flex-shrink-0'>
                            <img className='h-20 w-20 object-cover' src={item.product.image} alt={item.product.name} />
                          </div>
                          <div className='ml-3 flex-grow overflow-hidden'>
                            <div className='truncate'>{item.product.name}</div>
                            <div className='mt-3'>x{item.quantity}</div>
                          </div>
                          <div className='ml-3 flex-shrink-0'>
                            <span className='truncate text-gray-500 line-through'>
                              ₫{formatCurrency(item.product.oldprice)}
                            </span>
                            <span className='ml-2 truncate text-orange'>₫{formatCurrency(item.product.price)}</span>
                          </div>
                        </Link>
                        <div className='flex justify-end'>
                          <div>
                            <span>Tổng giá tiền</span>
                            <span className='ml-4 text-xl text-orange'>
                              ₫{formatCurrency(order.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>)
                  })
                }</div>
              )
            })}
            {/* {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}
