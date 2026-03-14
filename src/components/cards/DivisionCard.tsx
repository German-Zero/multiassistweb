import Link from "next/link"

type Props = {
    title: string
    count: number
    href: string
}

export function DivisionCard({ title, count, href }: Props) {
    return (
        <Link
            href={href}
            className="
            group border rounded-xl p-5 transition
            bg-white dark:bg-slate-900
            border-slate-200 dark:border-slate-700
            shadow-sm hover:shadow-sm
        ">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {title}
            </h2>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
                <span className="
                    px-2 py-1 rounded-md
                    bg-indigo-100 text-indigo-700
                    dark:bg-indigo-900 dark:text-indigo-300
                ">
                    {count} Alumnos
                </span>
            </p>
        </Link> 
    )
}