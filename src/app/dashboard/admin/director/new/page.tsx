'use client'

import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { UserService } from "@/src/modules/users/services/user.service";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function NewDirectorPage() {
    const router = useRouter();
    const [schools, setSchools] = useState<School[]>([]);

    useEffect(() => {
        SchoolService.getAll().then(setSchools);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await UserService.create({
            name: String(form.get('name') ?? ''),
            middlename: String(form.get('middlename'.trim()) ?? null),
            lastname: String(form.get('lastname') ?? ''),
            email: String(form.get('email') ?? ''),
            dni: String(form.get('dni') ?? ''),
            userType: 'DIRECTOR',
            schoolId: Number(form.get('schoolId') ?? ''),
        });

        router.push('/dashboard/admin/director');
    };  

    return (
        <form 
            onSubmit={handleSubmit}
            className="p-6 max-w-md"
        >
            <h1 className="text-xl mb-4">Nuevo Director</h1>

            {['name', 'middlename', 'lastname', 'email', 'dni'].map(field => (
                <input
                    key={field}
                    name={field}
                    placeholder={field}
                    required={field !== 'middlename'}
                    className="border p-2 mb-2 w-full"
                />
            ))}

            <select 
                name="schoolId"
                required
                className="border p-2 mb-2 w-full"
            >
                {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>

            <button className="bg-black text-white px-4 py-2">
                Crear
            </button>
        </form>
    );
} 