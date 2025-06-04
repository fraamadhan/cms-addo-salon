'use client'

import { ServiceSchema } from "@/schemas/ServiceSchema";
import { CategoryResponse, ServiceDetailResponseItem } from "@/types/service-type"
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import Button from "../button/Button";
import { Loader2Icon } from "lucide-react";
import { SelectInputCategory } from "./select-input/SelectInputCategory";
import { useGetCategories } from "@/services/categoryService";
import { SelectInputType } from "./select-input/SelectInputType";

export const AddServiceForm = (
    { service, isPending, btnLabel, onSubmit }: { service: ServiceDetailResponseItem | null, isPending: boolean, btnLabel: string, onSubmit: (data: z.infer<typeof ServiceSchema>) => void }
) => {

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('');


    const { data, isLoading: isLoadingCategory } = useGetCategories()
    const category = data?.data

    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof ServiceSchema>>({
        resolver: zodResolver(ServiceSchema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            estimation: 0,
            category: "",
            subCategory: "",
            type: "",
            file: undefined
        }
    })


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const previewUrl = URL.createObjectURL(file);

            setValue('file', file);
            setImagePreview(previewUrl)
        }
    }

    const onCancel = () => {
        reset({
            name: service?.name ?? "",
            price: service?.price ?? 0,
            description: service?.description ?? "",
            estimation: service?.estimation ?? 0,
            category: service?.category[0]?._id ?? "",
            subCategory: service?.category[1]?._id ?? "",
            type: service?.type ?? "",
            file: undefined
        })

        setImagePreview(service?.assetRef ?? '/si.svg')
    }

    useEffect(() => {
        if (service) {
            reset({
                name: service?.name ?? "",
                price: service?.price ?? 0,
                description: service?.description ?? "",
                estimation: service?.estimation ?? 0,
                category: service?.category[0]?._id ?? "",
                subCategory: service?.category[1]?._id ?? "",
                type: service?.type ?? "",
                file: undefined
            })

            setImagePreview(service?.assetRef ?? '/si.svg')
            setSelectedCategory(service.category[0]?._id ?? '');
        }
    }, [service, reset])

    return (
        <section className="flex flex-col w-full gap-y-7">
            <form className="w-full flex flex-col p-7 border shadow-xl rounded-xl gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                {Object.keys(errors).length > 0 && (
                    <div className="text-red-500">
                        Masukkan ada yang salah:
                        <ul className="list-disc ml-5">
                            {Object.entries(errors).map(([key, value]) => (
                                <li key={key}>{key}: {value?.message as string}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* image */}
                <div className="flex flex-col items-center justify-center w-full gap-y-3">
                    <div className="w-48 h-48 rounded-full overflow-hidden relative flex-shrink-0 p-3 bg-gray-100">
                        <Image
                            src={imagePreview || service?.assetRef || "/si.svg"}
                            alt="Foto layanan"
                            fill
                            sizes="192px"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <p className="text-sm text-red-500">Maksimal ukuran gambar 5MB</p>
                    <label
                        htmlFor="file"
                        className="w-[8rem] bg-gold-500 p-2 rounded-md shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 ease-in-out transition delay-150 duration-200 relative text-center">
                        Pilih Foto
                    </label>
                    <input
                        {...register("file")}
                        type="file"
                        name="file"
                        id="file"
                        aria-label="tombol ubah foto profile"
                        className="w-fit hidden"
                        onChange={handleImageChange}
                    />
                </div>

                {/* service name */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="name" className="w-[10rem]">Nama</label>
                    <input type="text" {...register("name")} id="name" placeholder="Masukkan nama pengguna" className="focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]" />
                </div>
                {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message} </p>}

                {/* description */}
                <div className="flex items-start gap-x-3">
                    <label htmlFor="description" className="w-[10rem]">Deskripsi</label>
                    <textarea
                        {...register("description")}
                        name="description"
                        id="description"
                        cols={30}
                        rows={7}
                        maxLength={1500}
                        className="outline-none p-2 bg-white border-2 rounded-lg w-[20rem] border-gold-500"
                        required
                        placeholder="Masukkan deskripsi produk di sini. Maksimal 1500 karakter">
                    </textarea>
                </div>
                {errors.description && (
                    <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                        {errors.description.message}
                    </p>
                )}

                {/* price */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="price" className="w-[10rem]">Harga Layanan</label>
                    <div className="flex">
                        <span className="p-2 inline-flex items-center bg-gold-500 border-2 rounded-l-lg border-r-0 text-white border-gold-500">Rp</span>
                        <input {...register('price', { valueAsNumber: true })} type="number" id="price" name="price" placeholder="Contoh: 20000" className="focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-r-lg w-[18rem]" pattern="^[0-9]*$" />
                    </div>
                </div>
                {errors.price && (
                    <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                        {errors.price.message}
                    </p>
                )}

                {/* estimation */}
                <div className="flex items-center gap-x-3">
                    <label htmlFor="estimation" className="w-[10rem]">Estimasi</label>
                    <div className="flex items-center gap-x-3">
                        <input {...register('estimation', { valueAsNumber: true })} type="number" id="estimation" name="estimation" placeholder="Contoh: 20000" className="focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]" />
                        <span className="text-warning-500 bg-warning-100 p-1 rounded-md font-semibold">dalam jam</span>
                    </div>
                </div>
                {errors.estimation && (
                    <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                        {errors.estimation.message}
                    </p>
                )}

                {/* category */}
                <SelectInputCategory isLoading={isLoadingCategory} control={control} service={service} label="Kategori" data={category} inputName="category" placeholder="Pilih Kategori" onValueChange={(value) => {
                    setSelectedCategory(value);
                    setValue('subCategory', ''); // reset subkategori saat ganti kategori
                }} />
                {errors.category && (
                    <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                        {errors.category.message}
                    </p>
                )}

                {/* subCategory */}
                <SelectInputCategory
                    isLoading={isLoadingCategory}
                    control={control}
                    service={service}
                    label="Sub Kategori"
                    data={category?.filter((cat: CategoryResponse) => cat.parent._id === selectedCategory)}
                    inputName="subCategory"
                    isSubCategory
                    placeholder="Pilih Sub Kategori"
                />
                {errors.subCategory && (
                    <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                        {errors.subCategory.message}
                    </p>
                )}

                {/* type */}
                <SelectInputType
                    isLoading={isLoadingCategory}
                    control={control}
                    service={service}
                    label="Tipe Layanan"
                    inputName="type"
                    placeholder="Pilih Tipe Layanan"
                />
                {errors.type && (
                    <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
                        {errors.type.message}
                    </p>
                )}

                {/* button */}
                <div className="flex justify-end gap-2 mt-7 w-full">
                    <Button type="button" onClick={onCancel} className="px-4 py-2 w-[15rem] text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
                        Reset
                    </Button>
                    {
                        isPending ? (
                            <Button type="button" className="flex items-center justify-center px-4 py-2 w-[15rem] text-sm bg-blue-200 text-white rounded" disabled>
                                <Loader2Icon className="animate-spin" />
                            </Button>
                        ) : (
                            <Button type="submit" className="px-4 py-2 w-[15rem] text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                                {btnLabel}
                            </Button>
                        )
                    }
                </div>
            </form>
        </section>
    )
}
