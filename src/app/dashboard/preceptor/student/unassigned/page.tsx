'use client';

import { AssignDivisionPanel } from "@/src/components/students/AssignDivisionPanel";
import { CreateStudentModal } from "@/src/components/students/CreateStudentModal";
import { EditStudentModal } from "@/src/components/students/EditStudentModal";
import { EmptyStudents } from "@/src/components/students/EmptyStudents";
import { StudentsHeader } from "@/src/components/students/StudentsHeader";
import { UnassignedStudentsTable } from "@/src/components/students/UnassignedStudentsTable";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";
import { DivisionService } from "@/src/modules/academic/services/division.service";
import { Division } from "@/src/modules/academic/type";
import { SchoolService } from "@/src/modules/school/services/school.service";
import { School } from "@/src/modules/school/types";
import { StudentService } from "@/src/modules/student/services/student.service";
import { UserService } from "@/src/modules/users/services/user.service";
import { User } from "@/src/modules/users/types-user";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnassignedPage() {
    const [students, setStudents] = useState<User[]>([]);
    const [selectIds, setSelectIds] = useState<number[]>([]);
    const [divisionId, setDivisionId] = useState<number | null>(null);
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [schools, setSchools] = useState<School[]>([])
    const [studentToDelete, setStudentToDelete] = useState<number | null>(null)
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [studentEdit, setStudentEdit] = useState<User | null>(null)

    useEffect(() => {
            Promise.all([
                UserService.getUnassignedStudents(),
                DivisionService.getAll(),
                SchoolService.getAll(),
            ])
            .then(([students, divisions, schools]) => {
                setStudents(students)
                setDivisions(divisions)
                setSchools(schools)
            })
            .finally(() => setLoading(false))
    }, []);

    const toggleSelection = (id: number) => {
        setSelectIds(prev =>
            prev.includes(id)
                ? prev.filter(sid => sid !== id)
                : [...prev, id]
        );
    };

        const confirmDelete = async () => {
        if (!studentToDelete) return;
        await UserService.remove(studentToDelete);

        setStudents(prev =>
            prev.filter(s => s.id !== studentToDelete)
        );
        setStudentToDelete(null)
    };

    const handleAssign = async () => {
        if (!divisionId || selectIds.length === 0) return;
        await StudentService.assignDivision({
            userIds: selectIds,
            divisionId,
        });

        setStudents(prev =>
            prev.filter(s => !selectIds.includes(s.id))
        );
        setSelectIds([]);
    };

    if (loading) return <p>Cargando...</p>

    return (            
        <section className="space-y-6 p-6">

            <div className="flex items-center justify-end">
                <Link
                    href="/dashboard/preceptor"
                    className="
                    px-4 py-2 rounded-lg transition
                    text-white
                    bg-indigo-600 hover:bg-indigo-700"
                    >
                    <Undo2 />
                </Link>
            </div>

            {students.length === 0 ? (
                <EmptyStudents onCreate={() => setOpenCreate(true)} />
            ) : (
                <>

            <StudentsHeader 
                total={students.length}
                onCreate={() => setOpenCreate(true)}
                />

            <AssignDivisionPanel 
                divisions={divisions}
                selected={selectIds}
                onAssign={handleAssign}
                onDivisionChange={setDivisionId}
                />

            <UnassignedStudentsTable 
                students={students}
                selected={selectIds}
                toggle={toggleSelection}
                onEdit={setStudentEdit}
                onDelete={setStudentToDelete}
                />

            <ConfirmDialog 
                open={!!studentToDelete}
                title="Eliminar Alumno"
                description="El Alumno será eliminado permanentemente."
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setStudentToDelete(null)}
                />
            </>
            )}

            <CreateStudentModal 
                open={openCreate}
                schools={schools}
                saving={saving}
                setSaving={setSaving}
                onClose={() => setOpenCreate(false)}
                onCreated={(students) =>
                    setStudents(prev => [...prev, students])
                }
                />

            <EditStudentModal 
                student={studentEdit}
                schools={schools}
                onClose={() => setStudentEdit(null)}
                onUpdated={(updated) =>
                    setStudents(prev => 
                        prev.map(s => s.id === updated.id ? updated : s)
                    )
                }
                />

        </section>
    );
}