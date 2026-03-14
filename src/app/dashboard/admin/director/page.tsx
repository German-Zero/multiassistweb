'use client'

import { DirectorCard } from "@/src/components/cards/DirectorCard";
import { DirectorForm } from "@/src/components/forms/DirectorForm";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";
import { Modal } from "@/src/components/ui/Modal";
import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user"
import { Plus, Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function DirectorPage() {
    const [directors, setDirectors] = useState<User[]>([]);
    const [schools, setSchools] = useState<School[]>([])
    const [directorToDelete, setDirectorToDelete] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [directorEdit, setDirectorEdit] = useState<User | null>(null)

useEffect(() => {
    Promise.all([
        UserService.getByRole('DIRECTOR'),
        SchoolService.getAll()
    ])
    .then(([directors, schools]) => {
        setDirectors(directors)
        setSchools(schools)
    })
    .finally(() => setLoading(false));
}, []);

    const confirmDelete = async () => {
        if (!directorToDelete) return;
        await UserService.remove(Number(directorToDelete));

        setDirectors(prev =>
            prev.filter(d => d.id !== Number(directorToDelete))
        );
        setDirectorToDelete(null)
    };

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400 animate-pulse">
                    Cargando directores...
                </p>
            </section>
        )
    }

    return (
        <section className="
            min-h-screen p-4 sm:p-6 lg:p-10 space-y-6
            bg-slate-50 dark:bg-slate-950
        ">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="
                    text-2xl font-semibold
                    text-slate-800 dark:text-slate-100
                ">
                    Directores
                </h1>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/admin"
                        className="
                            flex items-center justify-center px-4 py-2 rounded-lg
                            text-white bg-slate-600 hover:bg-slate-700
                            transition
                        ">
                            <Undo2 size={18}/>
                    </Link>
                    <button
                        onClick={() => setOpenCreate(true)}
                        className="
                            flex items-center gap-2 px-4 py-2 rounded-lg
                            text-white bg-indigo-600 hover:bg-indigo-700
                            transition
                        ">
                            <Plus size={18}/>
                        <span className="hidden sm:inline">
                            Nuevo
                        </span>
                    </button>
                </div>
            </header>
            <div className="
                grid gap-4
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            ">
                {directors.map(d => (
                    <DirectorCard
                        key={d.id}
                        user={d}
                    >
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDirectorEdit(d)}
                                className="
                                    flex-1 py-2 px-3 rounded-md text-sm font-medium 
                                    text-white bg-amber-500 hover:bg-amber-600
                                    transition
                                ">
                                    Editar
                            </button>
                            <button
                                onClick={() => setDirectorToDelete(String(d.id))}
                                className="
                                    flex-1 py-2 px-3 rounded-md text-sm font-medium
                                    text-white bg-red-600 hover:bg-red-700
                                    transition
                                ">
                                    Eliminar
                            </button>
                        </div>
                    </DirectorCard>
                ))}
            </div>
            <ConfirmDialog
                open={!!directorToDelete}
                title="Eliminar director"
                description="El director será eliminado permanentemente."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setDirectorToDelete(null)}
            />


            <Modal
                open={openCreate}
                title="Nuevo director"
                onClose={() => setOpenCreate(false)}
            >
                <DirectorForm
                    loading={saving}
                    schools={schools}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const form = new FormData(e.currentTarget)
                        setSaving(true)
                        const res = await UserService.create({
                            name: String(form.get('name') ?? ''),
                            lastname: String(form.get('lastname') ?? ''),
                            email: String(form.get('email') ?? ''),
                            dni: String(form.get('dni') ?? ''),
                            userType: 'DIRECTOR',
                            schoolId: Number(form.get('schoolId'))
                        })
                        setDirectors(prev => [...prev, res])
                        setOpenCreate(false)
                        setSaving(false)
                    }}
                />
            </Modal>


            <Modal
                open={!!directorEdit}
                title="Editar director"
                onClose={() => setDirectorEdit(null)}
            >
                {directorEdit && (
                    <DirectorForm
                        schools={schools}
                        defaultValues={directorEdit}
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const form = new FormData(e.currentTarget)
                            const res = await UserService.update(directorEdit.id, {
                                name: String(form.get('name')),
                                lastname: String(form.get('lastname')),
                                email: String(form.get('email')),
                                dni: String(form.get('dni'))
                            })
                            setDirectors(prev =>
                                prev.map(d =>
                                    d.id === res.id ? res : d
                                )
                            )
                            setDirectorEdit(null)
                        }}
                    />
                )}
            </Modal>
        </section>
    )
}