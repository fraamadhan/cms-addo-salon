import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../ui/command";
import { ChevronsUpDown } from "lucide-react";
import Button from "../../button/Button";
import { SelectServiceItem } from "@/types/service-type";

type SelectServiceProps<T extends FieldValues> = {
    control: Control<T>;
    fieldName: Path<T>
    open: boolean;
    setOpen: (value: boolean) => void;
    services: SelectServiceItem[];
};

export const SelectService = <T extends FieldValues>({
    control,
    fieldName,
    open,
    setOpen,
    services,
}: SelectServiceProps<T>) => {
    return (
        <Controller
            control={control}
            name={fieldName}
            render={({ field }) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="flex items-center justify-between">
                        <Button className="p-2 w-[20rem] border-2 border-gold-500 rounded-xl">
                            {field.value
                                ? services?.find((emp: SelectServiceItem) => emp._id === field.value)?.name
                                : "Pilih layanan yang akan dipesan"}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[20rem] p-1 border-gold-500 border-1 max-h-60 overflow-auto">
                        <Command>
                            <CommandInput placeholder="Cari layanan..." className="h-9" />
                            <CommandEmpty>Layanan tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                                {services?.map((service: SelectServiceItem) => (
                                    <CommandItem
                                        key={service._id}
                                        value={service.name}
                                        onSelect={() => {
                                            field.onChange(service._id);
                                            setOpen(false);
                                        }}
                                    >
                                        {service.name}
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
