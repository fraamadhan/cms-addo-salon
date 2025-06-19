import { AddEmployeeForm } from "@/app/components/form/AddEmployeeForm"

const AddUserPage = () => {
    return (
        <main className="w-full p-7 flex flex-col gap-y-7">
            <h1 className="text-3xl font-bold">Tambah Data Pegawai</h1>
            <AddEmployeeForm />
        </main>
    )
}

export default AddUserPage