import { api } from "@/src/services/api/axios.instance";

export const StudentService = {
    assignDivision: async (payload: {
        userIds: number[];
        divisionId: number;
    }) => {
        return api.post('/students/assign-division', payload)
    },
};