'use client'

import { AuthService } from "@/src/modules/auth/services/auth.service";
import { UserService } from "@/src/modules/users/services/user.service";
import { api } from "@/src/services/api/axios.instance";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const user = await UserService.getMe()
        await AuthService.changePassword(password, Number(user.id))
        localStorage.clear();
        api.post('/auth/logout', {}, { withCredentials: true });
        router.push('/login')
        router.refresh();
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="
            w-full max-w-md p-6 sm:p-8 rounded-xl border shadow-md space-y-6
            border-slate-200 dark:border-slate-800
            bg-white dark:bg-slate-900
        ">
            <h1 className="
                text-center text-lg sm:text-xl font-semibold 
                text-slate-800 dark:text-slate-100
            ">
                Cambiar Tu Contraseña
            </h1>
            <div className="relative">
                <input 
                    className="
                    w-full p-3 rounded-lg border transition
                    border-slate-300 dark:border-slate-700
                    bg-white dark:bg-slate-800
                    text-slate-900 dark:text-slate-100
                    placeholder-slate-400 dark:placeholder-slate-500
                    focus:outline-none focus:ring-2
                    focus:ring-indigo-500 focus:border-indigo-500"
                    type={show ? "text" : "password"} 
                    placeholder="Nueva Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-sm
                        text-slate-500
                        hover:text-indigo-600
                        dark:text-slate-400
                        dark:hover:text-indigo-400
                        transition
                    "
                >
                    {show ? "Ocultar" : "Mostrar"}
                </button>
            </div>
            <button className="
                    w-full py-3 rounded-lg transition 
                    bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 
                    disabled:opacity-50 disabled:cursor-not-allowed
                ">
                Cambiar Contraseña
            </button>
        </form>
    )
}