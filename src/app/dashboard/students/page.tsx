'use client'

import { LogoutButton } from "@/src/modules/auth/components/LogoutButton";
import { StudentService } from "@/src/modules/student/services/student.service";
import { StudentAttendance, StudentGrade, StudentWarning } from "@/src/modules/student/type";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentsPage() {
    const [grades, setGrades] = useState<StudentGrade[]>([])
    const [attendances, setAttendances] = useState<StudentAttendance[]>([])
    const [warnings, setWarnings] = useState<StudentWarning[]>([])

    useEffect(() => {
        const load = async () => {
            await StudentService.getMyGrades().then(setGrades)
            await StudentService.getMyAttendances().then(setAttendances)
            await StudentService.getMyWarnings().then(setWarnings)
        }

        load();
    }, [])

    const absents = attendances.filter(a => a.status === 'ABSENT')

    return (
        <div className="p-6">
            <LogoutButton />
            <h1 className="text-xl mb-6">Dashboard</h1>
            <div className="grid grid-cols-3 gap-4">
                <Link 
                    href={'/dashboard/students/grades'}
                    className="border p-4 rounded"
                >
                    <h2 className="font-semibold">Materias</h2>
                    <p>{grades.length}</p>
                </Link>
                <Link 
                    href={'/dashboard/students/attendances'}
                    className="border p-4 rounded"
                >
                    <h2 className="font-semibold">Faltas</h2>
                    <p>{attendances.length}</p>
                </Link>
                <Link 
                    href={'/dashboard/students/warnings'}
                    className="border p-4 rounded"
                >
                    <h2 className="font-semibold">Amonestaciones</h2>
                    <p>{warnings.length}</p>
                </Link>
            </div>
        </div>
    );
}