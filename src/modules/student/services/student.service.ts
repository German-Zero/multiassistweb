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
        return data;
    },

    getMyAttendances: async () => {
        const { data } = await api.get('/attendance/me')
        return data
    },

    getMyWarnings: async () => {
        const { data } = await api.get('/disciplinary-action/me')
        return data
    },

    getMyGrades: async () => {
        const { data } = await api.get('/grade/me')
        return data
    }
};