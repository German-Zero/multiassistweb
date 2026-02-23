'use client'

import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UserService.getByRole('PROFESOR')
        .then(setTeachers)
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando...</p>

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar Docente?')) return;
        await UserService.remove(id);
        setTeachers(prev => prev.filter(d => d.id !== id));
    };

    return (
        <section className="p-6">
            <header className="flex justify-between mb-6">
                <h1 className="text-xl font-semibold">Docentes</h1>
            
                <Link
                    href="/dashboard/director/teachers/new"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Crear Docente
                </Link>
            </header>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(t => (
                        <tr key={t.id}>
                            <td className="border border-gray-300 px-4 py-2">{t.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{t.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    href={`/dashboard/director/teachers/${t.id}/edit`}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}