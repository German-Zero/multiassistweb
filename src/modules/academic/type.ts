export interface Curriculum {
    id: string;
    curriculumId: number
    name: string;
    weeklyHours: number
    subject: {
        name: string;
    }
    division: {
        id: string;
        letter: string;
        shift: 'MAÑANA' | 'TARDE' | 'NOCHE';
        academicLevel: {
            name: string;
        }
    }
}

export interface DivisionWithStudent {
    id: number
    letter: string
    shift: 'MAÑANA' | 'TARDE' | 'NOCHE'
    academicLevel: string
    studentCount: number
}

export interface Division {
    id: number;
    letter: string;
    shift: 'MAÑANA' | 'TARDE' | 'NOCHE';
    academicLevel: {
        name: string
    }
}
