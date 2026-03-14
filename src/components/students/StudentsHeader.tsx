import { Plus } from "lucide-react"

type Props = {
    total: number
    onCreate: () => void
}

export function StudentsHeader({ total, onCreate }: Props) {
    return (
        <header className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 items-center justify-between">    
                <div className="text-center sm:text-start">
                    <h1 className="text-2xl font-semibold">
                        Estudiantes sin asignar
                    </h1>
                    <p className="text-sm text-gray-500">
                        {total} estudiantes pendientes
                    </p>
                </div>
                <button
                    onClick={onCreate}
                    className="
                    w-full sm:w-auto
                    flex items-center justify-center gap-2
                    bg-indigo-600 text-white
                    px-4 py-2 rounded-lg
                    hover:bg-indigo-700"
                >
                    <Plus size={16}/>
                    Nuevo
                </button>
            </div>
        </header>
    )
}