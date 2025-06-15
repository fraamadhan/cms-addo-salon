import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface SelectStatusProps<T extends FieldValues> {
    control: Control<T>,
    statusLabels: Record<string, string>,
    fieldName: Path<T>,
    data: Record<string, string>[];
}

export const SelectStatus = <T extends FieldValues>(
    { control, statusLabels, fieldName, data }: SelectStatusProps<T>
) => {
    return (
        <div className="flex items-center gap-x-3">
            <Controller
                control={control}
                name={fieldName}
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger className="w-[20rem] border-gold-500 border-2 p-2 h-auto min-h-[2.8rem] rounded-xl">
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent className="w-[20rem] flex flex-col gap-y-3 text-gray-400 border-2 border-gold-500 rounded-xl p-2">
                            {
                                data.map((value: Record<string, string>, idx: number) => (
                                    <SelectItem key={idx} value={value.status} >
                                        {statusLabels[value.status] ?? value.status}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                )}
            >

            </Controller>
        </div>
    )
}
