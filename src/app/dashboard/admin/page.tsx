'use client'

import { LogoutButton } from "@/src/modules/auth/components/LogoutButton"
import Link from "next/link"

export default function DashboardAdmin() {
    return (
        <main className="w-full gap-4 flex flex-wrap">
            <nav className="w-full h-1/12 flex items-center">
                <LogoutButton />
            </nav>
            <div className="w-full h-11/12 gap-2 flex flex-wrap">
                <Link 
                    href={'/dashboard/admin/director'}
                    className="
                        text-white text-center text-lg font-medium 
                        h-auto w-full py-3 px-4
                        bg-indigo-600 rounded-md
                        hover:bg-blue-600"
                >
                    Director
                </Link>
                <Link 
                    href={'/dashboard/admin/schools'}
                    className="
                        text-white text-center text-lg font-medium 
                        h-auto w-full py-3 px-4
                        bg-indigo-600 rounded-md
                        hover:bg-blue-600"
                >
                    Escuelas
                </Link>
            </div>
        </main>
    )
}