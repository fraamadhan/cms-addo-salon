'use client'

import { FolderArchive, LayoutDashboard, LogOut, ScrollTextIcon, ShoppingCartIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import Button from "../button/Button";
import { usePathname, useRouter } from "next/navigation";
import { deleteAccessToken } from "@/lib/token";
import { toast } from "sonner";

const SideNav = () => {

    const pathname = usePathname();
    const router = useRouter();

    const onClick = () => {
        deleteAccessToken()
        toast.info("Anda akan diarahkan ke halaman masuk...", {
            duration: 1500
        })
        router.replace('/auth/login')
    }

    const links = [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/dashboard/employee", icon: User2Icon, label: "Pegawai" },
        { href: "/dashboard/user", icon: User2Icon, label: "Pengguna" },
        { href: "/dashboard/order", icon: ShoppingCartIcon, label: "Pesanan" },
        { href: "/dashboard/product", icon: FolderArchive, label: "Layanan" },
        { href: "/dashboard/transaction", icon: ScrollTextIcon, label: "Transaksi" },
    ];
    return (
        <nav className="h-full w-full bg-gray-800 text-white shadow-xl flex flex-col justify-between p-5">
            <div className="flex flex-col gap-y-10">
                <div className="w-full flex items-center justify-center">
                    <p className="text-2xl font-bold font-lora">Hi, Admin!</p>
                </div>

                {/* navigation */}
                <div className="flex flex-col gap-y-6">
                    {links.map(({ href, icon: Icon, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-x-2 px-3 py-2 rounded-md transition ${pathname === href
                                ? "bg-gold-100 text-gold-700 font-semibold"
                                : "hover:bg-gray-700"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <Button className="w-full flex items-center justify-center px-4 py-2 bg-red-100 text-red-500 font-bold rounded-xl gap-x-2 hover:bg-red-200" onClick={onClick}>
                    <span>Keluar</span>
                    <LogOut />
                </Button>
            </div>
        </nav>

    )
}

export default SideNav;