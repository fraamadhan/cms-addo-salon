import { TransactionDetail } from "@/app/components/dashboard/transaction/TransactionDetail"

const TransactionDetailPage = () => {
    return (
        <main className="w-full flex flex-col gap-y-7 p-7">
            <h1 className="text-3xl font-bold">Detail Transaksi</h1>
            <TransactionDetail />
        </main>
    )
}

export default TransactionDetailPage