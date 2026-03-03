'use client'

import { AttendanceService } from "@/src/modules/attendance/services/attendance.service";
import { StudentService } from "@/src/modules/student/services/student.service";
import { Student } from "@/src/modules/student/type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DivisionStudents() {
    const { divisionId } = useParams();
    const [students, setStudents] = useState<Student[]>([])
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        StudentService.findByDivision(Number(divisionId))
         .then(setStudents);
    }, [divisionId])

    const toggle = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id)
              ? prev.filter(i => i !== id)
              : [...prev, id]
        );
    };

    const openAttendance = async () => {
        await AttendanceService.open({
            date: today,
            divisionId: Number(divisionId),
        });
    };

    const markAttendance = async () => {
        await AttendanceService.mark({
            date: today,
            divisionId: Number(divisionId),
            userIds: selectedIds,
        });
    };

    return(
        <section className="p-6">
            <h1 className="text-xl mb-4">
                Division {divisionId}
            </h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={openAttendance}
                    className="bg-black text-white px-4 py-2"
                >
                    Abrir Asistencia
                </button>

                <button
                    onClick={markAttendance}
                    className="bg-green-600 text-white px-4 py-2"
                >
                    Marcar Presentes
                </button>

                <table className="w-full border">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Accion</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map(s => (
                            <tr
                                key={s.id}
                                className="border-t"
                            >
                                <td>
                                    <input 
                                      type="checkbox" 
                                      onChange={() => toggle(s.user.id)} 
                                    />
                                </td>
                                <td>{s.user?.name} {s.user?.lastname}</td>
                                <td>
                                    <Link
                                        href={`/dashboard/preceptor/student/${s.id}/attendance`}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                                    >
                                        Ver Inasistencias
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}