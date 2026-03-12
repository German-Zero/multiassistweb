'use client'

import { StudentService } from "@/src/modules/student/services/student.service";
import { StudentWarning } from "@/src/modules/student/type";
import { useEffect, useState } from "react";

export default function StudentWarningsPage() {
    const [warnings, setWarnings] = useState<StudentWarning[]>([])
    useEffect(() => {
        StudentService.getMyWarnings().then(setWarnings)
    }, [])

    return (
        <div>
            <h1 className="text-lg mb-4">Advertencias</h1>
            <table className="w-full border">
                <thead className="bg-gray-500">
                    <tr>
                        <th className="p-2">Fecha</th>
                        <th className="p-2">Motivo</th>
                        <th className="p-2">Severidad</th>
                    </tr>
                </thead>
                <tbody>
                    {warnings.map(w => (
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