import { Disciplinary } from "@/src/modules/attendance/disciplinary.type"
import { Input } from "../ui/Input"

type DisciplinaryFormFields = Pick<
Disciplinary,
"reason" | "severity"
>


type Props = {
    loading: boolean
    defaultValues?: Partial<DisciplinaryFormFields>
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function DisciplinaryForm({
    defaultValues,
    loading,
    onSubmit,
}: Props) {

    return (

        <form 
            onSubmit={onSubmit}
            className="space-y-4"
        >
            <textarea 
                name="reason"
                required
                defaultValue={defaultValues?.reason}
                placeholder="Motivo"
                className="
                    w-full border rounded-lg p-2
                    border-slate-300 dark:border-slate-700
            "/>

            <Input 
                type="number"
                name="severity"
                required
                min={1}
                max={10}
                defaultValue={defaultValues?.severity}
                placeholder="Severidad (1-10)"
                className="
                    w-full border rounded-lg p-2
                    border-slate-300 dark:border-slate-700
            "/>

            <button 
                className="
                    px-4 py-2 rounded-lg
                    bg-indigo-600 text-white
                    hover:bg-indigo-700
            ">
                {loading ? "Guardando..." : "Guardar"}
            </button>
        </form>
    )
}