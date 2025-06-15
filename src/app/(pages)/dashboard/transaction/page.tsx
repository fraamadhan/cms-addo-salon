import { TransactionContent } from "@/app/components/dashboard/transaction/TransactionContent"
import { Suspense } from "react"

const TransactionPage = () => {
    return (
        <main className="flex flex-col gap-7 min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <TransactionContent />
            </Suspense>
        </main>
    )
}

export default TransactionPage