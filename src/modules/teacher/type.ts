export interface Teacher {
    title: string;
    userId: number;
    curriculumId: number;
    divisionId: number;
}

export interface TeacherAcademy {
    title: string;
    userId: number;
    curriculumIds: number[];
}