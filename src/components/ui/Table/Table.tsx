type Props = {
    children: React.ReactNode
}

export function Table({ children }: Props) {
    return (
        <div className="
            overflow-x-auto min-w-0
            w-full
            [-webkit-overflow-scrolling:touch]
            rounded-lg border
            border-slate-200 dark:border-slate-700"
        >
            <table className="min-w-150 w-full text-sm text-left">
                {children}
            </table>
        </div>
    )
}