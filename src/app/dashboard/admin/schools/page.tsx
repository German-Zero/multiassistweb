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

    if (loading) return <p>Cargando...</p>

    return (
        <section className="p-6 space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl text-black font-semibold dark:text-slate-50">Escuelas</h1>
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/dashboard/admin"
                        className="
                        px-4 py-2 rounded-lg transition
                        text-white bg-indigo-600 hover:bg-indigo-700
                    ">
                        <Undo2 />
                    </Link>
                    <button
                        onClick={() => setOpenCreate(true)}
                        className="
                        px-4 py-2 rounded-lg transition
                        text-white 
                        bg-indigo-600 hover:bg-indigo-700
                    ">
                        <Plus />
                    </button>
                </div>
            </header>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {schools.map(s => (
                    <SchoolCard
                        key={s.id}
                        school={s}
                    >
                        <button
                            onClick={() => setSchoolEdit(s)}
                            className="
                            py-2 px-4 rounded transition 
                            font-medium text-white
                            disabled:opacity-50 disabled:cursor-not-allowed 
                            bg-amber-500 hover:bg-amber-600"
                            >
                            Editar
                        </button>
                        <button
                            onClick={() => setSchoolToDelete(String(s.id))}
                            className="
                            py-2 px-4 rounded-md transition 
                            font-medium text-white
                            bg-red-600 hover:bg-red-700"
                            >
                            Eliminar
                        </button>
                    </SchoolCard>
                ))}
            </div>


            <ConfirmDialog 
                open={!!schoolToDelete}
                title="Eliminar Escuela"
                description="La escuela será eliminada permanentemente."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setSchoolToDelete(null)}
            />

            <Modal
                open={openCreate}
                title="Nueva Escuela"
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
                title="Editar Escuela"
                onClose={() => setSchoolEdit(null)}
            >
                {schoolEdit && (
                    <SchoolForm 
                        defaultValues={schoolEdit}
                        onSubmit={async (e) => {
                            e.preventDefault()

                            const form = new FormData(e.currentTarget)

                            const res = await SchoolService.update(String(schoolEdit.id), {
                                name: String(form.get('name')),
                                address: {
                                    provincia: String(form.get('provincia')),
                                    ciudad: String(form.get('ciudad')),
                                    calle: String(form.get('calle')),
                                    postCode: String(form.get('postCode')),
                                },
                            })
                            setSchools(prev =>
                                prev.map(s => s.id === res.id ? res : s)
                            )
                            setSchoolEdit(null)
                        }}
                    />
                )}
            </Modal>
        </section>
    )
}