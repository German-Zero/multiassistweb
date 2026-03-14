import { User } from "@/src/modules/users/types-user"
import { Table } from "../ui/Table/Table"
import { TableHeader } from "../ui/Table/TableHeader"
import { TableRow } from "../ui/Table/TableRow"
import { TableHead } from "../ui/Table/TableHead"
import { TableBody } from "../ui/Table/TableBody"
import { TableCell } from "../ui/Table/TableCell"
import { TableActions } from "../ui/Table/TableActions"

type Props = {
    students: User[]
    selected: number[]
    toggle: (id: number) => void
    onEdit: (user: User) => void
    onDelete: (id: number) => void
}

export function UnassignedStudentsTable({
    students,
    selected,
    toggle,
    onEdit,
    onDelete
}: Props) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead className="min-w-45">Nombre</TableHead>
                    <TableHead className="min-w-55">Email</TableHead>
                    <TableHead className="min-w-40">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map(s => (
                <TableRow key={s.id}> 
                    <TableCell>
                        <input
                            type="checkbox"
                            className="w-5 h-5 accent-indigo-600"
                            checked={selected.includes(s.id)}
                            onChange={() => toggle(s.id)}
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        {s.name} {s.lastname}
                    </TableCell>
                    <TableCell>
                        {s.email}
                    </TableCell>
                    <TableCell>
                        <TableActions>
                            <button
                                onClick={() => onEdit(s)}
                                className="
                                py-2 px-4 rounded
                                font-medium text-white
                                bg-amber-500 hover:bg-amber-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(s.id)}
                                className="
                                py-2 px-4 rounded
                                font-medium text-white
                                bg-red-600 hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </TableActions>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}