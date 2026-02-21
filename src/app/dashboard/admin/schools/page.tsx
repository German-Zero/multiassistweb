'use client'

import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function SchoolPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SchoolService.getAll()
            .then(setSchools)
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar escuela?')) return;
        await SchoolService.remove(id);
        setSchools(prev => prev.filter(s => s.id !== id));
    };

    if (loading) return <p>Cargando...</p>

    return (
        <section className="p-6">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Escuelas</h1>

                <Link
                    href={"/dashboard/admin/schools/new"}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Crear Escuela
                </Link>
            </header>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Ciudad</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {schools.map(school => (
                        <tr key={school.id} className="border-t">
                            <td className="p-2">{school.name}</td>
                            <td className="p-2">{school.address?.ciudad}</td>
                            <td className="p-2">
                                <Link
                                    href={`/dashboard/admin/schools/${school.id}/edit`}
                                >
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(school.id)}
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
    )
}