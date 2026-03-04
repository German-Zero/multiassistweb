'use client'

import { AttendanceService } from "@/src/modules/attendance/services/attendance.service";
import { AbsentRecord } from "@/src/modules/attendance/attendance.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentAttendancePage() {
    const { id } = useParams();
    const [records, setRecords] = useState<AbsentRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AttendanceService.getAbsents(Number(id))
        .then(setRecords)
        .finally(() => setLoading(false));
    }, [id]);

    const handleJustify = async (
        attendanceDayId: number,
        studentId: number
    ) => {
        const justification = prompt('Motivo de Justificacion');
        if (!justification) return;

        await AttendanceService.justify({
            studentId,
            attendanceDayId,
            justification,
        });

        setRecords(prev =>
            prev.map(a =>
                a.attendanceDay.id === attendanceDayId
                  ? { ...a, justification }
                  : a
            )
        );
    };

    if (loading) return <p>Cargando...</p>

    return (
        <section className="p-6">
            <h1 className="text-xl mb-6">Inasistencias Del Alumno #{id}</h1>

            {!records.length && (
                <p>No tiene Inasistencias</p>
            )}

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Fecha</th>
                        <th className="p-2">Estado</th>
                        <th className="p-2">Justificación</th>
                        <th className="p-2">Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map(r => {
                        const isJustified = !!r.justification;

                        return (
                            <tr key={r.id} className="border-t">
                                <td className="p-2">{r.attendanceDay.date}</td>
                                <td className={`p-2 font-semibold ${
                                    isJustified 
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                }`}>
                                    {isJustified
                                      ? 'JUSTIFICADA'
                                      : r.status}
                                </td>
                                <td className="p-2">
                                    {isJustified
                                      ? r.justification
                                      : 'Sin Justificar'}
                                </td>
                                <td className="p-2">
                                    {!isJustified && !r.attendanceDay.isOpen && (
                                        <button
                                            onClick={() => 
                                                handleJustify(
                                                    r.attendanceDay.id,
                                                    Number(id)
                                                )
                                            }
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Justificar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}
