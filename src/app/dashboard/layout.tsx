export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-neutral-950 text-white">
            <aside className="w-64 bg-neutral-900 p-4">
                <h2 className="font-semibold">Admin Panel</h2>
            </aside>

            <main className="flex-1 p-8">{children}</main>
        </div>
    )
}