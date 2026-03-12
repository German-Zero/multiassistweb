import { api } from "@/src/services/api/axios.instance"
import { GradeBulk, PutGrade } from "../type"

export const GradeService = {
    getByCurriculum: async (curriculumId: number) => {
        const { data } = await api.get(`/students/curriculum/${curriculumId}`)
        console.log(data)
        return data
    },  

    bulkCreate: async (payload: GradeBulk) => {
        return api.post("/grade/bulk", payload)
    },

    putGrades: async (payload: PutGrade) => {
        return api.put(`/grade/bulk`, payload)
    }
}