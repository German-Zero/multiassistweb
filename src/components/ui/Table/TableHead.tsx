type Props = {
    children?: React.ReactNode
    className?: string
}

export function TableHead({ children, className }: Props) {
    return (
        <th className={`
            px-4 py-3
            font-semibold 
            text-slate-600 
            dark:text-slate-300
            ${className ?? ""}
            `}
        >
            {children}
        </th>
    )
}