'use client'

import { getAccessToken, getUserRoleFromToken } from "@/lib/token";
import { UpdatePasswordUserSchema, UserSchema } from "@/schemas/UserSchema";
import { useGetUser, useUpdateUser } from "@/services/userService";
import { useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { z } from 'zod';
import { UserGeneralInformation } from "./profile/UserGeneralInformation";
import { PasswordSection } from "./profile/PasswordSection";
import { PasswordSectionSkeleton, UserGeneralInformationSkeleton } from "../../skeleton/form/FormSkeleton";

export const UserDetail = () => {

    const [token, setToken] = useState("");
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useGetUser(token, params.id);
    const user = data?.data;

    const onSubmitGeneral = (data: z.infer<typeof UserSchema>) => {
        if (!user?._id) {
            toast.error("Data pengguna tidak valid");
            return;
        }

        const formData = new FormData();
        const { file } = data;

        if (file) {
            formData.append('file', file);
        }
        formData.append('name', data.name);
        formData.append('phone_number', data.phone_number);
        formData.append('address', data.address);
        formData.append('birth_date', data.birth_date);
        formData.append('role', data.role);
        formData.append('is_verified', String(data.is_verified));
        formData.append('email_verified_at', data.email_verified_at);
        formData.append('gender', data.gender)

        mutation.mutate({ token, id: params.id, body: formData });
    }

    const onSubmitChangePassword = (data: z.infer<typeof UpdatePasswordUserSchema>) => {
        if (!user?._id) {
            toast.error("Data pengguna tidak valid");
            return;
        }

        const role = getUserRoleFromToken();
        if (role) {
            data.role = role
        }

        mutation.mutate({ token, id: params.id, body: data })
    }

    const mutation = useUpdateUser({
        onSuccess: (data) => {
            if (data?.status !== HttpStatusCode.Ok) {
                toast.error(data.message || "Gagal memperbarui data pengguna")
                return;
            }
            else {
                toast.success("Berhasil memperbarui data pengguna", {
                    duration: 1500,
                })
                queryClient.invalidateQueries({ queryKey: ["getUsers"] })
                queryClient.invalidateQueries({ queryKey: ["getUser"] })
                router.replace('/dashboard/user')
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui data pengguna")
            return;
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Sesi anda sudah habis. Silakan login kembali");
            return;
        }
        setToken(token)
    }, [])
    return (
        <div className="w-full rounded-lg shadow-lg">
            <div className="flex flex-col w-full min-h-screen gap-y-">
                {
                    !isError && !isLoading ? (
                        <>
                            <UserGeneralInformation user={user} onSubmit={onSubmitGeneral} isLoading={isLoading} isPending={mutation.isPending} />
                            <PasswordSection onSubmit={onSubmitChangePassword} isPending={mutation.isPending} />
                        </>
                    ) :
                        (
                            <>
                                <UserGeneralInformationSkeleton />
                                <PasswordSectionSkeleton />
                            </>
                        )
                }
            </div>
        </div>
    )
}
