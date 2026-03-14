'use client'

import { X } from "lucide-react"

type Props = {
    open: boolean
    title?: string
    onClose: () => void
    children: React.ReactNode
}

export function Modal({ open, title, onClose, children }: Props) {
    if (!open) return null

    return (
        <div 
            onClick={onClose}
            className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40 backdrop-blur-sm
        ">
            <div 
                onClick={(e) => e.stopPropagation()}
                className="
                w-11/12 max-w-lg rounded-xl border shadow-lg
                bg-white dark:bg-slate-900 dark:border-slate-700
            ">
                <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}