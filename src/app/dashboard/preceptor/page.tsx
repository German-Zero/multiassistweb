'use client'

import { DivisionCard } from "@/src/components/cards/DivisionCard";
import { DivisionService } from "@/src/modules/academic/services/division.service";
import { Division } from "@/src/modules/academic/type";
import { LogoutButton } from "@/src/modules/auth/components/LogoutButton"
import { StudentService } from "@/src/modules/student/services/student.service";
import { useEffect, useState } from "react";

export default function DashboardPreceptor() {

    const [divisions, setDivisions] = useState<Division[]>([]);
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
        <main className="w-full gap-4 flex flex-wrap">
            <nav className="w-full h-1/12 flex justify-between items-center">
                <LogoutButton />
                <h1 className="text-xl">Divisiones</h1>
            </nav>

            <div className="w-full h-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <DivisionCard 
                    title="Sin asignar"
                    count={unassignedCount}
                    href="/dashboard/preceptor/student/unassigned"
                />
                {divisions.map(d => (
                    <DivisionCard 
                        key={d.id}
                        title={`${d.shift} - ${d.academicLevel}${d.letter}`}
                        count={d.studentCount}
                        href={`/dashboard/preceptor/student/division/${d.id}`}
                    />
                ))}
            </div>
        </main>
    )
}
