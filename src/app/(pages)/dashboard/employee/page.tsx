import { EmployeeContent } from "@/app/components/dashboard/employee/EmployeeContent";
import { Suspense } from "react";

const EmployeePage = () => {
    return (
        <main className="w-full flex flex-col p-7 gap-y-7 min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <EmployeeContent />
            </Suspense>
        </main>
    )
}

export default EmployeePage;