import { SelectHTMLAttributes } from "react"

type Option = {
    value: string | number
    label: string
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    options: Option[]
    error?: string
}

export function Select({ label, options, error, className = "", ...props}: Props) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm text-slate-600 dark:text-slate-400">
                    {label}
                </label>
            )}
            <select
                {...props}
                className={`
                    w-full p-2.5 rounded-lg border transition
                    border-slate-300 bg-white text-slate-900
                    dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${className}
                    `}
            >
                <option value="" disabled>
                    Seleccionar Escuela
                </option>
                {options.map(option => (
                    <option
                        style={{ fontSize: '0.875rem' }}
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-500"></p>
            )}
        </div>
    )
}