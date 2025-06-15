'use client'

import { ServiceSchema } from "@/schemas/ServiceSchema";
import { useGetService, useUpdateService } from "@/services/serviceProductService";
import { useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from 'zod';
import { AddServiceForm } from "../../form/AddServiceForm";
import { getAccessToken } from "@/lib/token";
import { ServiceFormSkeleton } from "../../skeleton/form/FormSkeleton";

const ServiceDetail = () => {
    const [token, setToken] = useState("");
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useGetService(params.id);

    const service = data?.data;

    const onSubmit = (data: z.infer<typeof ServiceSchema>) => {

        const formData = new FormData();
        const { file } = data;

        if (file) {
            formData.append('file', file);
        }
        const category = data.subCategory ? `${data.category},${data.subCategory}` : data.category;
        formData.append('name', data.name);
        formData.append('price', data.price.toString());
        formData.append('description', data.description);
        formData.append('estimation', data.estimation.toString())
        formData.append('type', data.type);
        formData.append('categoryIds', category)

        mutation.mutate({ token, id: params.id, body: formData })
    }

    const mutation = useUpdateService({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Ok) {
                toast.error(data.message || data.message[0] || "Gagal memperbarui data layanan");
                return;
            }
            else {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey[0] === "getServices",
                    refetchType: "all",
                });
                queryClient.invalidateQueries({ queryKey: ["getService", params.id] })
                toast.success('Berhasil memperbarui data layanan', {
                    duration: 1500
                });
                router.push('/dashboard/service?page=1')
                return;
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui data layanan");
            return;
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Maaf sesi anda sudah habis. Silakan login kembali");
            return;
        }
        setToken(token)
    }, [])

    return (
        <div className="w-full rounded-lg shadow-lg">
            {
                !isError && !isLoading ? (
                    <AddServiceForm service={service} isPending={mutation.isPending} onSubmit={onSubmit} btnLabel="Ubah" />
                ) : (<ServiceFormSkeleton />)
            }
        </div>
    )
}

export default ServiceDetail