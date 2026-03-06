import { api } from "@/src/services/api/axios.instance";
import { AttendanceJustify, AttendanceMark, AttendanceOpen } from "../attendance.type";

export const AttendanceService = {
    open: async (payload: Partial<AttendanceOpen>) => {
        return api.post('/attendance/open', payload);
    },

    mark: async (payload: Partial<AttendanceMark>) => {
        return api.post('/attendance/mark', payload);
    },

    justify: async (payload: Partial<AttendanceJustify>) => {
        return api.post('/attendance/justify', payload)
    },

    getAbsents: async (studentId: number) => {
        const { data } = await api.get(`/attendance/absent/${studentId}`)
        console.log(data)
        return data;
    }
}