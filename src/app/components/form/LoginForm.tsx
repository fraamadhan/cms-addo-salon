'use client'

import { useState } from "react";
import Button from "../button/Button";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/LoginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from "@/services/authService";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const ShowPasswordIcon = showPassword ? EyeOffIcon : EyeIcon;
    const typePassword = showPassword ? "text" : "password";

    const { register, handleSubmit, formState: { errors }, resetField } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {

        mutation.mutate(data)
        resetField('email')
        resetField('password')
    }

    const mutation = useLogin({
        onSuccess: (data) => {
            if (data.status !== HttpStatusCode.Ok) {
                toast.error(data.message || "Gagal masuk ke dalam aplikasi")
            }
            else {
                toast.success("Berhasil masuk ke dalam aplikasi", {
                    duration: 1500,
                })
                router.replace('/dashboard')
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal masuk ke dalam aplikasi")
        }
    })
    const handleShowPassword = () => setShowPassword((prev) => !prev)
    return (
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col p-7 bg-white rounded-xl shadow shadow-gold-500 border border-gold-500 gap-y-5">
            {/* card header */}
            <div className="w-full flex flex-col gap-y-3">
                {/* title */}
                <h1 className="text-4xl font-semibold font-lora text-gray-700">
                    Login
                </h1>
                <p className="leading-none">Selamat datang di Addo Salon</p>
            </div>
            {/* input group */}
            <div className="w-full">
                <form action="" className="w-full flex flex-col gap-y-7" onSubmit={handleSubmit(onSubmit)}>
                    {/* email */}
                    <div className="w-full flex flex-col gap-y-4">
                        <div className="w-full">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input
                                {...register("email")}
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Masukkan email"
                                autoComplete="email"
                                className="w-full outline-none p-2 border border-gold-500 rounded-xl focus:ring-2 focus:ring-gold-500"
                                required
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.email.message}</p>}
                        {/* password */}
                        <div className="w-full relative">
                            <label htmlFor="password" className="font-semibold w-full">Password</label>
                            <input
                                {...register("password")}
                                type={typePassword}
                                name="password"
                                id="password"
                                placeholder="Masukkan password"
                                title="Password"
                                className="w-full outline-none p-2 border border-gold-500 rounded-xl peer pr-10 focus:ring-2 focus:ring-gold-500"
                                required
                            />
                            <Button className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer" type="button">
                                <ShowPasswordIcon onClick={handleShowPassword} />
                            </Button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">{errors.password.message}</p>}

                    </div>
                    {/* button */}
                    <div className="flex items-center justify-center">
                        {
                            mutation.isPending ? (
                                <Button type="submit" className="flex items-center justify-center p-2 bg-gold-900 rounded-xl shadow-sm w-[25rem] cursor-pointer text-center" disabled>
                                    <Loader2Icon className="animate-spin" />
                                </Button>
                            ) : (
                                <Button type="submit" className="p-2 bg-gold-500 rounded-xl shadow-sm w-[25rem] hover:bg-gold-700 cursor-pointer">
                                    Masuk
                                </Button>
                            )
                        }
                    </div>
                </form>
            </div >
        </div >
    )
}

export default LoginForm;
