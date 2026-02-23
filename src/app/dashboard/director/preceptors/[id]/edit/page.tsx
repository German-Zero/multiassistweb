'use client';

import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPreceptorPage() {
    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [schools, setSchools] = useState<School[]>([]);

    useEffect(() => {
        UserService.getAll().then(data => {
            setUser(data.find(u => u.id == id) || null);
        });
        SchoolService.getAll().then(setSchools);
    }, [id]);

    if (!user) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await UserService.update(user.id, {
            name: String(form.get('name') ?? ''),
            middlename: String(form.get('middlename')?.toString().trim() ?? null),
            lastname: String(form.get('lastname') ?? ''),
            email: String(form.get('email') ?? ''),
            dni: String(form.get('dni') ?? ''),
            schoolId: Number(form.get('schoolId') ?? ''),
        });

        router.push('/dashboard/director/preceptors');
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="p-6 max-w-md"
        >
            <h1 className="text-xl mb-4">Editar Preceptor</h1>

            <input name="name" defaultValue={user.name} className="border p-2 mb-2 w-full" />
            <input placeholder="middlename" name="middlename" defaultValue={user.middlename || undefined} className="border p-2 mb-2 w-full" />
            <input name="lastname" defaultValue={user.lastname} className="border p-2 mb-2 w-full" />
            <input name="email" defaultValue={user.email} className="border p-2 mb-2 w-full" />
            <input name="dni" defaultValue={user.dni} className="border p-2 mb-2 w-full" />

            <select 
                name="schoolId"
                required
                className="border p-2 mb-2 w-full"
            >
                {schools.map(s => (
                    <option key={s.id} value={s.id} selected={Number(s.id) === user.schoolId}>{s.name}</option>
                ))}
            </select>

            <button className="bg-black text-white px-4 py-2">
                Guardar
            </button>
        </form>
    )
}