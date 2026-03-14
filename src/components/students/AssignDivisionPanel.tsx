type AcademicLevel = {
    id: number
    name: string
}

type DivisionComplete = {
    id: number
    letter: string
    shift: string
    academicLevel: AcademicLevel
}


type Props = {
    divisions: DivisionComplete[]
    selected: number[]
    onAssign: () => void
    onDivisionChange: (id: number) => void
}

export function AssignDivisionPanel({
    divisions,
    selected,
    onAssign,
    onDivisionChange
}: Props) {

    return (
        <div className="
                p-4 border rounded-xl 
                bg-slate-50 dark:bg-slate-900 
                flex flex-col sm:flex-row sm:items-center
                items-center gap-3
        ">
            <select
                onChange={(e) => onDivisionChange(Number(e.target.value))}
                className="
                    w-full sm:w-72
                    border border-slate-300 dark:border-slate-700
                    bg-white dark:bg-slate-800 
                    rounded-lg px-3 py-2
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue=""
            >
            
            <option value="" disabled>
                Seleccionar división
            </option>
            
            {divisions.map(d => (
                <option key={d.id} value={d.id}>
                    {d.academicLevel.name}{d.letter} - {d.shift}
                </option>
            ))}
            </select>
            
            <button
                onClick={onAssign}
                disabled={selected.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-40"
            >
                Asignar {selected.length || ""}
            </button>
        </div>
    )
}
