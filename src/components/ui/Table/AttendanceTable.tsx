import { StudentAttendance } from "@/src/modules/student/type"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"
import { TableHead } from "./TableHead"
import { TableBody } from "./TableBody"
import { TableCell } from "./TableCell"
import { Table } from "./Table"

type Props = {
    attendances: StudentAttendance[]
}

export function AttendanceTable({ attendances }: Props) {


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Justificación</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {attendances.map(a => (
                    <TableRow key={a.id}>
                        <TableCell>
                            {new Date(a.day).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            {a.status}
                        </TableCell>
                        <TableCell>
                            {a.justification ?? "-"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}