
import { api } from "@/src/services/api/axios.instance";
import { School } from "../types";

export const SchoolService = {
    getAll: async (): Promise<School[]> => {
        const { data } = await api.get('/schools');
        return data;
    },

    create: async (payload: Partial<School>) => {
        const res = await api.post('/schools', payload);
        return res.data
    },

    update: async (id: string, payload: Partial<School>) => {
        const res = await api.put(`schools/${id}`, payload);
        return res.data
    },

    remove: async (id: string) => {
        return api.delete(`/schools/${id}`)
    }
}