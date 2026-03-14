'use client'

import { LogoutButton } from "@/src/modules/auth/components/LogoutButton"
import Link from "next/link"

export default function DashboardDirector() {
    return (
        <main className="min-h-screen p-6 flex flex-col gap-6">

            <nav className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    Panel de Dirección
                </h1>
                <LogoutButton />
            </nav>
            <div className="flex flex-col gap-3">
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
            </div>
        </main>
    )
}