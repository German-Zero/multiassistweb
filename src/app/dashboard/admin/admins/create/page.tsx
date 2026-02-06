import { AdminRegisterForm } from "@/src/modules/admin/components/AdminRegisterForm";
import { LogoutButton } from "@/src/modules/auth/components/LogoutButton";

export default function CreateAdminPage() {
    return (
        <main>
            <AdminRegisterForm />
            <LogoutButton />
        </main>
    ) 
    
}