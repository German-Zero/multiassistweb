import { api } from "@/src/services/api/axios.instance";
import { CreateAdminDto } from "../types";

export async function createAdmin(dto: CreateAdminDto): Promise<void> {
    await api.post('/users/admin', dto)
}