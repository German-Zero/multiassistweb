type Props = {
    children: React.ReactNode
}

export function TableRow({ children }: Props) {
    return(
        <tr className="
            border-b transition 
            border-slate-200 hover:bg-slate-50
            dark:border-slate-700 dark:hover:bg-slate-800
            cursor-default"
        >
            {children}
        </tr>
    )
}