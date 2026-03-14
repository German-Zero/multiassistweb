'use client'

import { DivisionCard } from "@/src/components/cards/DivisionCard";
import { DivisionService } from "@/src/modules/academic/services/division.service";
import { DivisionWithStudent } from "@/src/modules/academic/type";
import { LogoutButton } from "@/src/modules/auth/components/LogoutButton"
import { StudentService } from "@/src/modules/student/services/student.service";
import { useEffect, useState } from "react";

export default function DashboardPreceptor() {

    const [divisions, setDivisions] = useState<DivisionWithStudent[]>([]);
    const [unassignedCount, setUnassignedCount] = useState(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {

            const divs = await DivisionService.getDivisionsWithStudents()
            setDivisions(divs)

            const unassigned = await StudentService.getUnassigned()
            setUnassignedCount(unassigned.length)
            setLoading(false)
        }
        load()
    }, [])

    if (loading)
        return (
            <main className="p-6">
                <p className="text-gray-500 animate-pulse">
                    Cargando divisiones...
                </p>
            </main>
        )

    return (
        <main className="min-h-screen p-6 flex flex-col gap-6">
            <nav className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Divisiones</h1>
                <LogoutButton />
            </nav>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DivisionCard 
                    title="Sin asignar"
                    count={unassignedCount}
                    href="/dashboard/preceptor/student/unassigned"
                />
                {divisions?.map(d => (
                    <DivisionCard 
                        key={d.id}
                        title={`${d.academicLevel.name}${d.letter} - ${d.shift}`}
                        count={d.studentCount}
                        href={`/dashboard/preceptor/student/division/${d.id}`}
                    />
                ))}
            </div>
        </main>
    )
}
