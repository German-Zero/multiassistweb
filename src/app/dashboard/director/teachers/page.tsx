'use client'

import { TeacherCard } from "@/src/components/cards/TeacherCard";
import { TeacherForm } from "@/src/components/forms/TeacherForm";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";
import { Modal } from "@/src/components/ui/Modal";
import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import { Plus, Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<User[]>([]);
    const [schools, setSchools] = useState<School[]>([])
    const [teacherToDelete, setTeacherToDelete] = useState<number | null>(null)
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [teacherEdit, setTeacherEdit] = useState<User | null>(null)

    useEffect(() => {
        Promise.all([
            UserService.getByRole('PROFESOR'),
            SchoolService.getAll()
        ])
        .then(([teachers, schools]) => {
            setTeachers(teachers)
            setSchools(schools)
        })
        .finally(() => setLoading(false));
    }, []);

    const confirmDelete = async () => {
        if (!teacherToDelete) return;
        await UserService.remove(teacherToDelete);

        setTeachers(prev =>
            prev.filter(d => d.id !== teacherToDelete)
        );
        setTeacherToDelete(null)
    };

    if (loading) return <p>Cargando...</p>

    return (
        <section className="p-6 space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl text-black font-semibold dark:text-slate-50">Docentes</h1>
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
                {teachers.map(t => (
                    <TeacherCard
                        key={t.id}
                        user={t}
                    >
                        <button
                            onClick={() => setTeacherEdit(t)}
                            className="
                            py-2 px-4 rounded transition 
                            font-medium text-white
                            bg-amber-500 hover:bg-amber-600"
                            >
                            Editar
                        </button>
                        <button
                            onClick={() => setTeacherToDelete(t.id)}
                            className="
                            py-2 px-4 rounded-md transition 
                            font-medium text-white
                            bg-red-600 hover:bg-red-700"
                            >
                            Eliminar
                        </button>
                    </TeacherCard>
                ))}
            </div>

            <ConfirmDialog 
                open={!!teacherToDelete}
                title="Eliminar Profesor"
                description="El Profesor será eliminado permanentemente."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setTeacherToDelete(null)}
            />

            <Modal
                open={openCreate}
                title="Nuevo Profesor"
                onClose={() => setOpenCreate(false)}
            >
                <TeacherForm 
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
                            userType: 'PROFESOR',
                            schoolId: Number(form.get('schoolId')),
                        })
                        setTeachers(prev => [...prev, res])
                        setOpenCreate(false)
                        setSaving(false)
                    }}
                />
            </Modal>


            <Modal
                open={!!teacherEdit}
                title="Editar Profesor"
                onClose={() => setTeacherEdit(null)}
            >
                {teacherEdit && (
                    <TeacherForm
                        schools={schools}
                        defaultValues={teacherEdit}
                        onSubmit={async (e) => {
                            e.preventDefault()

                            const form = new FormData(e.currentTarget)

                            const res = await UserService.update(teacherEdit.id, {
                                name: String(form.get('name')),
                                lastname: String(form.get('lastname')),
                                email: String(form.get('email')),
                                dni: String(form.get('dni'))
                            })

                            setTeachers(prev =>
                                prev.map(t => t.id === res.id ? res : t)
                            )

                            setTeacherEdit(null)
                        }}
                    />
                )}
            </Modal>
        </section>
    );
}