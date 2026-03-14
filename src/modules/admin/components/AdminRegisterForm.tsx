'use client'

import { useState } from "react"
import { createAdmin } from "../services/admin.service";

export function AdminRegisterForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        email: '',
        name: '',
        lastname: '',
        password: '',
        dni: 0,
        roles: "ADMIN"
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await createAdmin(form);
            setForm({
                email: '',
                name: '',
                lastname: '',
                password: '',
                dni: 0,
                roles: "ADMIN",
            });
        } catch {
            setError('No se pudo crear el administrador');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md bg-neutral-900 p-6 rounded-lg space-y-4"
        >

            <h1 className="text-lg font-semibold">
                Crear Administrador
            </h1>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <input 
                name="name"
                placeholder="Nombre"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.name}
                required
            />

            <input 
                name="lastname"
                placeholder="Apellido"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.lastname}
                required
            />

            <input 
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.email}
                required
            />

            <input 
                name="password"
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.password}
                required
            />

            <input 
                name="dni"
                type="number"
                placeholder="DNI"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                value={form.dni}
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
                {loading ? 'Creando...' : 'Crear admin'}
            </button>

        </form>
    );
}