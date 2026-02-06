import { api } from "../api/axios.instance";

export interface MeResponse {
    id: string;
    role: 'ADMIN' | 'PRECEPTOR' | 'TEACHER';
}

export async function getUserProfile(): Promise<MeResponse> {
    const { data } = await api.get('/api/auth/me');
    return data;
}