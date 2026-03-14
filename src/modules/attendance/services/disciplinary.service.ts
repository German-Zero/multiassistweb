import { api } from "@/src/services/api/axios.instance"
import { Disciplinary } from "../disciplinary.type";

export const DisciplinaryService = {
    getByStudent: async (studentId: number) => {
        const { data } = await api.get(`/disciplinary-action/by-student/${studentId}`);
        return data
    },

    getById: async(id: number) => {
        const { data } = await api.get(`/disciplinary-action/by-id/${id}`)
        console.log("ID:", id, "Data", data)
        return data;
    },

    create: async (payload: Partial<Disciplinary>) => {
        const res = await api.post('/disciplinary-action', payload)
        return res.data
    },

    update: async (id: number, payload: Partial<Disciplinary>) => {
        const res = await api.put(`/disciplinary-action/${id}`, payload)
        return res.data
    }
}