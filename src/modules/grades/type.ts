export type Grade = {
    id: number
    description: string
    value: number
}

export type EditTableGrade = {
    gradeId: number
    description: string
    value: number
}

export type TrimesterData = {
    grades: Grade[]
    average: number | null
}

export type StudentGradeBook = {
    studentId: number
    studentName: string
    trimesters: {
        1: TrimesterData
        2: TrimesterData
        3: TrimesterData
    }
    recoveryExam: number | null
    finalGrade: number | null
}

export type GradeBulk = {
    curriculumId: number
    teacherId: number
    trimesterId: number
    description: string
    type: string
    grades: {
        studentId: number
        value: number
    }[]
}

export type PutGrade = {
    grades: {
        gradeId: number
        value: number
    }[]
}