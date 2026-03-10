'use client'

import { Curriculum } from "@/src/modules/academic/type";
import { GradeService } from "@/src/modules/grades/services/grades.service";
import { StudentGradeBook } from "@/src/modules/grades/type";
import { TeacherService } from "@/src/modules/teacher/service/teacher.service";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
    const [gradeBook, setGradeBook] = useState<StudentGradeBook[]>([])
    const [gradeModalOpen, setGradeModalOpen] = useState(false);
    const [selectedTrimester, setSelectedTrimester] = useState<number | null>(null);
    const [gradeInputs, setGradeInputs] = useState<Record<number, number>>({})
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editTrimester, setEditTrimester] = useState<number | null>(null)
    const [editGrades, setEditGrades] = useState<Record<number, number>>({})

    const setGrade = (studentId: number, value: number) => {
        setGradeInputs(prev => ({
            ...prev,
            [studentId]: value
        }))
    }

    const openModal = (trimester: number) => {
        setSelectedTrimester(trimester)
        setGradeModalOpen(true)
    }

    const openEditModal = (trimester: number) => {
        setEditTrimester(trimester)
        const initial: Record<number, number> = {}
        gradeBook.forEach(student => {
            const grade = student.trimesters[trimester as 1 | 2 | 3].grades[0]
            if (grade) initial[grade.id] = grade.value
        })
        setEditGrades(initial)
        setEditModalOpen(true)
    }

    useEffect(() => {
        const loadData = async () => {
            const me = await UserService.getMe();
            setUser(me);
            const teacherCurriculums =
                await TeacherService.getByTeacher(Number(me.id));
            setCurriculums(teacherCurriculums);
        };
        loadData();
    }, []);
    
    const selectCurriculum = async (curriculum: Curriculum) => {
        setSelectedCurriculum(curriculum)
        const grades = await GradeService.getByCurriculum(curriculum.curriculumId)
        setGradeBook(grades)
    };

    const submitEdit = async () => {
        const description = (document.getElementById('editDescription') as HTMLInputElement).value

        const gradesArray = Object.entries(editGrades).map(
            ([gradeId, value]) => ({
                gradeId: Number(gradeId),
                value
            })
        )

        await GradeService.putGrades({
                description,
                grades: gradesArray
            }
        )
        setEditModalOpen(false)
    }

    const submitGrades = async () => {
        if (!selectedCurriculum || !selectedTrimester || !user) return

        const description = (
            document.getElementById("description") as HTMLInputElement
        ).value

        const type = (
            document.getElementById("type") as HTMLSelectElement
        ).value

        const grades = Object.entries(gradeInputs)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([studentId, value]) => ({
                studentId: Number(studentId),
                value: Number(value)
            }))

        await GradeService.bulkCreate({
            curriculumId: Number(selectedCurriculum.curriculumId),
            teacherId: Number(user.id),
            trimesterId: selectedTrimester,
            description,
            type,
            grades
        })

        setGradeModalOpen(false)
    }
    if (!user) return <p>Cargando...</p>

    return (
        <div className="p-6">
            <h1 className="text-xl mb-6">
                Mis Materias
            </h1>
            <div className="grid grid-cols-3 gap-4 mb-8">
                {curriculums.map(c => (
                    <button
                        key={c.id}
                        onClick={() => selectCurriculum(c)}
                        className="border p-4 rounded hover:bg-gray-100 text-left"
                    >
                        <p className="font-semibold">
                            {c.subject.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {c.division.academicLevel.name} {c.division.letter}
                        </p>
                        <p className="text-xs text-gray-400">
                            {c.weeklyHours} hs semanales
                        </p>
                    </button>
                ))}
            </div>

            {selectedCurriculum && (
                <div className="mt-8">
                    <h2 className="text-lg mb-4">
                        Notas - {selectedCurriculum.subject.name}
                    </h2>

                    <table className="w-full border text-sm">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="p-2">Student</th>

                                <th className="p-2">1er Trimestre
                                    <button
                                        onClick={() => openModal(1)}
                                        className="ml-2 text-blue-600 font-bold"
                                    >
                                        [+]
                                    </button>
                                </th>
                                <th className="p-2">Promedio</th>

                                <th className="p-2">2do Trimestre
                                    <button
                                        onClick={() => openModal(2)}
                                        className="ml-2 text-blue-600 font-bold"
                                    >
                                        [+]
                                    </button>
                                </th>
                                <th className="p-2">Promedio</th>
                                
                                <th className="p-2">3er Trimestre
                                    <button
                                        onClick={() => openModal(3)}
                                        className="ml-2 text-blue-600 font-bold"
                                    >
                                        [+]
                                    </button>
                                </th>
                                <th className="p-2">Promedio</th>

                                <th className="p-2">Recuperatorio</th>
                                <th className="p-2">Nota Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gradeBook.map(student => (
                                <tr key={student.studentId} className="border-t">
                                    <td className="p-2 font-medium">{student.studentName}</td>
                                    <td className="p-2">{student.trimesters[1].grades.map(g => g.value).join(", ") || "-"}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => openEditModal(1)}
                                            className="ml-2 text-yellow-600"
                                        >
                                            ✏
                                        </button>
                                    </td>
                                    <td className="p-2">{student.trimesters[1].average ?? "-"}</td>
                                    <td className="p-2">{student.trimesters[2].grades.map(g => g.value).join(", ") || "-"}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => openEditModal(2)}
                                            className="ml-2 text-yellow-600"
                                        >
                                            ✏
                                        </button>
                                    </td>
                                    <td className="p-2">{student.trimesters[2].average ?? "-"}</td>
                                    <td className="p-2">{student.trimesters[3].grades.map(g => g.value).join(", ") || "-"}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => openEditModal(3)}
                                            className="ml-2 text-yellow-600"
                                        >
                                            ✏
                                        </button>
                                    </td>
                                    <td className="p-2">{student.trimesters[3].average ?? "-"}</td>
                                    <td className="p-2">{student.recoveryExam ?? "-"}</td>
                                    <td className="p-2">{student.finalGrade ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {gradeModalOpen && selectedTrimester && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded w-[600px]">
                        <h2 className="text-lg mb-4">
                            Cargar Notas - Trimestre {selectedTrimester}
                        </h2>

                        <input
                            placeholder="Descripcion"
                            className="border p-2 w-full mb-2"
                            id="description"
                        />

                        <select
                            id="type"
                            className="border p-2 w-full mb-4"
                        >
                            <option value="EXAM">Examen</option>
                            <option value="RECOVERY">Recuperatorio</option>
                        </select>
                        <div className="max-h-64 overflow-y-auto border">
                            {gradeBook.map(student => (
                                <div
                                    key={student.studentId}
                                    className="flex justify-between p-2 border-b"
                                >
                                    <span>{student.studentName}</span>
                                    <input
                                        type="number"
                                        min={1}
                                        max={10}
                                        className="border w-20 p-1"
                                        onChange={(e) => {
                                            const value = e.target.value
                                            if (value === "") return
                                                setGrade(student.studentId,
                                                Number(value)
                                            )
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setGradeModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={submitGrades}
                            >
                                Guardar Notas
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editModalOpen && editTrimester && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-gray-600 p-6 rounded w-[600px]">
                        <h2 className="text-lg mb-4">
                            Editar Notas - Trimestre {editTrimester}
                        </h2>

                        <input
                            id="editDescription"
                            placeholder="Descripcion corregida"
                            className="border p-2 w-full mb-4"
                        />

                        <div className="max-h-64 overflow-y-auto border">
                            {gradeBook.map(student => {
                                const grade = student.trimesters[editTrimester as 1 | 2 | 3].grades[0]
                                if (!grade) return null

                                return (
                                    <div 
                                        key={grade.id}
                                        className="flex justify-between p-2 border-b"
                                    >
                                        <span>{student.studentName}</span>

                                        <input
                                            type="number"
                                            min={1}
                                            max={10}
                                            defaultValue={grade.value}
                                            className="border w-20 p-1"
                                            onChange={(e) => 
                                                setEditGrades(prev => ({
                                                    ...prev,
                                                    [grade.id]: Number(e.target.value)
                                                }))
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={submitEdit}
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}