'use client'

import { api } from "@/src/services/api/axios.instance";
import { useRouter } from "next/navigation"

export function LogoutButton() {
    const router = useRouter();

    function handleLogout() {
        localStorage.clear();
        api.post('/auth/logout', {}, { withCredentials: true });
        router.push('/login');
        router.refresh();
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-red-400"
        >
            Cerrar Sesión
        </button>
    );
}