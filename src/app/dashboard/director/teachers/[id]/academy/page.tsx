'use client';

import { CurriculumService } from "@/src/modules/academic/services/curriculum.service";
import { DivisionService } from "@/src/modules/academic/services/division.service";
import { Curriculum, Division } from "@/src/modules/academic/type";
import { TeacherService } from "@/src/modules/teacher/service/teacher.service";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AcademyTeachersPage() {
    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [curriculum, setCurriculum] = useState<Curriculum[]>([]);
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UserService.getAll().then(data => {
            setUser(data.find(u => u.id == id) || null);
        });
    }, [id]);
    
    useEffect(() => {
        CurriculumService.getAll()
            .then(setCurriculum)
            .finally(() => setLoading(false));
        DivisionService.getAll().then(setDivisions);
    }, []);
        
    if (!user) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        await TeacherService.create({
            userId: Number(user.id),
            title: String(form.get('title') ?? ''),
            curriculumId: Number(form.get('curriculumId') ?? ''),
            divisionId: Number(form.get('divisionId') ?? ''),
        });

        router.push('/dashboard/director/teachers');
    };

    if (loading) return <p>Cargando...</p>

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md">
            <h1 className="text-xl mb-4">Asignar a Academia</h1>
            <h2 className="text-lg mb-4">{user.name} {user.lastname}</h2>
            <input 
                name="title"
                placeholder="Título"
                required 
                className="border p-2 mb-2 w-full" 
            />

            <select name="curriculumId" className="w-full p-2 border rounded mb-2">
                <option value="">Seleccionar Nivel Académico</option>
                {curriculum.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <select name="divisionId" className="w-full p-2 border rounded mb-2">
                <option value="">Seleccionar División</option>
                {divisions.map(div => (
                    <option key={div.id} value={div.id}>
                        {div.academicLevel.name} {div.letter} - {div.shift}
                    </option>
                ))}
            </select>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Asignar
            </button>
        </form>
    );
}