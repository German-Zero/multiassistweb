'use client'

import { UserService } from "@/src/modules/users/services/user.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const router = useRouter() 
    useEffect(() => {
        const check = async () => {
            const user = await UserService.getMe()
            if (!user.changePassword){
                router.push("/change-password")
            }
        }
        check()
    }, [])
    return (
        <div className="min-h-screen flex bg-neutral-950 text-white">
            <aside className="w-64 bg-neutral-900 p-4">
                <h2 className="font-semibold">Admin Panel</h2>
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    )
}