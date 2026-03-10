import { api } from "@/src/services/api/axios.instance"
import { GradeBulk, PutGrade } from "../type"

export const GradeService = {
    getByCurriculum: async (id: number) => {
        const { data } = await api.get(`/grade/curriculum/${id}`)
        return data
    },  

    bulkCreate: async (payload: GradeBulk) => {
        console.log(payload)
        return api.post("/grade/bulk", payload)
    },

    putGrades: async (payload: PutGrade) => {
        return api.put(`/grade/bulk`, payload)
    }
}