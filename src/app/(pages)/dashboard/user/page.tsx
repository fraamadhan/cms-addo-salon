import { UserContent } from "@/app/components/dashboard/user/UserContent";

const UserPage = () => {
    return (
        <main className="w-full flex flex-col p-7 gap-y-7 min-h-screen">
            <UserContent />
        </main>
    )
}

export default UserPage;