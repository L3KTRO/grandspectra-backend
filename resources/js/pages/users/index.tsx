import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus, Search, Shield } from 'lucide-react';
import { FormEvent, useState } from 'react';
import * as dashboardUsersRoutes from '@/routes/dashboard/users';
import { dashboard } from '@/routes';
import { SortableHeader, SortDirection } from '@/components/sortable-header';

interface User {
    id: number;
    name: string;
    email: string;
    username?: string;
    created_at: string;
    avatar?: string | null;
    is_admin: boolean;
}

interface UsersIndexProps {
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

export default function UsersIndex({ users, filters }: UsersIndexProps) {
    const { data, setData } = useForm({
        search: filters.search || '',
    });

    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        userId: null as number | null,
        userName: '',
    });

    const handleSort = (column: string) => {
        let newDirection: SortDirection = 'asc';

        if (filters.sort === column) {
            newDirection = filters.direction === 'asc' ? 'desc' : 'asc';
        }

        router.get(
            dashboardUsersRoutes.index().url,
            {
                search: data.search || null,
                sort: column,
                direction: newDirection,
            },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    const page = usePage<{ auth?: { user?: { id: number } } }>();
    const authUser = page.props.auth?.user;

    const deleteUser = (id: number, name: string) => {
        setConfirmationDialog({
            open: true,
            userId: id,
            userName: name,
        });
    };

    const handleConfirmDelete = () => {
        if (confirmationDialog.userId) {
            router.delete(dashboardUsersRoutes.destroy({ user: confirmationDialog.userId }).url, {
                onSuccess: () => {
                    setConfirmationDialog({
                        open: false,
                        userId: null,
                        userName: '',
                    });
                },
            });
        }
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            dashboardUsersRoutes.index().url,
            {
                search: data.search || null,
                sort: filters.sort || null,
                direction: filters.direction || null,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Usuarios', active: true },
            ]}
        >
            <Head title="Gestión de Usuarios" />

            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl font-bold">Gestión de usuarios</h1>
                        <p className="text-muted-foreground">Gestiona todos los usuarios del sistema</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={dashboardUsersRoutes.trashed().url}>
                                <Trash2 className="mr-2 h-4 w-4" /> Usuarios eliminados
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={dashboardUsersRoutes.create().url}>
                                <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
                            </Link>
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre o correo..."
                            className="pl-8"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            aria-label="Buscar por nombre o correo"
                        />
                    </div>
                    <Button type="submit">Buscar</Button>
                </form>

                {users.data.length > 0 ? (
                    <>
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-14">Avatar</TableHead>
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
                                                label="Username"
                                                column="username"
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
                                        <TableHead>Rol</TableHead>
                                        <TableHead>
                                            <SortableHeader
                                                label="Fecha de creación"
                                                column="created_at"
                                                activeSort={filters.sort || undefined}
                                                direction={filters.direction || undefined}
                                                onSort={handleSort}
                                            />
                                        </TableHead>
                                        <TableHead className="text-center w-32">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="h-10 w-10 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center text-xs font-medium">
                                                    {user.avatar ? (
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <span>{(user.name || '?').charAt(0).toUpperCase()}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.username || '-'}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {user.is_admin ? (
                                                    <Badge variant="destructive" className="gap-1">
                                                        <Shield className="h-3 w-3" />
                                                        Admin
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">Usuario</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                        <Link href={dashboardUsersRoutes.show({ user: user.id }).url}>
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Ver usuario</span>
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                        <Link href={dashboardUsersRoutes.edit({ user: user.id }).url}>
                                                            <Edit className="h-4 w-4" />
                                                            <span className="sr-only">Editar usuario</span>
                                                        </Link>
                                                    </Button>
                                                    {authUser?.id !== user.id && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => deleteUser(user.id, user.name)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Eliminar usuario</span>
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination
                            data={users}
                            appendQuery={{
                                search: data.search || undefined,
                                sort: filters.sort || undefined,
                                direction: filters.direction || undefined,
                            }}
                        />
                    </>
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-muted-foreground">No hay usuarios registrados.</p>
                    </div>
                )}
            </div>

            <AlertDialog
                open={confirmationDialog.open}
                onOpenChange={(open: boolean) => setConfirmationDialog(prev => ({ ...prev, open }))}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que quieres eliminar al usuario "{confirmationDialog.userName}"? El usuario será movido a la papelera y podrá ser restaurado posteriormente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppSidebarLayout>
    );
}
