import { ButtonHTMLAttributes } from "react"

type Variant = "primary" | "danger" | "warning" | "secondary"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {

  const baseStyles =
    "py-3 px-4 rounded transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900"
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading ? "Cargando..." : children}
    </button>
  )
}