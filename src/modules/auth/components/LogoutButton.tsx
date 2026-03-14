'use client'

import { api } from "@/src/services/api/axios.instance";
import { LogOut } from "lucide-react";
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
        <div className="h-10 w-10 bg-red-500 flex justify-center items-center rounded-full">
            <button
                onClick={handleLogout}
                className="flex items-center gap-2"
                >
                <LogOut size={18} className="text-white w-5 h-5"/>
            </button>
        </div>
    );
}