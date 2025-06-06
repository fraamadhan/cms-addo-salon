import { OrderDetail } from "@/app/components/dashboard/order/OrderDetail"

const OrderDetailPage = () => {
    return (
        <main className="w-full flex flex-col gap-y-7 p-7">
            <h1 className="text-3xl font-bold">Detail Pesanan</h1>
            <OrderDetail />
        </main>
    )
}

export default OrderDetailPage