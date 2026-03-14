'use client'

import { PreceptorCard } from "@/src/components/cards/PreceptorCard";
import { PreceptorForm } from "@/src/components/forms/PreceptorForm";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";
import { Modal } from "@/src/components/ui/Modal";
import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import { Plus, Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreceptorPage() {
    const [preceptors, setPreceptors] = useState<User[]>([]);
    const [schools, setSchools] = useState<School[]>([])
    const [preceptorToDelete, setPreceptorToDelete] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [preceptorEdit, setPreceptorEdit] = useState<User | null>(null)
    
    useEffect(() => {
        Promise.all([
            UserService.getByRole('PRECEPTOR'),
            SchoolService.getAll()
        ])
        .then(([preceptors, schools]) => {
            setPreceptors(preceptors)
            setSchools(schools)
        })
        .finally(() => setLoading(false));
    }, []);

    const confirmDelete = async () => {
        if (!preceptorToDelete) return;
        await UserService.remove(Number(preceptorToDelete));

        setPreceptors(prev =>
            prev.filter(p => p.id !== Number(preceptorToDelete))
        );
        setPreceptorToDelete(null)
    };

    if (loading) return <p>Cargando...</p>
    
    return (
        <section className="p-6 space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl text-black font-semibold dark:text-slate-50">Preceptor</h1>
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/dashboard/director"
                        className="
                        px-4 py-2 rounded-lg transition
                        text-white
                        bg-indigo-600 hover:bg-indigo-700"
                        >
                        <Undo2 />
                    </Link>
                    <button
                        onClick={() => setOpenCreate(true)} 
                        className="
                        px-4 py-2 rounded-lg transition
                        text-white
                        bg-indigo-600 hover:bg-indigo-700"
                        >
                        <Plus />
                    </button>
                </div>
            </header>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {preceptors.map(p => (
                    <PreceptorCard
                        key={p.id}
                        user={p}
                    >
                        <button
                            onClick={() => setPreceptorEdit(p)}
                            className="
                            py-2 px-4 rounded transition 
                            font-medium text-white
                            bg-amber-500 hover:bg-amber-600
                            ">
                            Editar
                        </button>
                        <button
                            onClick={() => setPreceptorToDelete(String(p.id))}
                            className="
                            py-2 px-4 rounded-md transition 
                            font-medium text-white
                            bg-red-600 hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </PreceptorCard>
                ))}
            </div>
            
            
            <ConfirmDialog
                open={!!preceptorToDelete}
                title="Eliminar Director"
                description="El director será eliminado permanentemente."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setPreceptorToDelete(null)}
            />

            
            <Modal
                open={openCreate}
                title="Nuevo Prceptor"
                onClose={() => setOpenCreate(false)}
            >
                <PreceptorForm 
                    loading={saving}
                    schools={schools}
                    onSubmit={async (e) => {
                        e.preventDefault()

                        const form = new FormData(e.currentTarget)
                        setSaving(true)
                        const res = await UserService.create({
                            name: String(form.get('name')),
                            lastname: String(form.get('lastname')),
                            email: String(form.get('email')),
                            dni: String(form.get('dni')),
                            userType: 'PRECEPTOR',
                            schoolId: Number(form.get('schoolId')),
                        })
                        setPreceptors(prev => [...prev, res])
                        setOpenCreate(false)
                        setSaving(false)
                    }}
                />
            </Modal>


            <Modal
                open={!!preceptorEdit}
                title="Editar Profesor"
                onClose={() => setPreceptorEdit(null)}
            >
                {preceptorEdit && (
                    <PreceptorForm
                        schools={schools}
                        defaultValues={preceptorEdit}
                        onSubmit={async (e) => {
                            e.preventDefault()

                            const form = new FormData(e.currentTarget)

                            const res = await UserService.update(preceptorEdit.id, {
                                name: String(form.get('name')),
                                lastname: String(form.get('lastname')),
                                email: String(form.get('email')),
                                dni: String(form.get('dni'))
                            })

                            setPreceptors(prev =>
                                prev.map(p => p.id === res.id ? res : p)
                            )

                            setPreceptorEdit(null)
                        }}
                    />
                )}
            </Modal>
        </section>
    );
}