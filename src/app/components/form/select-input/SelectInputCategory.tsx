import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Control, Controller } from 'react-hook-form'
import { CategoryResponse, ServiceDetailResponseItem, ServiceForm } from '@/types/service-type';

interface SelectInputCategoryProps {
    isLoading: boolean;
    control: Control<ServiceForm>;
    service?: ServiceDetailResponseItem | null;
    label: string;
    inputName: keyof ServiceForm;
    data: CategoryResponse[];
    isSubCategory?: boolean;
    placeholder?: string;
    onValueChange?: (value: string) => void;
}

export const SelectInputCategory = (
    { isLoading, control, service, label, inputName, data, isSubCategory = false, placeholder, onValueChange }: SelectInputCategoryProps
) => {
    return (
        <div className="flex items-center gap-x-3">
            <label htmlFor={inputName} className="w-[10rem]">
                {!isSubCategory ? (<span className="text-red-500">*</span>) : null}
                {label}
            </label>
            {!isLoading ? (
                <Controller
                    control={control}
                    name={inputName}
                    render={({ field }) => {
                        const defaultValue = !field.value
                            ? isSubCategory
                                ? service?.category?.[1]?._id ?? ''
                                : service?.category?.[0]?._id ?? ''
                            : field.value;

                        return (
                            <Select
                                value={String(defaultValue)}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    onValueChange?.(value);
                                }}
                            >
                                <SelectTrigger className="w-[20rem] focus:outline-none border-gold-500 border-2">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent className="w-[20rem] flex flex-col gap-y-3 text-gray-400 border-2 border-gold-500 rounded-xl p-2">
                                    {isSubCategory
                                        ? data.flatMap((category) =>
                                            category.children?.map((child) => (
                                                <SelectItem className="p-1" value={child._id} key={child._id}>
                                                    {child.name}
                                                </SelectItem>
                                            )) ?? []
                                        )
                                        : data.map((category, idx) => (
                                            <SelectItem className="p-1" value={category.parent._id} key={`${category.parent._id}-${idx}`}>
                                                {category.parent.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        )
                    }}
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
