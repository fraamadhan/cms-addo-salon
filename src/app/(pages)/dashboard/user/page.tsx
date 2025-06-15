import { UserContent } from "@/app/components/dashboard/user/UserContent";
import { Suspense } from "react";

const UserPage = () => {
    return (
        <main className="w-full flex flex-col p-7 gap-y-7 min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <UserContent />
            </Suspense>
        </main>
    )
}

export default UserPage;