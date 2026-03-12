'use client';

import { DivisionService } from "@/src/modules/academic/services/division.service";
import { Division } from "@/src/modules/academic/type";
import { StudentService } from "@/src/modules/student/services/student.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentPage() {

    const [division, setDivisions] = useState<Division[]>([]);
    const [counts, setCounts] = useState<Record<number, number>>({});
    const [unassignedCount, setUnassignedCount] = useState(0);

    useEffect(() => {
        const load = async () => {
            const divs = await DivisionService.getAll();
            setDivisions(divs)

            const divisionCounts: Record<number, number> = {};

            await Promise.all(
                divs.map(async (d) => {
                    const students = await StudentService.findByDivision(Number(d.id));
                    divisionCounts[Number(d.id)] = students.length
                })
            );

            const unassigned = await StudentService.getUnassigned();
            setUnassignedCount(unassigned.length);

            setCounts(divisionCounts)
        };
            load();
    }, []);

    return (
        <section className="p-6">
            <h1 className="text-xl mb-6">Divisiones</h1>

            <div className="grid grid-cols-3 gap-4">

                <Link
                    href="/dashboard/preceptor/student/unassigned"
                    className="border p-4 rounded"
                >
                    <h2>Sin asignar</h2>
                    <p>{unassignedCount} alumnos</p>
                </Link>

                {division.map(d => (
                    <Link
                        key={d.id}
                        href={`/dashboard/preceptor/student/division/${d.id}`}
                        className="border p-4 rounded"
                    >
                        <h2>{d.shift} - {d.academicLevel.name}{d.letter}</h2>
                        <p>{counts[Number(d.id)] ?? 0} alumnos</p>
                    </Link>
                ))}

            </div>
        </section>
    )
}