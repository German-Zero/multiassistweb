import { StudentWarning } from "@/src/modules/student/type"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"
import { TableHead } from "./TableHead"
import { TableCell } from "./TableCell"
import { TableBody } from "./TableBody"
import { Table } from "./Table"

type Props = {
    warnings: StudentWarning[]
}

export function WarningTable({ warnings }: Props) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Motive</TableHead>
                    <TableHead>Severidad</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {warnings.map(w => (
                    <TableRow key={w.id}>
                        <TableCell>
                            {new Date(w.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            {w.reason}
                        </TableCell>
                        <TableCell>
                            {w.severity}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}