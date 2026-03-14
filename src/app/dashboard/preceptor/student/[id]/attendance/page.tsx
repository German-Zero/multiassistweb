'use client'

import { AttendanceService } from "@/src/modules/attendance/services/attendance.service";
import { AbsentRecord } from "@/src/modules/attendance/attendance.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/src/components/ui/Table/Table";
import { TableHeader } from "@/src/components/ui/Table/TableHeader";
import { TableRow } from "@/src/components/ui/Table/TableRow";
import { TableHead } from "@/src/components/ui/Table/TableHead";
import { TableBody } from "@/src/components/ui/Table/TableBody";
import { TableCell } from "@/src/components/ui/Table/TableCell";

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

    if (loading) {
        return (
            <section className="p-6">
                <p className="text-sm text-slate-600">Cargando Inasistencias...</p>
            </section>
        ) 
    }

    return (
        <section className="p-6 space-y-6">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold">
                    Inasistencias Del Alumno
                </h1>
                <p className="text-sm text-slate-500">
                    {records.length} Registros
                </p>
            </header>

            {!records.length && (
                <div className="
                    p-6 border rounded-xl
                    text-center text-slate-500
                    bg-slate-50 dark:bg-slate-900
                ">
                    No tiene Inasistencias
                </div>
            )}

            {!!records.length && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-30">Fecha</TableHead>
                            <TableHead className="min-w-35">Estado</TableHead>
                            <TableHead className="min-w-30">Justificacion</TableHead>
                            <TableHead className="min-w-30">Acción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map(r => {

                            const isJustified = !!r.justification;

                            return (
                                <TableRow key={r.id}>
                                    <TableCell>
                                        {r.attendanceDay.date}
                                    </TableCell>

                                    <TableCell className={`font-semibold ${
                                        isJustified
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}>
                                        {isJustified
                                            ? "JUSTIFICADA"
                                            : r.status}
                                    </TableCell>

                                    <TableCell>
                                        {isJustified
                                            ? r.justification
                                            : "Sin Justificar"}
                                    </TableCell>

                                    <TableCell>
                                        {!isJustified && !r.attendanceDay.isOpen && (
                                            <button
                                                onClick={() => handleJustify(
                                                    r.attendanceDay.id,
                                                    Number(id)
                                                )}
                                                className="
                                                    px-3 py-1.5 rounded text-sm
                                                    bg-indigo-600 text-white
                                                    hover:bg-indigo-700
                                            ">
                                                Justificar
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </section>
    )
}
