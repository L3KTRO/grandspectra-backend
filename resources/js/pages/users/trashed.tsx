import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Pagination } from '@/components/pagination';
import { ArrowLeft, RefreshCcw } from 'lucide-react';

interface TrashedProps {
    users: any;
}

export default function Trashed({ users }: TrashedProps) {
    const [confirmationDialog, setConfirmationDialog] = useState({ open: false, userId: null as number | null, userName: '' });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null as number | null, userName: '' });

    const handleRestore = (id: number, name?: string) => {
        setConfirmationDialog({ open: true, userId: id, userName: name || '' });
    };

    const handleConfirmRestore = () => {
        if (!confirmationDialog.userId) return;
        router.patch(route('dashboard.users.restore', confirmationDialog.userId), {}, {
            preserveState: false,
            onSuccess: () => {
                setConfirmationDialog({ open: false, userId: null, userName: '' });
            },
            onError: () => {
                // fallback simple alert for errors
                alert('Error al restaurar el usuario');
            }
        });
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Usuarios', href: route('dashboard.users.index') },
                { title: 'Eliminados', active: true },
            ]}
        >
            <Head title="Usuarios eliminados" />

            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Usuarios eliminados</h1>
                    <p className="text-muted-foreground">Listado de usuarios eliminados (soft-deleted)</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" asChild>
                        <Link href={route('dashboard.users.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                        </Link>
                    </Button>
                </div>
            </div>

            {users.data && users.data.length > 0 ? (
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Alias</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Eliminado en</TableHead>
                                <TableHead className="text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((u: any) => (
                                <TableRow key={u.id}>
                                    <TableCell className="font-medium">{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.alias}</TableCell>
                                    <TableCell>{u.role}</TableCell>
                                    <TableCell>{new Date(u.deleted_at).toLocaleString()}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button size="sm" variant="ghost" onClick={() => handleRestore(u.id, u.name)}>
                                                <RefreshCcw className="h-4 w-4 mr-2" /> Restaurar
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => setDeleteDialog({ open: true, userId: u.id, userName: u.name })}>
                                                Eliminar definitivamente
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="py-10 text-center">
                    <p className="text-muted-foreground">No hay usuarios eliminados.</p>
                </div>
            )}

            <div className="mt-4">
                <Pagination data={users} />
            </div>
            {/* Dialog de confirmación para restaurar usuario */}
            <AlertDialog open={confirmationDialog.open} onOpenChange={(open: boolean) => setConfirmationDialog(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Restaurar usuario</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Seguro que quieres restaurar al usuario "{confirmationDialog.userName}"? Esta acción devolverá el usuario al listado activo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmRestore} className="bg-green-600 text-white hover:bg-green-700 focus:ring-green-600">Restaurar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* Dialog de confirmación para eliminar definitivamente */}
            <AlertDialog open={deleteDialog.open} onOpenChange={(open: boolean) => setDeleteDialog(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar usuario definitivamente</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará el usuario de forma permanente y no podrá recuperarse. ¿Deseas continuar con "{deleteDialog.userName}"?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            if (!deleteDialog.userId) return;
                            router.delete(route('dashboard.users.force_destroy', deleteDialog.userId), {
                                onSuccess: () => setDeleteDialog({ open: false, userId: null, userName: '' }),
                                onError: () => alert('Error al eliminar definitivamente el usuario')
                            });
                        }} className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600">Eliminar definitivamente</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppSidebarLayout>
    );
}
