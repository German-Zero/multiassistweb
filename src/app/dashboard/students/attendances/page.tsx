'use client'

import { StudentService } from "@/src/modules/student/services/student.service";
import { StudentAttendance } from "@/src/modules/student/type";
import { useEffect, useState } from "react";

export default function StudentAttendancePage() {
    const [attendances, setAttendances] = useState<StudentAttendance[]>([])

    useEffect(() => {
        StudentService.getMyAttendances().then(setAttendances)
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
        </div>
    )
}