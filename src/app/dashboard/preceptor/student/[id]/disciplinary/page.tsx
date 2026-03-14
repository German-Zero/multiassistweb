'use client'

import { DisciplinaryForm } from "@/src/components/forms/DisciplinaryForm";
import { Modal } from "@/src/components/ui/Modal";
import { Table } from "@/src/components/ui/Table/Table";
import { TableBody } from "@/src/components/ui/Table/TableBody";
import { TableCell } from "@/src/components/ui/Table/TableCell";
import { TableHead } from "@/src/components/ui/Table/TableHead";
import { TableHeader } from "@/src/components/ui/Table/TableHeader";
import { TableRow } from "@/src/components/ui/Table/TableRow";
import { Disciplinary } from "@/src/modules/attendance/disciplinary.type";
import { DisciplinaryService } from "@/src/modules/attendance/services/disciplinary.service";
import { Plus, Undo2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDisciplinaryPage() {

    const { id } = useParams();

    const [records, setRecords] = useState<Disciplinary[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [openCreate, setOpenCreate] = useState(false)
    const [disciplinaryEdit, setDisciplinaryEdit] = useState<Disciplinary | null>(null)

    useEffect(() => {
        DisciplinaryService.getByStudent(Number(id))
            .then(setRecords)
            .finally(() => setLoading(false))
    }, [id])


    if (loading) {
        return (
            <section className="p-6">
                <p className="text-sm text-slate-500">
                    Cargando Sanciones...
                </p>
            </section>
        );
    }

    return (
        <section className="p-6 space-y-6">

            <header className="flex flex-col gap-5 sm:gap-0 sm:flex-row items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">
                        Acciones Disciplinarias
                    </h1>
                    <p className="text-sm text-slate-500">
                        {records.length} Registros
                    </p>    
                </div>
                <div className="flex gap-5">
                    <button
                        onClick={() => setOpenCreate(true)}
                        className="
                        flex items-center gap-2
                        bg-indigo-600 text-white
                        px-4 py-2 rounded-lg
                        hover:bg-indigo-700
                        ">
                            <Plus size={18}/>
                    </button>
                    <Link
                        href={'/dashboard/preceptor'}
                        className="
                        flex items-center gap-2
                        bg-indigo-600 text-white
                        px-4 py-2 rounded-lg
                        hover:bg-indigo-700
                        ">
                            <Undo2 size={18}/>
                    </Link>
                </div>
            </header>

            {!records.length && (
                <div className="
                    p-6 border rounded-xl
                    text-center text-slate-500
                    bg-slate-50 dark:bg-slate-900
                ">
                    Este alumno no registra sanciones.
                </div>
            )}

            {!!records.length && (

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-30">Fecha</TableHead>
                            <TableHead className="min-w-55">Motivo</TableHead>
                            <TableHead className="min-w-30">Severidad</TableHead>
                            <TableHead className="min-w-30">Acción</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {records.map(r => (
                            <TableRow key={r.id}>
                                <TableCell>{r.date}</TableCell>
                                <TableCell>{r.reason}</TableCell>
                                <TableCell className="font-semibold">
                                    <span className={`
                                        px-2 py-1 rounded text-xs font-medium
                                        ${
                                            r.severity >= 7
                                                ? "bg-red-100 text-red-700"
                                                : r.severity <= 6 
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}>
                                            {r.severity}
                                        </span>
                                </TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => setDisciplinaryEdit(r)}
                                        className="
                                            px-3 py-1.5 rounded
                                            text-sm text-white
                                            bg-indigo-600 hover:bg-indigo-700
                                    ">
                                        Editar
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Modal
                open={openCreate}
                title="Nueva Sancion"
                onClose={() => setOpenCreate(false)}
            >
                <DisciplinaryForm 
                    loading={saving}
                    onSubmit={async (e) => {
                        e.preventDefault()

                        const form = new FormData(e.currentTarget)
                        setSaving(true)
                        const res = await DisciplinaryService.create({
                            reason: form.get('reason') as string,
                            severity: Number(form.get('severity')),
                            studentId: Number(id),
                        })
                        setRecords(prev => [...prev, res])
                        setOpenCreate(false)
                        setSaving(false)
                    }}
                />
            </Modal>

            <Modal
                open={!!disciplinaryEdit}
                title="Editar Sancion"
                onClose={() => setDisciplinaryEdit(null)}
            >
                {disciplinaryEdit && (
                    <DisciplinaryForm 
                        loading={saving}
                        defaultValues={disciplinaryEdit}
                        onSubmit={async (e) => {
                            e.preventDefault()

                            const form = new FormData(e.currentTarget)
                            setSaving(true)
                            const res = await DisciplinaryService.update(disciplinaryEdit.id, {
                                reason: form.get('reason') as string,
                                severity: Number(form.get('severity')),
                            })

                            setRecords(prev =>
                                prev.map(d => d.id === res.id ? res : d)
                            )
                            setSaving(false)
                            setDisciplinaryEdit(null)
                        }}
                    />
                )}
            </Modal>
        </section>
    )
}