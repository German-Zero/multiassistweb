'use client'

import { useAuthStore } from "@/src/store/auth.store";
import { useState } from "react";
import { login } from "../services/auth.service";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const router = useRouter();
    const authLogin = useAuthStore(state => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        

        try {
            await login({ email, password });
            authLogin();
            router.push('/dashboard/admin/admins/create');
        } catch {
            setError('Credenciales Inválidas');
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-neutral-900 p-8 rounded-xl shadow-xl space-y-6"
        >
            <h1 className="text-xl font-semibold text-white text-center">
                Iniciar Sesión
            </h1>

            {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />

            <input 
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
            >
                {loading ? 'Ingresando...' : 'Entrar'}
            </button>
        </form>
    )
}