import { AddServiceSection } from '@/app/components/dashboard/service/AddServiceSection'
import React from 'react'

const AddServicePage = () => {
    return (
        <main className="w-full p-7 flex flex-col gap-y-7">
            <h1 className="text-3xl font-bold">Tambah Data Pengguna</h1>
            <AddServiceSection />
        </main>
    )
}

export default AddServicePage