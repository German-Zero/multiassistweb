import { api } from "@/src/services/api/axios.instance";

interface LoginResponse {
    access_token: string;
}

export async function login(dto: { email: string; password: string; }): Promise<LoginResponse> {
    const { data } = await api.post('/auth/login', dto, { withCredentials: true });
    return data;
}