import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

export const SelectYear = (
    { selectedYear, setSelectedYear, years }: { selectedYear: number | undefined, setSelectedYear: (value: number | undefined) => void, years: { _id: { year: number } }[] | undefined | undefined }
) => {
    return (
        <Select
            value={selectedYear ? String(selectedYear) : ""}
            onValueChange={(value) => setSelectedYear(value ? Number(value) : undefined)}
        >
            <SelectTrigger className="w-[180px] mb-3">
                <SelectValue placeholder="Semua Tahun" />
            </SelectTrigger>
            <SelectContent>
                {years?.map((year, idx) => (
                    <SelectItem key={idx} value={String(year._id.year)}>
                        {year._id.year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
