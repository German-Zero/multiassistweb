type Props = {
    onCreate: () => void
}

export function EmptyStudents({ onCreate }: Props) {
    return (
        <section className="sm:p-6">
            <h1 className="text-xl text-center font-semibold mb-6">
                Estudiantes sin asignar
            </h1>
            <div className="
                border border-dashed border-slate-300
                dark:border-slate-700
                p-12 rounded-xl text-center
                bg-white dark:bg-slate-900
                "
            >
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    No hay estudiantes sin asignar
                </p>
                <button
                    onClick={onCreate}
                    className="
                        px-4 py-2 rounded-lg transition
                        font-medium text-white
                        bg-indigo-600 hover:bg-indigo-700
                ">
                    Agregar primer estudiante
                </button>
            </div>
        </section>
    )
}