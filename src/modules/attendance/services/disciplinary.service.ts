import { api } from "@/src/services/api/axios.instance"
import { Disciplinary } from "../disciplinary.type";

export const DisciplinaryService = {
    getByStudent: async (studentId: number) => {
        const { data } = await api.get(`/disciplinary-action/by-student/${studentId}`);
        return data
    },

    getById: async(id: number) => {
        const { data } = await api.get(`/disciplinary-action/${id}`)
        return data;
    },

    create: async (payload: Partial<Disciplinary>) => {
        return api.post('/disciplinary-action', payload)
    },

    update: async (id: number, payload: Partial<Disciplinary>) => {
        return api.put(`/disciplinary-action/${id}`, payload)
    }
}