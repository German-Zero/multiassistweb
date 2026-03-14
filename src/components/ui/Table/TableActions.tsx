type Props = {
    children: React.ReactNode
}

export function TableActions({ children }: Props) {
    return (
        <div className="flex gap-3 text-sm">
            {children}
        </div>
    )
}