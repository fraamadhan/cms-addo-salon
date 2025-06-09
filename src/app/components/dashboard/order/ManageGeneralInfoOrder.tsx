'use client'

import { Loader2Icon } from "lucide-react"
import Button from "../../button/Button"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { OrderSchema } from "@/schemas/OrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionResponseItem } from "@/types/transaction-type";
import { useEffect, useState } from "react";
import { useGetChooseEmployees } from "@/services/employeeService";
import { SelectEmployee } from "../../form/combo-box/SelectEmployee";

export const ManageGeneralInfoOrder = (
  { order, token, isPending, onSubmit }: { order: TransactionResponseItem, token: string, isPending: boolean, onSubmit: (data: z.infer<typeof OrderSchema>) => void }
) => {

  const [open, setOpen] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      customerName: "",
      serviceName: "",
      servicePrice: 0,
      note: "",
      employeeId: "",
    }
  })

  const { data } = useGetChooseEmployees(token);
  const employees = data?.data;

  const onCancel = () => {
    reset({
      customerName: order?.user?.name ?? order?.user?.customerName ?? "",
      serviceName: order?.product?.name ?? "",
      servicePrice: order?.price ?? 0,
      note: order?.note ?? "",
      employeeId: order?.employee?._id ?? ""
    })
  }

  useEffect(() => {
    if (order) {
      reset({
        customerName: order?.user?.name ?? order?.user?.customerName ?? "",
        serviceName: order?.product?.name ?? "",
        servicePrice: order?.price ?? 0,
        note: order?.note ?? "",
        employeeId: order?.employee?._id ?? ""
      })
    }
  }, [order, reset])

  return (
    <div className="flex flex-col gap-4 p-4 border-2 border-gold-500 ring-1 ring-gold-500 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
      <form className="w-full flex flex-col gap-4">
        {/* customer name */}
        <div className="flex items-center gap-x-3">
          <label htmlFor="customerName" className="w-[10rem]">Nama pelanggan</label>
          <div className="flex items-center gap-x-3">
            <input {...register('customerName')} type="text" id="customerName" name="customerName" placeholder="Nama pelanggan" className="focus:outline-none p-2 bg-gray-100 border-2 border-gold-500 rounded-lg w-[20rem]" disabled />
          </div>
        </div>
        {errors.customerName && (
          <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
            {errors.customerName.message}
          </p>
        )}

        {/* employee */}
        <div className="flex items-center gap-x-3">
          <label htmlFor="serviceName" className="w-[10rem]">Pegawai</label>
          <SelectEmployee employees={employees} fieldName="employeeId" open={open} setOpen={setOpen} control={control} />
        </div>

        {/* service name */}
        <div className="flex items-center gap-x-3">
          <label htmlFor="serviceName" className="w-[10rem]">Nama layanan</label>
          <div className="flex items-center gap-x-3">
            <input  {...register('serviceName')} type="text" id="serviceName" name="serviceName" placeholder="Nama layanan" className="focus:outline-none p-2 bg-gray-100 border-2 border-gold-500 rounded-lg w-[20rem]" disabled />
          </div>
        </div>
        {errors.serviceName && (
          <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
            {errors.serviceName.message}
          </p>
        )}

        {/* service price */}
        <div className="flex items-center gap-x-3">
          <label htmlFor="servicePrice" className="w-[10rem]">Harga layanan</label>
          <div className="flex items-center gap-x-3">
            <input  {...register('servicePrice', { valueAsNumber: true })} type="number" id="servicePrice" name="servicePrice" placeholder="Harga layanan" className="focus:outline-none p-2 bg-gray-100 border-2 border-gold-500 rounded-lg w-[20rem]" disabled />
          </div>
        </div>
        {errors.servicePrice && (
          <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
            {errors.servicePrice.message}
          </p>
        )}

        {/* note */}
        <div className="flex items-start gap-x-3">
          <label htmlFor="note" className="w-[10rem]">Catatan</label>
          <textarea
            {...register('note')}
            name="note"
            id="note"
            cols={30}
            rows={7}
            maxLength={1500}
            className="outline-none p-2 border-2 rounded-lg w-[20rem] border-gold-500 bg-gray-100"
            required
            placeholder="Catatan pelanggan"
            disabled>
          </textarea>
        </div>
        {errors.note && (
          <p className="text-red-500 text-sm bg-red-100 font-bold rounded-xl p-2">
            {errors.note.message}
          </p>
        )}

        <div className="flex justify-end gap-2 mt-7 w-full">
          <Button type="button" onClick={onCancel} className="px-4 py-2 w-[15rem] text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            Reset
          </Button>
          {
            isPending ? (
              <Button type="button" className="flex items-center justify-center px-4 py-2 w-[15rem] text-sm bg-blue-200 text-white rounded" disabled>
                <Loader2Icon className="animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="px-4 py-2 w-[15rem] text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                Simpan
              </Button>
            )
          }
        </div>
      </form>
    </div>
  )
}
