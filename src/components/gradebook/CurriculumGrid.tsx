'use client'

import { Curriculum } from "@/src/modules/academic/type"

type Props = {
    curriculums: Curriculum[]
    onSelect: (curriculum: Curriculum) => void
}

export function CurriculumGrid({ curriculums, onSelect }: Props) {

    if (!curriculums.length) {
        return (
            <div className="text-sm text-slate-500">
                No hay materias asignadas.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {curriculums.map(c => (
                <button
                    key={c.id}
                    onClick={() => onSelect(c)}
                    className="
                        text-left
                        border rounded-xl p-4
                        bg-white dark:bg-slate-900
                        border-slate-200 dark:border-slate-700
                        hover:border-indigo-400
                        transition
                    "
                >
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {c.subject.name}
                    </p>
                    <p className="text-sm text-slate-500">
                        {c.division.academicLevel.name} {c.division.letter}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        {c.weeklyHours} hs semanales
                    </p>
                </button>
            ))}
        </div>
    )
}