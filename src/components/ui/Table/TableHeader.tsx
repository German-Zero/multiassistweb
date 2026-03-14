type Props = {
    children: React.ReactNode
}

export function TableHeader({ children }: Props) {
    return(
        <thead className="bg-slate-100 dark:bg-slate-800">
            {children}
        </thead>
    )
}