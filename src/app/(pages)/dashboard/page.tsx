import { DashboardContent } from "@/app/components/dashboard/DashboardContent";
import { Suspense } from "react";

const DashboardPage = () => {

    return (
        <main className="w-full p-5 flex flex-col gap-y-7">
            <h1 className="w-full font-semibold text-3xl font-lora">Dashboard</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <DashboardContent />
            </Suspense>
        </main>
    )
}

export default DashboardPage;
