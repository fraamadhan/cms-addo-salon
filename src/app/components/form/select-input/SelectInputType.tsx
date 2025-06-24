import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Control, Controller } from 'react-hook-form'
import { ServiceDetailResponseItem, ServiceForm } from '@/types/service-type';

interface SelectInputCategoryProps {
    isLoading: boolean;
    control: Control<ServiceForm>;
    service?: ServiceDetailResponseItem | null;
    label: string;
    inputName: keyof ServiceForm;
    placeholder?: string;
}

export const SelectInputType = (
    { isLoading, control, service, label, inputName, placeholder, }: SelectInputCategoryProps
) => {
    return (
        <div className="flex items-center gap-x-3">
            <label htmlFor={inputName} className="w-[10rem]">
                <span className="text-red-500">*</span>{label}
            </label>
            {!isLoading ? (
                <Controller
                    control={control}
                    name={inputName}
                    render={({ field }) => (
                        <Select
                            value={String(field.value) === '' ? service?.type : String(field.value)}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-[20rem] focus:outline-none border-gold-500 border-2">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent className="w-[20rem] flex flex-col gap-y-3 text-gray-400 border-2 border-gold-500 rounded-xl p-2">
                                <SelectItem className="p-1" value={'male'}>
                                    Laki-Laki
                                </SelectItem>
                                <SelectItem className="p-1" value={'female'}>
                                    Perempuan
                                </SelectItem>
                                <SelectItem className="p-1" value={'unisex'}>
                                    Unisex
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    )
                    }
                />
            ) : (
                <input
                    type="text"
                    className="outline-none p-2 bg-white border-gold-500 border rounded-lg w-[18rem]"
                    placeholder={placeholder}
                    aria-label="skeleton"
                    disabled
                />
            )}
        </div>
    )
}
