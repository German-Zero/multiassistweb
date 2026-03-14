import { api } from "@/src/services/api/axios.instance";
import { Division } from "../type";

export const DivisionService = {

    getAll: async (): Promise<Division[]> => {
        const { data } = await api.get('/divisions');
        return data;
    },

    getDivisionsWithStudents: async () => {
        const { data } = await api.get(`/divisions/with-students`);
        return data;
    },
}