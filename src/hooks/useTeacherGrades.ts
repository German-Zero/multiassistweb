import { useEffect, useState } from "react"
import { Curriculum } from "../modules/academic/type"
import { User } from "../modules/users/types-user"
import { StudentGradeBook } from "../modules/grades/type"
import { UserService } from "../modules/users/services/user.service"
import { TeacherService } from "../modules/teacher/service/teacher.service"
import { GradeService } from "../modules/grades/services/grades.service"

export function useTeacherGrades() {

    const [user, setUser] = useState<User | null>(null)
    const [curriculums, setCurriculums] = useState<Curriculum[]>([])
    const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null)
    const [gradeBook, setGradeBook] = useState<StudentGradeBook[]>([])

    useEffect(() => {
        const load = async () => {
            const me = await UserService.getMe()
            setUser(me)
            
            const data = await TeacherService.getByTeacher(Number(me.id))
            setCurriculums(data)
        }

        load()
    }, [])

    const selectCurriculum = async (curriculum: Curriculum) => {
    setSelectedCurriculum(curriculum)
    
    const grades = await GradeService.getByCurriculum(
        curriculum.curriculumId
    )

    setGradeBook(grades)
    }

    const refreshGrades = async () => {
        if (!selectedCurriculum) return

        const grades = await GradeService.getByCurriculum(
            selectedCurriculum.curriculumId
        )
        
        setGradeBook(grades)
    }

    return {
        user,
        curriculums,
        selectedCurriculum,
        gradeBook,
        selectCurriculum,
        refreshGrades
    }
}