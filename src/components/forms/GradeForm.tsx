'use client'

import { StudentGradeBook } from "@/src/modules/grades/type"

type Props = {
    students: StudentGradeBook[]
    description: string
    type: string
    grades: Record<number, number>
    loading?: boolean
    onDescriptionChange: (value: string) => void
    onTypeChange: (value: string) => void
    onGradeChange: (studentId: number, value: number) => void
    onSubmit: () => void
}

export function GradeForm({
    students,
    description,
    type,
    grades,
    loading,
    onDescriptionChange,
    onTypeChange,
    onGradeChange,
    onSubmit
}: Props) {

    return (
        <div className="space-y-4">

            <input
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Descripción"
                className="
                    w-full p-2 border rounded
                    border-slate-300 dark:border-slate-700
                "
            />

            <select
                value={type}
                onChange={(e) => onTypeChange(e.target.value)}
                className="
                    w-full p-2 border rounded
                    border-slate-300 dark:border-slate-700
                "
            >
                <option value="EXAM">Examen</option>
                <option value="RECOVERY">Recuperatorio</option>
            </select>

            <div className="max-h-64 overflow-y-auto border rounded">
                {students.map(student => (
                    <div
                        key={student.studentId}
                        className="
                            flex justify-between items-center
                            p-2 border-b last:border-none
                            border-slate-200 dark:border-slate-700
                        "
                    >
                        <span className="text-sm">
                            {student.studentName}
                        </span>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={grades[student.studentId] ?? ""}
                            onChange={(e) => {
                                const value = e.target.value
                                if (value === "") return
                                onGradeChange(
                                    student.studentId,
                                    Number(value)
                                )
                            }}
                            className="
                                w-20 p-1 border rounded
                                border-slate-300 dark:border-slate-700
                            "
                        />
                    </div>
                ))}
            </div>
            <div className="flex gap-2 pt-2">
                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="
                        px-4 py-2 rounded
                        bg-indigo-600 text-white
                        hover:bg-indigo-700
                    "
                >
                    {loading ? "Guardando..." : "Guardar notas"}
                </button>
            </div>
        </div>
    )
}