import { ServiceContent } from "@/app/components/dashboard/service/ServiceContent";
import { Suspense } from "react";

const ServicePage = () => {
    return (
        <main className="w-full flex flex-col gap-y-7 min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <ServiceContent />
            </Suspense>
        </main>
    )
}

export default ServicePage;
