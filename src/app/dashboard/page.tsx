'use client'

import { LogoutButton } from "@/src/modules/auth/components/LogoutButton";
import { getUserProfile } from "@/src/services/auth/me.services";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        async function redirectByRole() {
            const user = await getUserProfile();
            
            const role = user.role?.includes('ADMIN') ? 'ADMIN' : user.role?.[1];

            if (!role) {
                router.replace('/login')
                return;
            }

            switch (role) {
                case 'ADMIN':
                    router.replace('/dashboard/admin');
                    break;
                case 'PRECEPTOR':
                    router.replace('/dashboard/preceptor');
                    break;
                case 'PROFESOR': 
                    router.replace('/dashboard/teachers');
                    break;
                case 'DIRECTOR':
                    router.replace('/dashboard/director');
                    break;
                case 'ALUMNO':
                    router.replace('/dashboard/students');
                    break;
                default:
                    router.replace('/login')
            }
        }

        redirectByRole();
    }, [router]);

    return (
        <main>
            <LogoutButton />
        </main>
    );
}