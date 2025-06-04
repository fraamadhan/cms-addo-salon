'use client'

import Button from "@/app/components/button/Button";
import { UpdatePasswordUserSchema } from "@/schemas/UserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from 'zod';

export const PasswordSection = (
    {
        onSubmit, isPending
    }:
        {
            onSubmit: (data: z.infer<typeof UpdatePasswordUserSchema>) => void,
            isPending: boolean,
        }
) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isShowPassword = showPassword ? "text" : "password";
    const isShowConfirmPassword = showConfirmPassword ? "text" : "password";

    const IconA = showPassword ? EyeOffIcon : EyeIcon;
    const IconB = showConfirmPassword ? EyeOffIcon : EyeIcon;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof UpdatePasswordUserSchema>>({
        resolver: zodResolver(UpdatePasswordUserSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    })

    const handleShowPasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }
    const handleShowConfirmPasswordToggle = () => {
        setShowConfirmPassword((prev) => !prev);
    }

    const onCancel = () => {
        reset({
            password: "",
            confirmPassword: ""
        })
    }
    return (
        <section className="flex flex-col w-full gap-y-7" >
            <form className="w-full flex flex-col p-7 border shadow-xl rounded-xl gap-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2 relative w-[18rem]">
                    <label htmlFor="password" className="font-federo font-semibold">
                        Kata Sandi Baru
                    </label>
                    <input {...register("password")} type={isShowPassword} name="password" required id="password" className="peer rounded-xl p-2 bg-white border-2 border-gold-500 pr-10 w-[18rem]" placeholder="Masukkan kata sandi baru" />
                    <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
                        <IconA onClick={handleShowPasswordToggle} />
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
                <div className="mb-2 relative w-[18rem]">
                    <label htmlFor="confirmPassword" className="font-federo font-semibold">
                        Konfirmasi Kata Sandi Baru
                    </label>
                    <input {...register("confirmPassword")} type={isShowConfirmPassword} name="confirmPassword" required id="confirmPassword" className="peer rounded-xl p-2 bg-white border-2 border-gold-500 pr-10 w-[18rem]" placeholder="Konfirmasi kata sandi baru" />
                    <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
                        <IconB onClick={handleShowConfirmPasswordToggle} />
                    </span>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>}
                {/* button */}
                <div className="flex justify-end gap-2 mt-3 w-full">
                    <Button type="button" onClick={onCancel} className="px-4 py-2 w-[15rem] text-sm bg-gray-200 rounded hover:bg-gray-300">
                        Reset
                    </Button>
                    {
                        isPending ? (
                            <Button type="button" className="flex items-center justify-center px-4 py-2 w-[15rem] text-sm bg-blue-200 text-white rounded" disabled>
                                <Loader2Icon className="animate-spin" />
                            </Button>
                        ) : (
                            <Button type="submit" className="px-4 py-2 w-[15rem] text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Ubah
                            </Button>
                        )
                    }
                </div>
            </form>
        </section>
    )
}
