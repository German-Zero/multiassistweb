import { Modal } from "@/src/components/ui/Modal"
import { StudentForm } from "@/src/components/forms/StudentForm"
import { User } from "@/src/modules/users/types-user"
import { School } from "@/src/modules/school/types"
import { UserService } from "@/src/modules/users/services/user.service"

type Props = {
    student: User | null
    schools: School[]
    onClose: () => void
    onUpdated: (student: User) => void
}

export function EditStudentModal({
    student,
    schools,
    onClose,
    onUpdated
}: Props) {

    if (!student) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)
        const res = await UserService.update(student.id, {
            name: String(form.get("name")),
            lastname: String(form.get("lastname")),
            email: String(form.get("email")),
            dni: String(form.get("dni")),
        })

        onUpdated(res)
        onClose()
    }

    return (
        <Modal
            open={!!student}
            title="Editar Alumno"
            onClose={onClose}
        >
        <StudentForm
            schools={schools}
            defaultValues={student}
            onSubmit={handleSubmit}
        />
        </Modal>
    )
}