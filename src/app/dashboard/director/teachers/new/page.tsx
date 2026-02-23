'use client'

import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { UserService } from "@/src/modules/users/services/user.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewTeacherPage() {
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
            middlename: String(form.get('middlename')?.toString().trim() ?? null),
            lastname: String(form.get('lastname') ?? ''),
            email: String(form.get('email') ?? ''),
            dni: String(form.get('dni') ?? ''),
            userType: 'PROFESOR',
            schoolId: Number(form.get('schoolId') ?? ''),
        });

        router.push('/dashboard/director/teachers');
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="p-6 max-w-md"
        >
            <h1 className="text-xl mb-4">Nuevo Docente</h1>

            {['name', 'middlename', 'lastname', 'email', 'dni'].map(field => (
                <input
                    key={field}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required={field !== 'middlename'}
                    className="w-full p-2 border rounded mb-2"
                />
            ))}
            
            <select name="schoolId" className="w-full p-2 border rounded mb-2">
                <option value="">Seleccionar Escuela</option>
                {schools.map(school => (
                    <option key={school.id} value={school.id}>
                        {school.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Crear Docente
            </button>
        </form>
    );
}