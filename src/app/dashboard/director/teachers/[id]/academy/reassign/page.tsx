"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import { Curriculum } from "@/src/modules/academic/type";
import { CurriculumService } from "@/src/modules/academic/services/curriculum.service";
import { TeacherService } from "@/src/modules/teacher/service/teacher.service";
import { Teacher } from "@/src/modules/teacher/type";

export default function ReassignTeacherAcademyPage() {
    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [title, setTitle] = useState("Profesor");

    useEffect(() => {
        UserService.getAll().then(users => {
            setUser(users.find(u => u.id == id) || null);
        });
    }, [id]);

    useEffect(() => {
        const loadData = async () => {

            const allCurriculums = await CurriculumService.getAll();
            const teacherCurriculums = await TeacherService.getByTeacher(Number(id));

            setCurriculums(allCurriculums);

            const assignedIds = teacherCurriculums.map(
                (c: Teacher) => c.curriculumId
            );
            setSelected(assignedIds);
        };

        loadData();
    }, [id]);

    const toggleCurriculum = (curriculumId: number) => {

        if (selected.includes(curriculumId)) {
            setSelected(selected.filter(id => id !== curriculumId));
        } else {
            setSelected([...selected, curriculumId]);
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        await TeacherService.reassign({
            userId: Number(id),
            curriculumIds: selected,
            title
        });

        router.push("/dashboard/director/teachers");
    };

    if (!user) return null;

    return (
        <div className="p-6 max-w-xl">
            <h1 className="text-xl mb-4">Reasignar Curriculums</h1>

            <h2 className="mb-4">
                {user.name} {user.lastname}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    className="border p-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título"
                />

                <div className="border p-4 rounded space-y-2 max-h-80 overflow-y-auto">

                    {curriculums.map(c => (

                        <label
                            key={c.id}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(Number(c.id))}
                                onChange={() => toggleCurriculum(Number(c.id))}
                            />

                            {c.division.academicLevel.name}{c.division.letter} {c.division.shift} - {c.weeklyHours}h {c.subject.name}
                        </label>

                    ))}

                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Guardar cambios
                </button>

            </form>
        </div>
    );
}