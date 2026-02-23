import { api } from "@/src/services/api/axios.instance";
import { User } from "../types-user";

export const UserService = {
    getAll: async (): Promise<User[]> => {
        const { data } = await api.get('/users');
        return data;
    },

    getByRole: async (role: User['userType']): Promise<User[]> => {
        const { data } = await api.get(`/users/by-role/${role}`);
        return data;
    },

    create: async (payload: Partial<User>) => {
        return api.post('/users/user', payload);
    },

    update: async (id: string, payload: Partial<User>) => {
        return api.put(`/users/${id}`, payload);
    },

    remove: async (id: string) => {
        return api.delete(`/users/${id}`)
    },

    getMe: async (): Promise<User> => {
        const { data } = await api.get('/auth/me');
        return data;
    }
};