'use client';

import { DivisionService } from "@/src/modules/academic/services/division.service";
import { Division } from "@/src/modules/academic/type";
import { StudentService } from "@/src/modules/student/services/student.service";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentPage() {
    const [student, setStudent] = useState<User[]>([]);
    const [selectIds, setSelectIds] = useState<number[]>([]);
    const [divisionId, setDivisionId] = useState<number | null>(null);
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UserService.getByRole('ALUMNO')
            .then(setStudent)
            .finally(() => setLoading(false));

        DivisionService.getAll()
            .then(setDivisions)
    }, []);

    const toggleSelection = (id: number) => {
        setSelectIds(prev =>
            prev.includes(id)
              ? prev.filter(sid => sid !== id)
              : [...prev, id]
        );
    };

    const handleAssign = async () => {
        if (!divisionId || selectIds.length === 0) return;

        await StudentService.assignDivision({
            userIds: selectIds,
            divisionId,
        });

        setSelectIds([]);
    };

    if (loading) return <p>Cargando...</p>

    if (!student) return <p>No se encontró el estudiante.</p>

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar Estudiante?')) return;
        await UserService.remove(id);
        setStudent(prev => prev.filter(s => s.id !== id));
    };

    return (
        <section className="p-6">
            <header className="flex justify-between mb-6">
                <h1 className="text-xl font-semibold">Estudiante</h1>
                <Link
                    href="/dashboard/preceptor/student/new"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Crear Estudiante
                </Link>
                <div>
                    <select
                        onChange={e => setDivisionId(Number(e.target.value))}
                        className="border p-2"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Seleccionar División
                        </option>
                        {divisions.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.letter} - {d.shift}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleAssign}
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                    >
                        Asignar
                    </button>
                </div>
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
                    {student.map(s => (
                        <tr key={s.id}>
                            <td className="border border-gray-300 px-4 py-2">{s.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{s.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="checkbox"
                                    checked={selectIds.includes(Number(s.id))}
                                    onChange={() =>
                                        toggleSelection(Number(s.id))
                                    }
                                />
                                <Link
                                    href={`/dashboard/preceptor/student/${s.id}/edit`}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(s.id)}
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