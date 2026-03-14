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
        <div className="min-h-dvh flex bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}