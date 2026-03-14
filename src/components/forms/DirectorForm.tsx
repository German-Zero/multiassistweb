import { School } from "@/src/modules/school/types";
import { User } from "@/src/modules/users/types-user";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

type DirectorFormmFields = Pick<
User,
"name" | "lastname" | "email" | "dni" | "schoolId"
>

type FieldName = "name" | "lastname" | "email" | "dni"

type Props = {
    schools: School[]
    defaultValues?: Partial<DirectorFormmFields>
    loading?: boolean
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function DirectorForm({
    schools,
    defaultValues,
    loading,
    onSubmit,
}: Props) {
    const fields: { name: FieldName; required: boolean; type?: string }[] = [
        { name: "name", required: true },
        { name: "lastname", required: true },
        { name: "email", required: true, type: "email" },
        { name: "dni", required: true },
    ]
    const labels: Record<string, string> = {
        name: 'Nombre',
        lastname: 'Apellido',
        email: 'Email',
        dni: 'DNI'
    }

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-4"
        >
            {fields.map((field) => (
                <Input 
                    key={field.name}
                    name={field.name}
                    label={labels[field.name]}
                    required={field.required}
                    type={field.type ?? "text"}
                    defaultValue={defaultValues?.[field.name]}
                />
            ))}
            <Select 
                name="schoolId"
                label="Escuela"
                required
                defaultValue={defaultValues?.schoolId?.toString()}
                options={schools.map((s) => ({
                    value: String(s.id),
                    label: s.name
                }))}
            />
            <button
                disabled={loading}
                className="
                w-full py-2.5 transition rounded-lg
                font-medium text-white
                bg-indigo-600 hover:bg-indigo-700
                disabled:opacity-50"
            >
                {loading ? "Guardando..." : "Guardar"}
            </button>
        </form>
    )
}