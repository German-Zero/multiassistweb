import { api } from "@/src/services/api/axios.instance";
import { Teacher } from "../type";

export const TeacherService = {
    create: async (payload: Partial<Teacher>) => {
        console.log(payload);
        return api.post('/teachers', payload);
    }
}