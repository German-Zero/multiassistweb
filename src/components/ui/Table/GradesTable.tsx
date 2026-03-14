import { StudentGrade } from "@/src/modules/student/type"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"
import { TableHead } from "./TableHead"
import { TableBody } from "./TableBody"
import { TableCell } from "./TableCell"
import { Table } from "./Table"

type Props = {
    grades: StudentGrade[]
}

export function GradesTable({ grades }: Props) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Materia</TableHead>

                    <TableHead>1er Trim</TableHead>
                    <TableHead>Prom</TableHead>

                    <TableHead>2do Trim</TableHead>
                    <TableHead>Prom</TableHead>

                    <TableHead>3er Trim</TableHead>
                    <TableHead>Prom</TableHead>

                    <TableHead>Final</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {grades.map(g => (
                    <TableRow key={g.curriculumId}>
                        <TableCell>{g.subject}</TableCell>
                        <TableCell>
                            {g.trimesters[1].grades.map(x => x.value).join(", ") || "-"}
                        </TableCell>
                        <TableCell>
                            {g.trimesters[1].average ?? "-"}
                        </TableCell>
                        <TableCell>
                            {g.trimesters[2].grades.map(x => x.value).join(", ") || "-"}
                        </TableCell>
                        <TableCell>
                            {g.trimesters[2].average ?? "-"}
                        </TableCell>
                        <TableCell>
                            {g.trimesters[3].grades.map(x => x.value).join(", ") || "-"}
                        </TableCell>
                        <TableCell>
                            {g.trimesters[3].average ?? "-"}
                        </TableCell>
                        <TableCell className="font-semibold">
                            {g.finalGrade ?? "-"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}