'use client'

type Props = {
    open: boolean
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmDialog({
    open,
    title = "Confirmar Accion",
    description = "Esta acción no se puede deshacer.",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel
}: Props) {
    if (!open) return null

    return (
        <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40 backdrop-blur-sm
        ">
            <div className="
                w-full max-w-sm p-6 space-y-4 rounded-xl border shadow-lg
                bg-white border-slate-200
                dark:bg-slate-900 dark:border-slate-700
            ">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {description}
                </p>
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={onCancel}
                        className="
                            px-4 py-2 rounded-md border
                            border-slate-300 text-slate-700 hover:bg-slate-100
                            dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800
                        ">
                            {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}