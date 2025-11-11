import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import * as dashboardUsersRoutes from '@/routes/dashboard/users';
import { dashboard } from '@/routes';
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
import { ArrowLeft, RefreshCcw, Trash2 } from 'lucide-react';
import { SortableHeader, SortDirection } from '@/components/sortable-header';

interface User {
    id: number;
    name: string;
    email: string;
    username?: string;
    avatar?: string | null;
    is_admin: boolean;
    deleted_at: string;
}

interface TrashedProps {
    users: {
        data: User[];
        current_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
        links: { url: string; label: string; active: boolean }[];
    };
    filters: {
        search?: string | null;
        sort?: string | null;
        direction?: SortDirection | null;
    };
}

export default function Trashed({ users, filters }: TrashedProps) {
    const [confirmationDialog, setConfirmationDialog] = useState({ open: false, userId: null as number | null, userName: '' });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null as number | null, userName: '' });

    const handleSort = (column: string) => {
        let newDirection: SortDirection = 'asc';

        if (filters.sort === column) {
            newDirection = filters.direction === 'asc' ? 'desc' : 'asc';
        }

        router.get(
            dashboardUsersRoutes.trashed().url,
            {
                search: filters.search || null,
                sort: column,
                direction: newDirection,
            },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    const handleRestore = (id: number, name?: string) => {
        setConfirmationDialog({ open: true, userId: id, userName: name || '' });
    };

    const handleConfirmRestore = () => {
        if (!confirmationDialog.userId) return;
        router.patch(dashboardUsersRoutes.restore({ id: confirmationDialog.userId }).url, {}, {
            preserveState: false,
            onSuccess: () => {
                setConfirmationDialog({ open: false, userId: null, userName: '' });
            },
            onError: () => {
                alert('Error al restaurar el usuario');
            }
        });
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Usuarios', href: dashboardUsersRoutes.index().url },
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
                        <Link href={dashboardUsersRoutes.index().url}>
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
                                <TableHead>
                                    <SortableHeader
                                        label="Nombre"
                                        column="name"
                                        activeSort={filters.sort || undefined}
                                        direction={filters.direction || undefined}
                                        onSort={handleSort}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Email"
                                        column="email"
                                        activeSort={filters.sort || undefined}
                                        direction={filters.direction || undefined}
                                        onSort={handleSort}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Nombre de usuario"
                                        column="username"
                                        activeSort={filters.sort || undefined}
                                        direction={filters.direction || undefined}
                                        onSort={handleSort}
                                    />
                                </TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Eliminado en"
                                        column="deleted_at"
                                        activeSort={filters.sort || undefined}
                                        direction={filters.direction || undefined}
                                        onSort={handleSort}
                                    />
                                </TableHead>
                                <TableHead className="text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell className="font-medium">{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.username || '-'}</TableCell>
                                    <TableCell>
                                        {u.is_admin ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                Usuario
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>{new Date(u.deleted_at).toLocaleString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button size="sm" variant="ghost" onClick={() => handleRestore(u.id, u.name)}>
                                                <RefreshCcw className="h-4 w-4 mr-2" /> Restaurar
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => setDeleteDialog({ open: true, userId: u.id, userName: u.name })}>
                                                <Trash2 className="h-4 w-4 mr-2" /> Eliminar
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
                <Pagination
                    data={users}
                    appendQuery={{
                        search: filters.search || undefined,
                        sort: filters.sort || undefined,
                        direction: filters.direction || undefined,
                    }}
                />
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
                            router.delete(dashboardUsersRoutes.force_destroy({ id: deleteDialog.userId }).url, {
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
