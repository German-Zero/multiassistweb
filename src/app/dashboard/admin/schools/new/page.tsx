'use client'

import { SchoolService } from "@/src/modules/school/services/school.service";
import { useRouter } from "next/navigation"

export default function NewSchoolPage() {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await SchoolService.create({
            name: String(form.get('name') ?? ''),
            address: {
                provincia: String(form.get('province') ?? ''),
                ciudad: String(form.get('city') ?? ''),
                calle: String(form.get('street') ?? ''),
                postCode: String(form.get('postCode') ?? ''),
            },
        });

        router.push('/dashboard/admin/schools');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 max-w-md"
        >
            <h1 className="text-xl mb-4">Nueva Escuela</h1>

            {['name', 'province', 'city', 'street', 'postCode'].map(field => (
                <input
                    key={field}
                    name={field}
                    placeholder={field}
                    required
                    className="border p-2 mb-2 w-full"
                />
            ))}

            <button className="bg-black text-white px-4 py-2">
                Crear
            </button>
        </form>
    )
}