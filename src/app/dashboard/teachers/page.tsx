'use client'

import { EditGradeForm } from "@/src/components/forms/EditGradesForm"
import { GradeForm } from "@/src/components/forms/GradeForm"
import { CurriculumGrid } from "@/src/components/gradebook/CurriculumGrid"
import { GradeTable } from "@/src/components/gradebook/GradeTable"
import { Modal } from "@/src/components/ui/Modal"
import { useTeacherGrades } from "@/src/hooks/useTeacherGrades"
import { LogoutButton } from "@/src/modules/auth/components/LogoutButton"
import { GradeService } from "@/src/modules/grades/services/grades.service"
import { EditTableGrade, StudentGradeBook } from "@/src/modules/grades/type"
import { useState } from "react"

export default function TeacherDashboard() {
    const {
        user,
        curriculums,
        selectedCurriculum,
        gradeBook,
        selectCurriculum
    } = useTeacherGrades()

    const [createOpen, setCreateOpen] = useState(false)
    const [editStudent, setEditStudent] = useState<StudentGradeBook | null>(null)
    const [trimester, setTrimester] = useState<number | null>(null)
    const [editableGrades, setEditableGrades] = useState<EditTableGrade[]>([])

    const [description, setDescription] = useState("")
    const [type, setType] = useState("EXAM")
    const [grades, setGrades] = useState<Record<number, number>>({})


    if (!user) return <p>Cargando...</p>

    const handleGradeChange = (studentId: number, value: number) => {
        setGrades(prev => ({
            ...prev,
            [studentId]: value
        }))
    }

    const closeModal = () => {
        setCreateOpen(false)
        setEditStudent(null)
        setTrimester(null)
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-xl mb-6">Mis Materias</h1>
                <LogoutButton />
            </div>

            <CurriculumGrid 
                curriculums={curriculums}
                onSelect={selectCurriculum}
            />

            {selectedCurriculum && (
                <GradeTable
                gradeBook={gradeBook}

                    onCreate={(trimester) => {
                        setTrimester(trimester)
                        setEditStudent(null)
                        setGrades({})
                        setDescription("")
                        setType("EXAM")
                        setCreateOpen(true)
                    }}
                    
                    onEdit={(student, trimester) => {
                        const trimesterData = student.trimesters[trimester as 1 | 2 | 3]

                        const gradesLoaded = trimesterData.grades.map(g => ({
                            gradeId: g.id,
                            description: g.description,
                            value: g.value
                        }))
                        setEditableGrades(gradesLoaded)

                        setEditStudent(student)
                        setTrimester(trimester)
                        setCreateOpen(true)
                    }}
                />
            )}
            <Modal
                open={createOpen}
                title={`Cargar Notas - Trimestre ${trimester}`}
                onClose={closeModal}
            >
                {editStudent ? (
                    <EditGradeForm 
                        grades={editableGrades}
                        setGrades={setEditableGrades}
                        onSubmit={async () => {                                            
                                const payload = {                           
                                    grades: editableGrades.map(g => ({              
                                        gradeId: g.gradeId,
                                        value: g.value              
                                    }))             
                                }               
                                console.log(payload)
                                await GradeService.putGrades(payload)               
                                closeModal()                
                            }
                        }              
                    />
                ) : (
                    <GradeForm 
                        students={gradeBook}
                        description={description}
                        type={type}
                        grades={grades}
                        onDescriptionChange={setDescription}
                        onTypeChange={setType}
                        onGradeChange={handleGradeChange}
                        onSubmit={async () => {
                            if (!selectedCurriculum || !trimester) return
                                const payload = {
                                    curriculumId: Number(selectedCurriculum.curriculumId),
                                    teacherId: user.id,
                                    trimesterId: trimester,
                                    description,
                                    type,
                                    grades: Object.entries(grades).map(([studentId, value]) => ({
                                        studentId: Number(studentId),
                                        value
                                }))
                            }
                            console.log(payload)
                            await GradeService.bulkCreate(payload)
                            closeModal()
                        }}
                    />
                )}
            </Modal>
        </div>
    )
}