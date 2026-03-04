export interface Curriculum {
    id: string;
    name: string;
}

export interface Division {
    id: string;
    letter: string;
    shift: 'MAÑANA' | 'TARDE' | 'NOCHE';
    academicLevel: {
        name: string;
    }
}