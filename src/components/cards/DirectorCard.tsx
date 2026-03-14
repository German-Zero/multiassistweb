import { User } from "@/src/modules/users/types-user"

type Props = {
    user: User
    children: React.ReactNode
}

export function DirectorCard({ user, children }: Props) {
    return (
        <div className="bg-white dark:bg-slate-800 border text-center rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="test-sm text-slate-500">{user.email}</p>
            <div className="flex justify-evenly mt-3 pt-3">
                {children}
            </div>
        </div>
    )
}