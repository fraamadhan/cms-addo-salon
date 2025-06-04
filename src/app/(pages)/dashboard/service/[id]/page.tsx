import ServiceDetail from "@/app/components/dashboard/service/ServiceDetail"

const ServiceDetailPage = () => {
    return (
        <main className="w-full p-7 flex flex-col gap-y-7">
            <h1 className="text-3xl font-bold">Ubah Data Pengguna</h1>
            <ServiceDetail />
        </main>
    )
}

export default ServiceDetailPage