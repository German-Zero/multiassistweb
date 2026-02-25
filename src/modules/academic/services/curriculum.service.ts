import { api } from "@/src/services/api/axios.instance";
import { Curriculum } from "../type";

export const CurriculumService = {
    
    getAll: async (): Promise<Curriculum[]> => {
        const { data } = await api.get('/academic-levels');
        return data;
    },
}