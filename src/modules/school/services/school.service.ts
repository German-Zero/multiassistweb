import { api } from "@/src/services/api/axios.instance";
import { CreateAddressDto, CreateSchoolDto } from "../types";

export async function createAddress(dto: CreateAddressDto) {
    const { data } = await api.post('/addresses', dto);
    return data;
}

export async function createSchool(dto: CreateSchoolDto) {
    await api.post('/school', dto);
}