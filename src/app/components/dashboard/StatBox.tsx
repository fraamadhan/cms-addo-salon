export const StatBox = ({ title, value }: { title: string, value: number | string }) => {
    return (
        <div className="p-2 w-full bg-white shadow-md shadow-gray-600 rounded-lg border border-gold-500 ring-2 ring-gold-500 mt-7">
            <div className="w-full flex flex-col items-center justify-center gap-y-4">
                <p className="leading-none text-lg font-semibold font-lora">{title}</p>
                <p className="leading-none text-2xl font-semibold font-lora">{value}</p>
            </div>
        </div>
    )
}