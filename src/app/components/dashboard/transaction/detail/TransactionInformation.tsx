import { TransactionHistoryResponseItem } from '@/types/transaction-type'
import React from 'react'

export const TransactionInformation = (
  { transaction }: { transaction: TransactionHistoryResponseItem }
) => {
  console.log(transaction)
  return (
    <section className='w-full p-3 bg-white shadow-lg rounded-xl ring-2 ring-gold-500 flex flex-col gap-4'>
      {/* Order code */}
      <div className='flex items-center max-w-[30rem] gap-4'>
        <label htmlFor="orderCode" className='w-[10rem]'>Kode Pesanan</label>
        <p id='orderCode' className='focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]'>
          {transaction?.orderCode}
        </p>
      </div>
      {/* customer name */}
      <div className='flex items-center max-w-[30rem] gap-4'>
        <label htmlFor="customerName" className='w-[10rem]'>Nama Pelanggan</label>
        <p id='customerName' className='focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]'>
          {transaction?.user?.name || transaction?.customerName}
        </p>
      </div>
      {/* customer email */}
      <div className='flex items-center max-w-[30rem] gap-4'>
        <label htmlFor="customerEmail" className='w-[10rem]'>Email Pelanggan</label>
        <p id='customerEmail' className='focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]'>
          {transaction?.user?.email || "-"}
        </p>
      </div>
      {/* customer phone number */}
      <div className='flex items-center max-w-[30rem] gap-4'>
        <label htmlFor="customerPhoneNumber" className='w-[10rem]'>No. Telepon Pelanggan</label>
        <p id='customerPhoneNumber' className='focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]'>
          {transaction?.user?.phone_number || "-"}
        </p>
      </div>
      {/* transaction type */}
      <div className='flex items-center max-w-[30rem] gap-4'>
        <label htmlFor="transactionType" className='w-[10rem]'>Tipe Transaksi</label>
        <p id='transactionType' className='focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]'>
          {{
            offline: "Pemesanan di tempat",
            online: "Pemesanan melalui aplikasi"
          }[transaction?.transactionType as string]}
        </p>
      </div>
      {/* payment method */}
      <div className='flex items-center max-w-[30rem] gap-4'>
        <label htmlFor="paymentMethod" className='w-[10rem]'>Metode Pembayaran</label>
        <p id='paymentMethod' className='focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]'>
          {{
            qris: "QRIS",
            gopay: "GoPay",
            bank_transfer: "Bank Transfer",
            cash: "Tunai"
          }[transaction?.paymentMethod as string]}
        </p>
      </div>
      {/* bank */}
      {
        transaction?.bank && (
          <div className='flex items-center max-w-[30rem] gap-4'>
            <label htmlFor="bank" className='w-[10rem]'>Bank</label>
            <p id='bank' className='focus:outline-none p-2 bg-white border-2 border-gold-500 rounded-lg w-[20rem]'>
              {transaction.bank.toUpperCase()}
            </p>
          </div>
        )
      }
    </section>
  )
}
