import { TransactionContent } from "@/app/components/dashboard/transaction/TransactionContent"

const TransactionPage = () => {
    return (
        <main className="flex flex-col gap-7 min-h-screen">
            <TransactionContent />
        </main>
    )
}

export default TransactionPage