'use client'

import { CurriculumService } from "@/src/modules/academic/services/curriculum.service";
import { Curriculum } from "@/src/modules/academic/type";
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
    const [selectedCurriculums, setSelectedCurriculums] = useState<number[]>([]);
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
    }, []);

    if (!user) return null;
    if (loading) return <p>Cargando...</p>;

    const toggleCurriculum = (curriculumId: number) => {
        setSelectedCurriculums(prev =>
            prev.includes(curriculumId)
                ? prev.filter(id => id !== curriculumId)
                : [...prev, curriculumId]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedCurriculums.length === 0) {
            alert("Selecciona al menos un curriculum");
            return;
        }

        const form = new FormData(e.currentTarget);

        await TeacherService.create({
            userId: Number(user.id),
            title: String(form.get('title') ?? ''),
            curriculumIds: selectedCurriculums
        });

        router.push('/dashboard/director/teachers');
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md">
            <h1 className="text-xl mb-4">Asignación Académica</h1>
            <h2 className="text-lg mb-4">
                {user.name} {user.lastname}
            </h2>

            <input 
                name="title"
                placeholder="Título"
                required 
                className="border p-2 mb-4 w-full" 
            />

            <div className="mb-4">
                <p className="font-semibold mb-2">Seleccionar Curriculums</p>
                {curriculum.map(c => (
                    <label key={c.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectedCurriculums.includes(Number(c.id))}
                            onChange={() => toggleCurriculum(Number(c.id))}
                            className="mr-2"
                        />
                        {c.division.academicLevel.name}{c.division.letter} {c.division.shift} - {c.weeklyHours}h {c.subject.name}
                    </label>
                ))}
            </div>

            <button 
                type="submit" 
                className="bg-blue-500 text-white p-2 rounded w-full"
            >
                Asignar Curriculums
            </button>
        </form>
    );
}