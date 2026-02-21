'use client'

import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function EditSchoolPage() {
    const { id } = useParams();
    const router = useRouter();
    const [school, setSchool] = useState<School | null>(null);

    useEffect(() => {
        SchoolService.getAll().then(data => {
            setSchool(data.find(s => s.id == id) || null);
        });
    }, [id]);

    if (!school) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await SchoolService.update(school.id, {
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
        <form onSubmit={handleSubmit} className="p-6 max-w-md">
            <h1 className="text-xl mb-4">Editar Escuela</h1>

            <input name="name" defaultValue={school.name} className="border p-2 mb-2 w-full" />
            <input name="province" defaultValue={school.address.provincia} className="border p-2 mb-2 w-full" />
            <input name="city" defaultValue={school.address.ciudad} className="border p-2 mb-2 w-full" />
            <input name="street" defaultValue={school.address.calle} className="border p-2 mb-2 w-full" />
            <input name="postCode" defaultValue={school.address.postCode} className="border p-2 mb-2 w-full" />

            <button className="bg-black text-white px-4 py-2">
                Guardar
            </button>
        </form>
    );
}