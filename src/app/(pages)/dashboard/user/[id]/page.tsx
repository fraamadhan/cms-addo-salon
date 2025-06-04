import { UserDetail } from "@/app/components/dashboard/user/UserDetail";

const UserDetailPage = () => {
    return (
        <main className="w-full p-7 flex flex-col gap-y-7">
            <h1 className="text-3xl font-bold">Ubah Data Pengguna</h1>
            <UserDetail />
        </main>
    )
}

export default UserDetailPage;
