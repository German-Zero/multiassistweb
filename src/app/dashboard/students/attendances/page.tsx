'use client'

import { StudentService } from "@/src/modules/student/services/student.service";
import { StudentAttendance, StudentWarning } from "@/src/modules/student/type";
import { useEffect, useState } from "react";

export default function StudentAttendancePage() {
    const [attendances, setAttendances] = useState<StudentAttendance[]>([])
    const [warning, setWarnings] = useState<StudentWarning[]>([])

    useEffect(() => {
        StudentService.getMyAttendances().then(setAttendances)
        StudentService.getMyWarnings().then(setWarnings)
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-xl mb-6">Asistencia</h1>

            <table className="w-full border mb-10">
                <thead className="bg-gray-500">
                    <tr>
                        <th className="p-2">Fecha</th>
                        <th className="p-2">Estado</th>
                        <th className="p-2">Justificación</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances.map(a=> (
                        <tr key={a.id} className="border-t">
                            <td className="p-2">{new Date(a.day).toLocaleDateString()}</td>
                            <td className="p-2">{a.status}</td>
                            <td className="p-2">{a.justification ?? "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-lg mb-4">Advertencias</h2>

            <table className="w-full border">
                <thead className="bg-gray-500">
                    <tr>
                        <th className="p-2">Fecha</th>
                        <th className="p-2">Motivo</th>
                        <th className="p-2">Severidad</th>
                    </tr>
                </thead>
                <tbody>
                    {warning.map(w => (
                        <tr key={w.id} className="border-t">
                            <td className="p-2">{new Date(w.date).toLocaleDateString()}</td>
                            <td className="p-2">{w.reason}</td>
                            <td className="p-2">{w.severity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}