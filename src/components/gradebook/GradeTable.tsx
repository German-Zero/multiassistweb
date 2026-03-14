import { StudentGradeBook } from "@/src/modules/grades/type"
import { Table } from "../ui/Table/Table"
import { TableHeader } from "../ui/Table/TableHeader"
import { TableRow } from "../ui/Table/TableRow"
import { TableHead } from "../ui/Table/TableHead"
import { TableBody } from "../ui/Table/TableBody"
import { TableCell } from "../ui/Table/TableCell"
import React, { Fragment } from "react"

type Props = {
    gradeBook: StudentGradeBook[]
    onCreate: (trimester: number) => void
    onEdit: (student: StudentGradeBook, trimester: number) => void
}

export function GradeTable({ gradeBook, onEdit, onCreate }: Props) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Alumno</TableHead>

                    <TableHead>1er Trimestre</TableHead>
                    <TableHead>Promedio</TableHead>

                    <TableHead>2do Trimestre</TableHead>
                    <TableHead>Promedio</TableHead>

                    <TableHead>3er Trimestre</TableHead>
                    <TableHead>Promedio</TableHead>

                    <TableHead>Final</TableHead>
                </TableRow>
                <TableRow>

                    <TableHead></TableHead>

                    {[1,2,3].map(t => (
                        <Fragment key={t}>
                            <TableHead>
                                <button
                                    onClick={() => onCreate(t)}
                                    className="text-indigo-600 text-sm"
                                >
                                    + Crear
                                </button>
                            </TableHead>
                            <TableHead></TableHead>
                        </Fragment>
                    ))}

                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {gradeBook.map(student => (
                    <TableRow key={student.studentId}>
                        <TableCell className="p-2 font-medium min-w-[220px]">
                            {student.studentName}
                        </TableCell>
                        {[1,2,3].map(t => {
                            const trimester = student.trimesters[t as 1 | 2 | 3]
                            return (
                                <Fragment key={t}>
                                    <TableCell className="min-w-[160px]">
                                        <div className="flex justify-between">
                                            <div>
                                                {trimester.grades.map(g => (
                                                    <div key={g.id} className="text-xs">
                                                        {g.description}: {g.value}
                                                    </div>
                                                ))}
                                            </div>
                                            {trimester.grades.length > 0 && (
                                                <button
                                                onClick={() => onEdit(student, t)}
                                                className="ml-2 text-yellow-500"
                                                >
                                                    ✏
                                                </button>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {trimester.average ?? "-"}
                                    </TableCell>
                                </Fragment>
                            )
                        })}

                        <TableCell>
                            {student.finalGrade ?? "-"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}