
'use client'

import { Table } from "@/src/components/ui/Table/Table";
import { TableBody } from "@/src/components/ui/Table/TableBody";
import { TableCell } from "@/src/components/ui/Table/TableCell";
import { TableHead } from "@/src/components/ui/Table/TableHead";
import { TableHeader } from "@/src/components/ui/Table/TableHeader";
import { TableRow } from "@/src/components/ui/Table/TableRow";
import { AttendanceService } from "@/src/modules/attendance/services/attendance.service";
import { StudentService } from "@/src/modules/student/services/student.service";
import { Student } from "@/src/modules/student/type";
import { Undo2 } from "lucide-react";
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
        <section className="p-6 space-y-6">
            
            <header className="flex justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">
                        Division {divisionId}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {students.length} Estudiantes
                    </p>
                </div>
                <div className="flex items-center justify-end">
                    <Link
                        href="/dashboard/preceptor"
                        className="
                        px-4 py-2 rounded-lg transition
                        text-white
                        bg-indigo-600 hover:bg-indigo-700"
                        >
                        <Undo2 />
                    </Link>
                </div>
            </header>

            <div className="
                flex flex-col
                gap-3 p-4 rounded-xl border
                bg-slate-50 dark:bg-slate-900
            ">
                <button
                    onClick={openAttendance}
                    className="
                        px-4 py-2 rounded-lg
                        bg-indigo-600 hover:bg-indigo-700
                        text-white
                        ">
                    Abrir Asistencia
                </button>

                <button
                    onClick={markAttendance}
                    disabled={selectedIds.length === 0}
                    className="
                        px-4 py-2 rounded-lg
                        bg-green-600 hover:bg-green-700 text-white
                        disabled:opacity-40 
                    ">
                    Marcar Presentes ({selectedIds.length})
                </button>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-10"></TableHead>
                            <TableHead className="min-w-50">Nombre</TableHead>
                            <TableHead className="min-w-55">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 accent-indigo-600"
                                        onChange={() => toggle(s.user.id)}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {s.user?.name} {s.user?.lastname}
                                </TableCell>

                                <TableCell>
                                    <div className="flex gap-2 flex-wrap">

                                        <Link
                                            href={`/dashboard/preceptor/student/${s.id}/attendance`}
                                            className="
                                                px-3 py-1.5 rounded
                                                text-sm text-white
                                                bg-yellow-500 hover:bg-yellow-600
                                        ">
                                            Inasistencias
                                        </Link>

                                        <Link
                                            href={`/dashboard/preceptor/student/${s.id}/disciplinary`}
                                            className="
                                                px-3 py-1.5 rounded
                                                text-sm text-white
                                                bg-orange-600 hover:bg-orange-700
                                        ">
                                            Disciplina
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
