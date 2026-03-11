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
    userType: 'ADMIN' | 'DIRECTOR' | 'PROFESOR' | 'PRECEPTOR' | 'ALUMNO' | 'INSPECTOR';
    dni: string;
    changePassword: boolean;
    schoolId: number;
}