'use client'

import { useAuthStore } from "@/src/store/auth.store";
import { useState } from "react";
import { login } from "../services/auth.service";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/Button";

export function LoginForm() {
    const router = useRouter();
    const authLogin = useAuthStore(state => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError(null);
        setLoading(true);
        

        try {
            await login({ email, password });
            authLogin();
            router.push('/dashboard');
        } catch {
            setError('Credenciales Inválidas');
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="
                w-full max-w-md p-6 sm:p-8 rounded-xl border shadow-md space-y-5
                border-slate-200 dark:border-slate-800
                bg-white dark:bg-slate-900
            ">

            <h1 className="
                text-center text-xl font-semibold
                text-slate-800 dark:text-slate-100
            ">
                Iniciar Sesión
            </h1>

            {error && (
                <div className="
                    text-sm rounded-lg p-3 text-center border
                    bg-red-50 dark:bg-red-900/30
                    border-red-200 dark:border-red-800
                ">
                    {error}
                </div>
            )}

            <input
                type="email"
                placeholder="Email"
                className="
                    w-full p-3 rounded border transition
                    border-slate-300 dark:border-slate-700
                    bg-white dark:bg-slate-800
                    text-slate-900 dark:text-slate-100 
                    placeholder-slate-400 dark:placeholder-slate-500 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                "
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <div className="relative">

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="
                        w-full p-3 pr-12 rounded-lg border transition
                        border-slate-300 dark:border-slate-700
                        bg-white dark:bg-slate-800
                        text-slate-900 dark:text-slate-100
                        placeholder-slate-400 dark:placeholder-slate-500
                        focus:outline-none focus:ring-2
                        focus:ring-indigo-500 focus:border-indigo-500
                    "
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                        absolute right-3 top-1/2 -translate-y-1/2 text-sm transition
                        text-slate-500 hover:text-indigo-600
                        dark:text-slate-400 dark:hover:text-indigo-400
                    "
                >
                    {showPassword ? "Ocultar" : "Mostrar"}
                </button>

            </div>

            <Button
                type="submit"
                loading={loading}
                fullWidth
            >
                Entrar
            </Button>

        </form>
    )
}