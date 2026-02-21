
import { api } from "@/src/services/api/axios.instance";
import { School } from "../types";

export const SchoolService = {
    getAll: async (): Promise<School[]> => {
        const { data } = await api.get('/schools');
        return data;
    },

    create: async (payload: Partial<School>) => {
        return api.post('/schools', payload);
    },

    update: async (id: string, payload: Partial<School>) => {
        return api.put(`schools/${id}`, payload);
    },

    remove: async (id: string) => {
        return api.delete(`/schools/${id}`)
    }
}