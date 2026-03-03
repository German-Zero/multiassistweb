export interface AttendanceOpen {
    date: string,
    divisionId: number,
}

export interface AttendanceMark {
    date: string,
    divisionId: number,
    userIds: number[],
}

export interface AttendanceJustify {
    studentId: number,
    attendanceDayId: number,
    justification: string,
}

export interface AbsentRecord {
    id: number,
    status: string,
    justification: string | null,
    attendanceDay: {
        id: number,
        date: string,
        isOpen: boolean
    }
}