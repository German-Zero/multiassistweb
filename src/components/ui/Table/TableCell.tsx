type Props = {
    children: React.ReactNode
    className?: string
}

export function TableCell({ children, className }: Props) {
    return (
        <td className={`
            px-4 py-3
            text-slate-700 dark:text-slate-200
            ${className ?? ""}
            `}
        >
            {children}
        </td>
    )
}