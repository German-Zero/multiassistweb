import { TrimesterData } from "../grades/type";

export interface Student {
  id: number;
  user: {
    id: number;
    name: string;
    lastname: string;
    displayName: string;
    email: string;
  };
  division: {
    id: number;
    letter: string;
    shift: string;
  };
}

export type StudentAttendance = {
  id: number
  day: string;
  status: "PRESENT" | "ABSENT" | "JUSTIFIED"
  justification: string | null
}

export type StudentWarning = {
  id: number
  reason: string
  date: string
  severity: number
}

export type StudentGrade = {
  curriculumId: number
  subject: string
  trimesters: {
    1: TrimesterData
    2: TrimesterData
    3: TrimesterData
  }
  finalGrade: number | null
}