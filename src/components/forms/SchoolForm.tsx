import { School } from "@/src/modules/school/types";
import { Input } from "../ui/Input";

type SchoolFormFields = {
    name: string
    provincia: string
    ciudad: string
    calle: string
    postCode: string
}

type FieldName = keyof SchoolFormFields

type Props = {
    defaultValues?: School
    loading?: boolean
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function SchoolForm({
    defaultValues,
    loading,
    onSubmit
}: Props) {
    const fields: { name: FieldName; required: boolean }[] = [
        { name: "name", required: true },
        { name: "provincia", required: true },
        { name: "ciudad", required: true },
        { name: "calle", required: true },
        { name: "postCode", required: true },
    ]
    const labels: Record<FieldName, string> = {
        name: "Nombre",
        provincia: "Provincia",
        ciudad: "Ciudad",
        calle: "Calle",
        postCode: "Código Postal"
    }

    return (
        <form 
            onSubmit={onSubmit}
            className="space-y-4">
                {fields.map((field) => {
                    let defaultValue: string | undefined
                    
                    if (field.name === "name") {
                        defaultValue = defaultValues?.name
                    } else {
                        defaultValue = defaultValues?.address?.[field.name]
                    }

                return (
                    <Input 
                    key={field.name}
                    name={field.name}
                    label={labels[field.name]}
                    required={field.required}
                    defaultValue={defaultValue}
                    />
                )})}
                <button
                    disabled={loading}
                    className="
                    w-full py-2.5 transition rounded-lg
                    font-medium text-white
                    bg-indigo-600 hover:bg-indigo-700
                ">
                    {loading ? "Guardando..." : "Guardar"}
                </button>
        </form>
    )
}