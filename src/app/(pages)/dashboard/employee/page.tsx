import { EmployeeContent } from "@/app/components/dashboard/employee/EmployeeContent";

const EmployeePage = () => {
    return (
        <main className="w-full flex flex-col p-7 gap-y-7 min-h-screen">
            <EmployeeContent />
        </main>
    )
}

export default EmployeePage;