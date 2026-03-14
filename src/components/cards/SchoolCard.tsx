import { School } from "@/src/modules/school/types"

type Props = {
    school: School
    children: React.ReactNode
}

export function SchoolCard({ school, children }: Props) {
    return (
        <div className="bg-white dark:bg-slate-800 border text-center rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h2 className="font-semibold">{school.name}</h2>
            <p className="text-sm text-slate-500">
                {school.address.calle}, {school.address.ciudad}, {school.address.provincia}
            </p>
            <div className="flex justify-evenly mt-3 pt-3">
                {children}
            </div>
        </div>
    )
}