import { api } from "../api/axios.instance";

export interface MeResponse {
    id: string;
    email: string;
    role: string;
}

export async function getUserProfile(): Promise<MeResponse> {
    const { data } = await api.get('/auth/me');
    return data;
}