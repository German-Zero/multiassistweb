type Props = {
    children: React.ReactNode
}

export function TableBody({ children }: Props) {
    return (
        <tbody className="bg-white dark:bg-slate-900">
            {children}
        </tbody>
    )
}