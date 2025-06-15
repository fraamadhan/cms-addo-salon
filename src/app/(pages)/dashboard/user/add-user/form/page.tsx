import { AddUserForm } from "@/app/components/form/AddUserForm"

const AddUserPage = () => {
    return (
        <main className="w-full p-7 flex flex-col gap-y-7">
            <h1 className="text-3xl font-bold">Tambah Data Pengguna</h1>
            <AddUserForm />
        </main>
    )
}

export default AddUserPage