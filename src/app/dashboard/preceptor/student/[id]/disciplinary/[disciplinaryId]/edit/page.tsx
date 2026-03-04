'use client'

import { Disciplinary } from "@/src/modules/attendance/disciplinary.type";
import { DisciplinaryService } from "@/src/modules/attendance/services/disciplinary.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditDisciplinaryPage() {
    const { id, disciplinaryId } = useParams();
    const router = useRouter();

    const [record, setRecord] = useState<Disciplinary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        DisciplinaryService.getById(Number(disciplinaryId))
         .then(setRecord)
         .finally(() => setLoading(false));
    }, [disciplinaryId]);

    if (loading) return <p>Cargando...</p>
    if (!record) return <p>No se encontró la disciplina.</p>

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await DisciplinaryService.update(Number(disciplinaryId), {
            reason: form.get('reason') as string,
            severity: Number(form.get('severity')),
        });

        router.push(`/dashboard/preceptor/student/${id}/disciplinary`)
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 max-w-md"
        >
            <h1 className="text-xl mb-4">Editar Acción Disciplinaria</h1>

            <textarea 
                name="reason"
                defaultValue={record.reason}
                required
                className="border p-2 mb-3 w-full"
            />

            <input 
                type="number"
                name="severity"
                defaultValue={record.severity}
                min={1}
                max={10}
                required
                className="border p-2 mb-3 w-full" 
            />

            <button className="bg-black text-white px-4 py-2">
                Guardar Cambios
            </button>
        </form>
    )
}