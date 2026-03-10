import { api } from "@/src/services/api/axios.instance";
import { TeacherAcademy } from "../type";

export const TeacherService = {
    create: async (payload: Partial<TeacherAcademy>) => {
        return api.post('/teachers', payload);
    },

    reassign: async(payload: Partial<TeacherAcademy>) => {
        return api.put('/teachers/reassign', payload)
    },

    getByTeacher: async(id: number) => {
        const { data } = await api.get(`/teachers/${id}`)
        return data
    },
}