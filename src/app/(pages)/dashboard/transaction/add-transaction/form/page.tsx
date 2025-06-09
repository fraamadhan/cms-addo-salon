import { AddTransactionForm } from "@/app/components/form/AddTransactionForm"

const AddTransactionPage = () => {
    return (
        <main className="w-full p-7 flex flex-col gap-y-7">
            <h1 className="text-3xl font-bold">Tambah Transaksi</h1>
            <AddTransactionForm />
        </main>
    )
}

export default AddTransactionPage