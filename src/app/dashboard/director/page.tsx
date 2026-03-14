'use client'

import { LogoutButton } from "@/src/modules/auth/components/LogoutButton"
import Link from "next/link"

export default function DashboardDirector() {
    return (
        <main className="w-full gap-4 flex flex-wrap">
            <nav className="w-full h-1/12 flex items-center">
                <LogoutButton />
            </nav>
            <div className="w-full h-11/12 gap-2 flex flex-wrap">
                <Link 
                    href={'/dashboard/director/preceptors'}
                    className="
                        text-white text-center text-lg font-medium 
                        h-auto w-full py-3 px-4
                        bg-indigo-600 rounded-md
                        hover:bg-blue-600"
                >
                    Preceptores
                </Link>
                <Link 
                    href={'/dashboard/director/teachers'}
                    className="
                        text-white text-center text-lg font-medium 
                        h-auto w-full py-3 px-4
                        bg-indigo-600 rounded-md
                        hover:bg-blue-600"
                >
                    Profesores
                </Link>
            </div>
        </main>
    )
}