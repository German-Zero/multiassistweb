'use client'

import { SchoolCard } from "@/src/components/cards/SchoolCard";
import { SchoolForm } from "@/src/components/forms/SchoolForm";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";
import { Modal } from "@/src/components/ui/Modal";
import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types"
import { Plus, Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function SchoolPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [schoolToDelete, setSchoolToDelete] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [schoolEdit, setSchoolEdit] = useState<School | null>(null)

    useEffect(() => {
        SchoolService.getAll()
            .then(setSchools)
            .finally(() => setLoading(false));
    }, []);

    const confirmDelete = async () => {
        if (!schoolToDelete) return;
        await SchoolService.remove(schoolToDelete);

        setSchools(prev => 
            prev.filter(s => s.id !== Number(schoolToDelete))
        );
        setSchoolToDelete(null)
    };
    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400 animate-pulse">
                    Cargando escuelas...
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
                    Escuelas
                </h1>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/admin"
                        className="
                            flex items-center justify-center px-4 py-2 rounded-lg
                            text-white bg-slate-600 hover:bg-slate-700
                            transition
                        "
                    >
                        <Undo2 size={18}/>
                    </Link>
                    <button
                        onClick={() => setOpenCreate(true)}
                        className="
                            flex items-center gap-2 px-4 py-2 rounded-lg
                            text-white bg-indigo-600 hover:bg-indigo-700
                            transition
                        "
                    >
                        <Plus size={18}/>
                        <span className="hidden sm:inline">
                            Nueva
                        </span>
                    </button>
                </div>
            </header>
            <div className="
                grid gap-4 grid-cols-1
                sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            ">
                {schools.map(s => (
                    <SchoolCard
                        key={s.id}
                        school={s}
                    >
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSchoolEdit(s)}
                                className="
                                    flex-1 py-2 px-3 rounded-md text-sm font-medium
                                    text-white bg-amber-500 hover:bg-amber-600
                                    transition
                                "
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => setSchoolToDelete(String(s.id))}
                                className="
                                    flex-1 py-2 px-3 rounded-md text-sm font-medium
                                    text-white bg-red-600 hover:bg-red-700
                                    transition
                                "
                            >
                                Eliminar
                            </button>
                        </div>
                    </SchoolCard>
                ))}
            </div>

            <ConfirmDialog
                open={!!schoolToDelete}
                title="Eliminar escuela"
                description="La escuela será eliminada permanentemente."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setSchoolToDelete(null)}
            />


            <Modal
                open={openCreate}
                title="Nueva escuela"
                onClose={() => setOpenCreate(false)}
            >
                <SchoolForm
                    loading={saving}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const form = new FormData(e.currentTarget)
                        setSaving(true)
                        const res = await SchoolService.create({
                            name: String(form.get('name')),
                            address: {
                                provincia: String(form.get('provincia')),
                                ciudad: String(form.get('ciudad')),
                                calle: String(form.get('calle')),
                                postCode: String(form.get('postCode')),
                            },
                        })
                        setSchools(prev => [...prev, res])
                        setOpenCreate(false)
                        setSaving(false)
                    }}
                />
            </Modal>


            <Modal
                open={!!schoolEdit}
                title="Editar escuela"
                onClose={() => setSchoolEdit(null)}
            >
                {schoolEdit && (
                    <SchoolForm
                        defaultValues={schoolEdit}
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const form = new FormData(e.currentTarget)
                            const res = await SchoolService.update(
                                String(schoolEdit.id),
                                {
                                    name: String(form.get('name')),
                                    address: {
                                        provincia: String(form.get('provincia')),
                                        ciudad: String(form.get('ciudad')),
                                        calle: String(form.get('calle')),
                                        postCode: String(form.get('postCode')),
                                    },
                                }
                            )
                            setSchools(prev =>
                                prev.map(s =>
                                    s.id === res.id ? res : s
                                )
                            )
                            setSchoolEdit(null)
                        }}
                    />
                )}
            </Modal>
        </section>
    )
}