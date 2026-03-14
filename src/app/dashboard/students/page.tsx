'use client'

import { Modal } from "@/src/components/ui/Modal";
import { AttendanceTable } from "@/src/components/ui/Table/AttendanceTable";
import { GradesTable } from "@/src/components/ui/Table/GradesTable";
import { WarningTable } from "@/src/components/ui/Table/WarningTable";
import { LogoutButton } from "@/src/modules/auth/components/LogoutButton";
import { StudentService } from "@/src/modules/student/services/student.service";
import { StudentAttendance, StudentGrade, StudentWarning } from "@/src/modules/student/type";
import { useEffect, useState } from "react";

export default function StudentsPage() {
    const [gradesOpen, setGradesOpen] = useState(false)
    const [attendancesOpen, setAttendancesOpen] = useState(false)
    const [warningOpen, setWarningsOpen] = useState(false)

    const [grades, setGrades] = useState<StudentGrade[]>([])
    const [warnings, setWarnings] = useState<StudentWarning[]>([])
    const [attendances, setAttendances] = useState<StudentAttendance[]>([])

    useEffect(() => {
        const load = async () => {
        
            const [g, a, w] = await Promise.all([
                StudentService.getMyGrades(),
                StudentService.getMyAttendances(),
                StudentService.getMyWarnings()
            ])
        
            setGrades(g)
            setAttendances(a)
            setWarnings(w)
        }

        load();
    }, [])
    
    const filteredAttendances = attendances.filter(
        a => a.status === "ABSENT" || a.status === "JUSTIFIED"
    )

    return (
        <section className="
            min-h-screen p-4 sm:p-6 lg:p-10
            space-y-6 
            bg-slate-50 dark:bg-slate-950
        ">
            <div className="flex justify-between items-center">
                <h1 className="
                    text-2xl font-semibold
                    text-slate-800 dark:text-slate-100
                ">
                    Dashboard
                </h1>

                <LogoutButton />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button 
                    onClick={() => setGradesOpen(true)}
                    className="
                        group rounded-xl border p-6
                        border-slate-200 dark:border-slate-800
                        bg-white dark:bg-slate-900
                        text-left transition
                        hover:shadow-md hover:border-indigo-500
                    ">
                    <h2 className="
                        text-lg font-semibold
                        text-slate-700 dark:text-slate-200
                    ">
                        Materias
                    </h2>
                    <p className="
                        mt-2 text-3xl font-bold
                        text-indigo-600 dark:text-indigo-400
                    ">
                        {grades.length}
                    </p>
                </button>
                <button 
                    onClick={() => setAttendancesOpen(true)}
                    className="
                        group rounded-xl border p-6
                        border-slate-200 dark:border-slate-800
                        bg-white dark:bg-slate-900
                        text-left transition
                        hover:shadow-md hover:border-indigo-500
                    ">
                    <h2 className="
                        text-lg font-semibold
                        text-slate-700 dark:text-slate-200
                    ">
                        Asistencias
                    </h2>
                    <p className="
                        mt-2 text-3xl font-bold
                        text-indigo-600 dark:text-indigo-400
                    ">
                        {filteredAttendances.length}
                    </p>
                </button>
                <button 
                    onClick={() => setWarningsOpen(true)}
                    className="
                        group rounded-xl border p-6
                        border-slate-200 dark:border-slate-800
                        bg-white dark:bg-slate-900
                        text-left transition
                        hover:shadow-md hover:border-indigo-500
                    ">
                    <h2 className="
                        text-lg font-semibold
                        text-slate-700 dark:text-slate-200
                    ">
                        Amonestaciones
                    </h2>
                    <p className="
                        mt-2 text-3xl font-bold
                        text-indigo-600 dark:text-indigo-400
                    ">
                        {warnings.length}
                    </p>
                </button>
            </div>

            <Modal
                open={gradesOpen}
                title="Mis Notas"
                onClose={() => setGradesOpen(false)}
            >
                <GradesTable grades={grades} />
            </Modal>

            <Modal
                open={attendancesOpen}
                title="Asistencias"
                onClose={() => setAttendancesOpen(false)}
            >
                <AttendanceTable attendances={filteredAttendances} />
            </Modal>

            <Modal
                open={warningOpen}
                title="Amonestaciones"
                onClose={() => setWarningsOpen(false)}
            >
                <WarningTable warnings={warnings} />
            </Modal>
        </section>
    );
}