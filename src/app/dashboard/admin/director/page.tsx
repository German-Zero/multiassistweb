'use client'

import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function DirectorPage() {
    const [directors, setDirectors] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  UserService.getByRole('DIRECTOR')
    .then(setDirectors)
    .finally(() => setLoading(false));
}, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar Director?')) return;
        await UserService.remove(id);
        setDirectors(prev => prev.filter(d => d.id !== id));
    };

    if (loading) return <p>Cargando...</p>

    return (
        <section className="p-6">
            <header className="flex justify-between mb-6">
                <h1 className="text-xl font-semibold">Directores</h1>
                <Link 
                    href="/dashboard/admin/director/new" 
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Crear Director
                </Link>
            </header>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {directors.map((d) => (
                        <tr key={d.id} className="border-t">
                            <td className="p-2">{d.name}</td>
                            <td className="p-2">{d.email}</td>
                            <td className="p-2 flex gap-2">
                                <Link
                                    href={`/dashboard/admin/director/${d.id}/edit`}
                                    className="underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(d.id)}
                                    className="text-red-600"
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