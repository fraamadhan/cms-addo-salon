import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../ui/command";
import { TransactionEmployeeItem } from "@/types/transaction-type";
import { ChevronsUpDown } from "lucide-react";
import Button from "../../button/Button";

type SelectEmployeeProps<T extends FieldValues> = {
    control: Control<T>;
    fieldName: Path<T>
    open: boolean;
    setOpen: (value: boolean) => void;
    employees: TransactionEmployeeItem[];
};

export const SelectEmployee = <T extends FieldValues>({
    control,
    fieldName,
    open,
    setOpen,
    employees,
}: SelectEmployeeProps<T>) => {
    return (
        <Controller
            control={control}
            name={fieldName}
            render={({ field }) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="flex items-center justify-between">
                        <Button className="p-2 w-[20rem] border-2 border-gold-500 rounded-xl">
                            {field.value
                                ? employees?.find((emp: TransactionEmployeeItem) => emp._id === field.value)?.name
                                : "Pilih pegawai yang akan ditugaskan"}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[20rem] p-1 border-gold-500 border-1 max-h-60 overflow-auto">
                        <Command>
                            <CommandInput placeholder="Cari pegawai..." className="h-9" />
                            <CommandEmpty>Pegawai tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                                {employees?.map((employee: TransactionEmployeeItem) => (
                                    <CommandItem
                                        key={employee._id}
                                        value={employee.name}
                                        onSelect={() => {
                                            field.onChange(employee._id);
                                            setOpen(false);
                                        }}
                                    >
                                        {employee.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        >
        </Controller>
    )
}
