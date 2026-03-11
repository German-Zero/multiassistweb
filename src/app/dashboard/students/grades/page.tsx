'use client'

import { StudentService } from "@/src/modules/student/services/student.service";
import { StudentGrade } from "@/src/modules/student/type";
import { useEffect, useState } from "react";

export default function StudentGradesPage() {

    const [grades, setGrades] = useState<StudentGrade[]>([])

    useEffect(() => {
        StudentService.getMyGrades().then(setGrades)
    }, [])

    return(
        <div className="p-6">
            <h1 className="text-xl mb-6">Mis Notas</h1>
            <table className="w-full border">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="p-2">Materia</th>
                        
                        <th className="p-2">1er Trim</th>
                        <th className="p-2">Prom</th>
                        
                        <th className="p-2">2do Trim</th>
                        <th className="p-2">Prom</th>
                        
                        <th className="p-2">3er Trim</th>
                        <th className="p-2">Prom</th>
                        
                        <th className="p-2">Final</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map(g => (
                        <tr key={g.curriculumId} className="border-t">
                            <td className="p-2">{g.subject}</td>
                            <td className="p-2">{g.trimesters[1].grades.map(x=>x.value).join(", ") || "-"}</td>
                            <td className="p-2">{g.trimesters[1].average ?? "-"}</td>
                            <td className="p-2">{g.trimesters[2].grades.map(x=>x.value).join(", ") || "-"}</td>
                            <td className="p-2">{g.trimesters[2].average ?? "-"}</td>
                            <td className="p-2">{g.trimesters[3].grades.map(x=>x.value).join(", ") || "-"}</td>
                            <td className="p-2">{g.trimesters[3].average ?? "-"}</td>
                            <td className="p-2 font-semibold">{g.finalGrade ?? "-"}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}