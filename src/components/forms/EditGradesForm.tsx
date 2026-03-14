'use client'

import { EditTableGrade } from "@/src/modules/grades/type"

type Props = {
    grades: EditTableGrade[]
    setGrades: (grades: EditTableGrade[]) => void
    onSubmit: () => void
}

export function EditGradeForm({ grades, setGrades, onSubmit }: Props) {

    const handleChange = (gradeId: number, value: number) => {

        setGrades(
            grades.map(g =>
                g.gradeId === gradeId
                    ? { ...g, value }
                    : g
            )
        )
    }

    return (
        <div className="space-y-4">

            {grades.map(grade => (
                <div
                    key={grade.gradeId}
                    className="flex items-center justify-between"
                >
                    <span className="text-sm">
                        {grade.description}
                    </span>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={grade.value}
                        onChange={(e) =>
                            handleChange(
                                grade.gradeId,
                                Number(e.target.value)
                            )
                        }
                        className="
                            w-20 p-1 border rounded
                            border-slate-300 dark:border-slate-700
                        "
                    />
                </div>
            ))}
            
            <button
                onClick={onSubmit}
                className="
                    px-4 py-2 rounded
                    bg-indigo-600 text-white
                    hover:bg-indigo-700
                "
            >
                Guardar cambios
            </button>
        </div>
    )
}