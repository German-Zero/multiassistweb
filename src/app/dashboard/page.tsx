'use client'

import { getUserProfile } from "@/src/services/auth/me.services";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        async function redirectByRole() {
            const user = await getUserProfile();

            switch (user.role) {
                case 'ADMIN':
                    router.replace('dashboard/admin');
                    break;
                case 'PRECEPTOR':
                    router.replace('dashboard/preceptor');
                    break;
                case 'TEACHER': 
                    router.replace('dashboard/teacher');
                    break;
                default:
                    router.replace('/login')
            }
        }

        redirectByRole();
    }, [router]);

    return null;
}