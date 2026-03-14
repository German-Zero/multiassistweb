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

    getById: async (id: number): Promise<User> => {
        const { data } = await api.get(`/users/${id}`)
        return data;
    },

    getUnassignedStudents: async (): Promise<User[]> => {
        const { data } = await api.get('/users/unassigned')
        return data
    },

    create: async (payload: Partial<User>) => {
        const res = await api.post('/users/user', payload);
        return res.data
    },

    update: async (id: number, payload: Partial<User>) => {
        const res = await api.put(`/users/${id}`, payload);
        return res.data
    },

    remove: async (id: number) => {
        return api.delete(`/users/${id}`)
    },

    getMe: async (): Promise<User> => {
        const { data } = await api.get('/auth/me');
        return data;
    }
};