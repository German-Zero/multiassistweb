'use client'

import { AuthService } from "@/src/modules/auth/services/auth.service";
import { UserService } from "@/src/modules/users/services/user.service";
import { api } from "@/src/services/api/axios.instance";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")


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
        <div className="flex h-screen items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="border p-6 rounded w-80"
            >
                <h1 className="text-lg mb-4">Debes Cambiar Tu Contraseña</h1>

                <input 
                    type="password" 
                    placeholder="Nueva Contraseña"
                    className="border p-2 w-full mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-600 text-white w-full p-2 rounded">
                    Cambiar Contraseña
                </button>
            </form>
        </div>
    )
}