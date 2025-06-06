'use client'

import { useRef, useState } from "react"
import Button from "../../button/Button"
import { SelectInputStatus } from "../../form/select-input/SelectInputStatus"
import { TransactionResponseItem, UpdateScheduleBody } from "@/types/transaction-type"
import { orderStatus } from "@/lib/data"
import { useUpdateReservationDate, useUpdateStatus } from "@/services/transactionService"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { HttpStatusCode } from "axios"
import { TransactionStatus } from "@/lib/enum"

export const ManageStatusSchedule = (
  { order, token, id }: { order: TransactionResponseItem, token: string, id: string }
) => {

  const [serviceStatus, setServiceStatus] = useState<TransactionStatus | null>(order?.serviceStatus as TransactionStatus);
  const reservationDateRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient();

  const handleChangeStatusOrder = () => {
    if (!serviceStatus) {
      toast.error("Status pesanan tidak valid");
      return;
    }

    mutationUpdateStatus.mutate({ token, status: serviceStatus, id })
  }

  const handleChangeReservationDate = () => {
    const reservationDate = reservationDateRef.current?.value;
    if (!reservationDate) {
      toast.error("Jadwal pesanan tidak valid");
      return;
    }
    const body: UpdateScheduleBody = {
      reservationDate,
      userId: order.user._id,
      estimation: order.product.estimation
    }
    mutationUpdateSchedule.mutate({ token, body, id })
  }

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = new Date(e.target.value);
    const hour = selected.getHours();

    if (hour < 7 || hour > 18) {
      toast.warning("Salon belum buka. Silakan pilih jadwal antara jam 07:00 - 18:00")
      e.target.value = ""
    }
  }

  const mutationUpdateStatus = useUpdateStatus({
    onSuccess: (data) => {
      if (data.status !== HttpStatusCode.Ok) {
        toast.error(data.message || "Gagal memperbarui status pesanan");
        return;
      }
      else {
        queryClient.invalidateQueries({ queryKey: ["getOrders"] })
        queryClient.invalidateQueries({ queryKey: ["getOrder"] })
        toast.success('Berhasil memperbarui status pesanan', {
          duration: 1500
        });
        return;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Gagal memperbarui status pesanan");
      return;
    }
  })

  const mutationUpdateSchedule = useUpdateReservationDate({
    onSuccess: (data) => {
      if (data.status !== HttpStatusCode.Ok) {
        toast.error(data.message || "Gagal memperbarui jadwal pesanan");
        return;
      }
      else {
        queryClient.invalidateQueries({ queryKey: ["getOrders"] })
        queryClient.invalidateQueries({ queryKey: ["getOrder"] })
        toast.success('Berhasil memperbarui jadwal pesanan', {
          duration: 1500
        });
        return;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Gagal memperbarui jadwal pesanan");
      return;
    }
  })

  return (
    <div className="flex flex-col gap-4 p-4 border-2 border-gold-500 ring-1 ring-gold-500 rounded-xl">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gold-500">
          Status Pesanan
        </label>
        <div className="flex items-center gap-2">
          <SelectInputStatus serviceStatus={serviceStatus} order={order} data={orderStatus} onValueChange={setServiceStatus} />
          <Button className="w-[8rem] p-1 border-1 border-gold-500 shadow-md rounded-lg" onClick={handleChangeStatusOrder}>
            Ubah
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gold-500" htmlFor="reservationDate">
          Jadwal Pesanan
        </label>
        <div className="flex items-center gap-2">
          <div className="w-[20rem] max-w-[25rem] p-1 border-2 border-gold-500 rounded-lg">
            <input type="datetime-local" ref={reservationDateRef} name="reservationDate" id="reservationDate" defaultValue={order?.reservationDate ? new Date(order.reservationDate).toISOString().slice(0, 16) : undefined}
              className="w-full p-1 rounded-lg focus:outline-none" onChange={handleDateTimeChange}
            />
          </div>
          <Button className="w-[8rem] p-1 border-1 border-gold-500 shadow-md rounded-lg" onClick={handleChangeReservationDate}>
            Ubah
          </Button>
        </div>
      </div>
    </div>
  )
}
