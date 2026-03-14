import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
}

export function Input({ label, error, className = "", ...props }: Props) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm text-slate-600 dark:text-slate-400">
                    {label}
                </label>
            )}
            <input
                {...props}
                className={`
                    w-full p-2.5 rounded-lg border transition
                    border-slate-300 bg-white text-slate-900
                    dark:border-slate-700 dark:text-slate-100 dark:bg-slate-800
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${className}
                `}
            />
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}