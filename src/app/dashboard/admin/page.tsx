'use client'

import { LogoutButton } from "@/src/modules/auth/components/LogoutButton"
import Link from "next/link"

export default function DashboardAdmin() {
    return (
        <main className="
            min-h-screen p-4 sm:p-6 lg:p-10 space-y-6
            bg-slate-50 dark:bg-slate-950
        ">
            <header className="flex items-center justify-between">
                <h1 className="
                    text-2xl font-semibold
                    text-slate-800 dark:text-slate-100
                ">
                    Panel Administrador
                </h1>
                <LogoutButton />
            </header>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                    href="/dashboard/admin/director"
                    className="
                        group rounded-xl border p-6 text-left
                        border-slate-200 dark:border-slate-800
                        bg-white dark:bg-slate-900
                        transition
                        hover:shadow-md hover:border-indigo-500
                ">
                    <h2 className="
                        text-lg font-semibold
                        text-slate-700 dark:text-slate-200
                    ">
                        Directores
                    </h2>
                    <p className="
                        mt-2 text-sm
                        text-slate-500 dark:text-slate-400
                    ">
                        Gestionar directores del sistema
                    </p>
                </Link>
                <Link
                    href="/dashboard/admin/schools"
                    className="
                        group rounded-xl border p-6 text-left
                        border-slate-200 dark:border-slate-800
                        bg-white dark:bg-slate-900
                        transition
                        hover:shadow-md hover:border-indigo-500
                ">
                    <h2 className="
                        text-lg font-semibold
                        text-slate-700 dark:text-slate-200
                    ">
                        Escuelas
                    </h2>
                    <p className="
                        mt-2 text-sm
                        text-slate-500 dark:text-slate-400
                    ">
                        Administrar escuelas registradas
                    </p>
                </Link>
            </section>
        </main>
    )
}