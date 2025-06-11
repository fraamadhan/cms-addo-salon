export const StatusInformation = (
    { status }: { status: string }
) => {
    return (
        <section className="w-full p-3 bg-white shadow-lg rounded-xl ring-2 ring-gold-500">
            <div className={`p-2 w-[20rem] text-lg ${status === 'COMPLETED' && 'bg-success-300 text-success-800'} ${status === 'EXPIRED' && 'bg-error-300 text-error-800'} ${status === 'CANCELED' && 'bg-error-300 text-error-800'} ${status === 'PAID' && 'bg-success-300 text-success-800'} font-bold text-center rounded-xl`}>
                {{
                    COMPLETED: "Selesai",
                    CANCELED: "Dibatalkan",
                    EXPIRED: "Kedaluwarsa",
                    PAID: "Sudah dibayar"
                }[status]}
            </div>
        </section>
    )
}
