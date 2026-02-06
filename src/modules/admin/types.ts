export interface CreateAdminDto {
    email: string;
    name: string;
    middlename?: string;
    lastname: string;
    password: string;
    dni: number;
    roles: string;
}