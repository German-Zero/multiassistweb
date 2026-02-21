export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: string;
    name: string;
    middlename?: string | null;
    lastname: string;
    email: string;
    userType: 'ADMIN' | 'DIRECTOR' | 'PROFESOR' | 'PRECEPTOR';
    dni: string;
    schoolId: number;
}