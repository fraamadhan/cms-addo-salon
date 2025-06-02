import { DashboardContent } from "@/app/components/dashboard/DashboardContent";

const DashboardPage = () => {

    return (
        <main className="w-full p-5 flex flex-col gap-y-7">
            <h1 className="w-full font-semibold text-3xl font-lora">Dashboard</h1>
            <DashboardContent />
        </main>
    )
}

export default DashboardPage;
