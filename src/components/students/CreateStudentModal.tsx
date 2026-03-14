import { Modal } from "@/src/components/ui/Modal"
import { StudentForm } from "@/src/components/forms/StudentForm"
import { School } from "@/src/modules/school/types"
import { UserService } from "@/src/modules/users/services/user.service"
import { User } from "@/src/modules/users/types-user"

type Props = {
    open: boolean
    schools: School[]
    saving: boolean
    onClose: () => void
    onCreated: (student: User) => void
    setSaving: (value: boolean) => void
}

export function CreateStudentModal({
    open,
    schools,
    saving,
    onClose,
    onCreated,
    setSaving
}: Props) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        setSaving(true)

        try {
            const res = await UserService.create({
                name: String(form.get("name") ?? ""),
                lastname: String(form.get("lastname") ?? ""),
                email: String(form.get("email") ?? ""),
                dni: String(form.get("dni") ?? ""),
                userType: "ALUMNO",
                schoolId: Number(form.get("schoolId")),
            })
            
            onCreated(res)
            onClose()
        } finally {
            setSaving(false)
        }
    }
    return (
        <Modal
            open={open}
            title="Nuevo Alumno"
            onClose={onClose}
        >
        <StudentForm
            schools={schools}
            loading={saving}
            onSubmit={handleSubmit}
        />
        </Modal>
    )
}