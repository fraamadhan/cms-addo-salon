export const OrderStatusSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 p-8 border-2 border-gold-500 ring-1 ring-gold-500 rounded-xl animate-pulse">
            <div className="flex flex-col gap-4">
                <div className="h-4 w-32 bg-gray-300 rounded" />
                <div className="flex items-center gap-4">
                    <div className="w-[20rem] h-10 bg-gray-300 rounded-md" />
                    <div className="w-20 h-10 bg-gray-300 rounded-lg" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="h-4 w-32 bg-gray-300 rounded" />
                <div className="flex items-center gap-4">
                    <div className="w-[20rem] h-10 bg-gray-300 rounded-md" />
                    <div className="w-20 h-10 bg-gray-300 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export function OrderFormSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-4 border-2 border-gold-500 ring-1 ring-gold-500 rounded-xl" >
            <form className="w-full flex flex-col gap-4 animate-pulse">
                {/* Nama pelanggan */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                    <div className="h-10 w-[20rem] bg-gray-300 rounded-lg" />
                </div>

                {/* Pegawai */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                    <div className="h-10 w-[20rem] bg-gray-300 rounded-xl" />
                </div>

                {/* Nama layanan */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                    <div className="h-10 w-[20rem] bg-gray-300 rounded-lg" />
                </div>

                {/* Harga layanan */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                    <div className="h-10 w-[20rem] bg-gray-300 rounded-lg" />
                </div>

                {/* Catatan */}
                <div className="flex items-start gap-x-3">
                    <div className="w-[10rem] h-5 bg-gray-300 rounded" />
                    <div className="h-[8rem] w-[20rem] bg-gray-300 rounded-lg" />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-7 w-full">
                    <div className="h-10 w-[15rem] bg-gray-300 rounded" />
                    <div className="h-10 w-[15rem] bg-gray-300 rounded" />
                </div>
            </form>
        </div>
    );
}

