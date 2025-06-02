import { EmployeeDetail } from "@/app/components/dashboard/employee/EmployeeDetail";

const EditEmployeePage = () => {

    return (
        <main className="w-full p-7 flex flex-col gap-y-7">
            <h1 className="text-3xl font-bold">Ubah Data Pegawai</h1>
            <EmployeeDetail />
        </main>
    )
}

export default EditEmployeePage;
