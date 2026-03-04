'use client'

import { DisciplinaryService } from "@/src/modules/attendance/services/disciplinary.service";
import { useParams, useRouter } from "next/navigation"

export default function NewDisciplinaryPage() {
    const { id } = useParams();
    const router = useRouter();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await DisciplinaryService.create({
            reason: form.get('reason') as string,
            severity: Number(form.get('severity')),
            studentId: Number(id),
        });

        router.push(`/dashboard/preceptor/student/${id}/disciplinary`);
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="p-6 max-w-md"
        >
            <h1 className="text-xl mb-4">Nueva Accion Disciplinaria</h1>

            <textarea
                name="reason"
                placeholder="Motivo"
                required
                className="border p-2 mb-3 w-full"
            />

            <input
                type="number"
                name="severity"
                placeholder="Severidad (1-10)"
                required
                min={1}
                max={10}
                className="border p-2 mb-3 w-full"
            />

            <button className="bg-black text-white px-4 py-2">
                Guardar
            </button>
        </form>
    )
}