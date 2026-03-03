import { api } from "@/src/services/api/axios.instance";
import { Student } from "../type";

export const StudentService = {
    assignDivision: async (payload: {
        userIds: number[];
        divisionId: number;
    }) => {
        return api.post('/students/assign-division', payload)
    },

    findByDivision: async (divisionId: number) => {
        const { data } = await api.get(`/students/division/${divisionId}`);
        return data;
    },

    getUnassigned: async (): Promise<Student[]> => {
        const { data } = await api.get('/users/unassigned');
        console.log(data)
        return data;
    }
};