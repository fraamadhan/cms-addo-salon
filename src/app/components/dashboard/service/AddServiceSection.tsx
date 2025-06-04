'use client'

import { useQueryClient } from '@tanstack/react-query';
import { AddServiceForm } from '../../form/AddServiceForm'
import { ServiceSchema } from '@/schemas/ServiceSchema'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useCreateService } from '@/services/serviceProductService';
import { HttpStatusCode } from 'axios';
import { toast } from 'sonner';
import { getAccessToken } from '@/lib/token';

export const AddServiceSection = () => {

    const [token, setToken] = useState("");
    const router = useRouter();
    const queryClient = useQueryClient();

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

        mutation.mutate({ token, body: formData })
    }

    const mutation = useCreateService({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Created) {
                toast.error(data.message || "Gagal menambah data layanan");
                return;
            }
            else {
                queryClient.invalidateQueries({ queryKey: ["getServices"] })
                toast.success('Berhasil menambah data layanan', {
                    duration: 1500
                });
                router.push('/dashboard/service?page=1')
                return;
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal menambah data pengguna");
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
        <div className='w-full'>
            <AddServiceForm service={null} isPending={mutation.isPending} onSubmit={onSubmit} btnLabel="Simpan" />
        </div>
    )
}
