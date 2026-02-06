'use client'

import { useState } from "react"
import { createAddress, createSchool } from "../services/school.service";

export function SchoolForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: '',
        province: '',
        city: '',
        street: '',
        postCode: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
    
        try {
            const address = await createAddress({
                province: form.province,
                city: form.city,
                street: form.street,
                postCode: form.postCode,
            });

            await createSchool({
                name: form.name,
                addressId: address.id
            });

            setForm({
                name: '',
                province: '',
                city: '',
                street: '',
                postCode: '',
            });
        } catch {
            setError('No se pudo crear la escuela');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl space-y-4 bg-neutral-900 p-6 rounded-lg"
        >

            <h1 className="text-lg font-semibold">Crear Nueva Escuela</h1>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <input 
                name="name"
                placeholder="Nombre de la Escuela"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.name}
                required 
            />

            <input
                name="province"
                placeholder="Provincia"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.province}
                required
            />

            <input 
                name="city"
                placeholder="Ciudad"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.city}
                required
            />

            <input 
                name="street"
                placeholder="Calle"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.street}
                required
            />

            <input
                name="postCode"
                placeholder="Código Postal"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.postCode}
                required
            />

            <button 
                className="bg-indigo-600 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Creando...' : 'Crear escuela'}
            </button>
        </form>
    );
}