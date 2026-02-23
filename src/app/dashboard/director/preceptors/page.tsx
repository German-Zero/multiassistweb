'use client'

import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreceptorPage() {
    const [preceptors, setPreceptors] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        UserService.getByRole('PRECEPTOR')
        .then(setPreceptors)
        .finally(() => setLoading(false));
    }, []);
    
    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar Preceptor?')) return;
        await UserService.remove(id);
        setPreceptors(prev => prev.filter(d => d.id !== id));
    };
    
    if (loading) return <p>Cargando...</p>
    
    return (
        <section className="p-6">
            <header className="flex justify-between mb-6">
                <h1 className="text-xl font-semibold">Preceptores</h1>
                <Link
                    href="/dashboard/director/preceptors/new"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Crear Preceptor
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
                    {preceptors.map(p => (
                        <tr key={p.id}>
                            <td className="border border-gray-300 px-4 py-2">{p.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{p.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link
                                    href={`/dashboard/director/preceptors/${p.id}/edit`}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(p.id)}
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