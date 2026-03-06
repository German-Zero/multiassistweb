'use client'

import { Disciplinary } from "@/src/modules/attendance/disciplinary.type";
import { DisciplinaryService } from "@/src/modules/attendance/services/disciplinary.service";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDisciplinaryPage() {
    const { id } = useParams();
    const [records, setRecords] = useState<Disciplinary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        DisciplinaryService.getByStudent(Number(id))
         .then(setRecords)
         .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Cargando...</p>

    return (
        <section className="p-6">
            <header className="flex justify-between mb-6">
                <h1 className="text-xl">Acciones Disciplinarias</h1>

                <Link
                    href={`/dashboard/preceptor/student/${id}/disciplinary/new`}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Nueva Accion
                </Link>
            </header>

            {!records.length && (
                <p>No registra sanciones.</p>
            )}

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Fecha</th>
                        <th className="p-2">Motivo</th>
                        <th className="p-2">Severidad</th>
                        <th className="p-2">Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map(r => (
                        <tr key={r.id} className="border-t">
                            <td className="p-2">{r.date}</td>
                            <td className="p-2">{r.reason}</td>
                            <td className="p-2 font-semibold">{r.severity}</td>
                            <td>
                                <Link
                                  href={`/dashboard/preceptor/student/${id}/disciplinary/${r.id}/edit`}
                                  className="bg-blue-600 text-white px-2 py-1 rounded"
                                >
                                  Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}