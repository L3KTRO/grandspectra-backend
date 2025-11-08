import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
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
import { SortableHeader } from '@/components/sortable-header';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useState, useCallback, FormEvent } from 'react';
// Flash messages are handled globally via <FlashMessages /> in the layout

interface User {
    id: number;
    name: string;
    email: string;
    alias: string;
    created_at: string;
    role: string;
    avatar?: string | null;
    age_status_label?: string | null;
    is_minor_for_reference?: boolean;
    current_plan_label?: string | null;
    current_plan_value?: string | null;
    current_plan_paid_at?: string | null;
    has_current_plan?: boolean;
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
        role: string | null;
        start_date: string | null;
        end_date: string | null;
        has_active_subscription?: boolean | null;
        age_filter?: string | null;
    };
    roles: { label: string; value: string }[];
    flash?: {
        success?: string;
        error?: string;
    };
    sort?: string;
    direction?: 'asc' | 'desc';
    currentSeason?: {
        id: number;
        name: string;
        start_date: string | null;
        end_date: string | null;
    } | null;
}

export default function UsersIndex({ users, filters, roles, flash, sort = 'created_at', direction = 'desc', currentSeason }: UsersIndexProps) {
    console.log(users)
    
    const { data, setData } = useForm({
        search: filters.search || '',
        role: filters.role ?? '__all', // sentinel para "todos"
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        has_active_subscription: filters.has_active_subscription ? 1 : 0,
        age_filter: filters.age_filter || '__all', // sentinel para sin filtro
    });

    const getSubscriptionBadgeClasses = useCallback((level?: string | null) => {
        switch (level) {
            case 'premium':
                return 'bg-yellow-100 text-yellow-800';
            case 'extra':
                return 'bg-blue-100 text-blue-800';
            case 'basic':
                return 'bg-gray-100 text-gray-800';
            case 'free':
                return 'bg-slate-100 text-slate-700';
            case 'scouter':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }, []);

    // Valor combinado para el select unificado.
    // Reglas:
    //  - Si age_filter activo => player_<segmento>
    //  - Si sólo role (distinto de __all) => role:<role>
    //  - En otro caso => __all
    const combinedSelectValue = useMemo(() => {
        if (data.age_filter && data.age_filter !== '__all') {
            return `player_${data.age_filter}`; // player_over18 | player_under18 | player_influencers
        }
        if (data.role && data.role !== '__all') {
            return `role:${data.role}`;
        }
        return '__all';
    }, [data.role, data.age_filter]);

    const handleCombinedChange = (value: string) => {
        if (value === '__all') {
            setData('role', '__all');
            setData('age_filter', '__all');
            router.get(
                route('dashboard.users.index'),
                { search: data.search || null, role: null, age_filter: null, sort, direction },
                { preserveState: true, replace: true, preserveScroll: true }
            );
            return;
        }
        if (value.startsWith('player_')) {
            // Segmentos especiales: forzamos role=player y age_filter derivado
            const seg = value.replace('player_', ''); // over18 | under18 | influencers
            setData('role', 'player');
            setData('age_filter', seg);
            router.get(
                route('dashboard.users.index'),
                { search: data.search || null, role: 'player', age_filter: seg, sort, direction },
                { preserveState: true, replace: true, preserveScroll: true }
            );
            return;
        }
        if (value.startsWith('role:')) {
            const role = value.split(':')[1];
            setData('role', role);
            setData('age_filter', '__all');
            router.get(
                route('dashboard.users.index'),
                { search: data.search || null, role, age_filter: null, sort, direction },
                { preserveState: true, replace: true, preserveScroll: true }
            );
            return;
        }
    };

    // Estado para el modal de confirmación
    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        userId: null as number | null,
        userName: '',
    });

    // Los mensajes flash se muestran desde el layout global (FlashMessages).
    // Evitamos manejarlos localmente para que no aparezcan duplicados.
    useEffect(() => {
        // noop: kept intentionally to preserve potential dependency usage and future local effects
    }, []);

    // Usuario autenticado (compartido desde Inertia) sin usar any
    const page = usePage<{ auth?: { user?: { id: number } } }>();
    const authUser = page.props.auth?.user as { id: number } | undefined;

    // Crear un mapa de roles para búsqueda rápida
    const roleMap = useMemo(() => {
        const map: Record<string, string> = {};
        roles.forEach((r) => {
            map[r.value] = r.label;
        });
        return map;
    }, [roles]);

    const deleteUser = (id: number, name: string) => {
        setConfirmationDialog({
            open: true,
            userId: id,
            userName: name,
        });
    };

    const handleConfirmDelete = () => {
        if (confirmationDialog.userId) {
            router.delete(route('dashboard.users.destroy', confirmationDialog.userId), {
                onSuccess: () => {
                    setConfirmationDialog({
                        open: false,
                        userId: null,
                        userName: '',
                    });
                },
                onError: () => {
                    console.error('Error al eliminar usuario');
                }
            });
        }
    };

    const handleSort = useCallback((key: 'name' | 'alias' | 'email' | 'role' | 'created_at') => {
        const nextDirection = sort === key ? (direction === 'asc' ? 'desc' : 'asc') : 'asc';
        router.get(
            route('dashboard.users.index'),
            {
                search: data.search || null,
                role: data.role && data.role !== '__all' ? data.role : null,
                start_date: data.start_date || null,
                end_date: data.end_date || null,
                has_active_subscription: data.has_active_subscription ? 1 : null,
                age_filter: data.age_filter && data.age_filter !== '__all' ? data.age_filter : null,
                sort: key,
                direction: nextDirection,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    }, [sort, direction, data.search, data.role, data.start_date, data.end_date]);

    const handleExplicitSort = useCallback((key: 'name' | 'alias' | 'email' | 'role' | 'created_at', dir: 'asc' | 'desc') => {
        router.get(
            route('dashboard.users.index'),
            {
                search: data.search || null,
                role: data.role && data.role !== '__all' ? data.role : null,
                start_date: data.start_date || null,
                end_date: data.end_date || null,
                has_active_subscription: data.has_active_subscription ? 1 : null,
                age_filter: data.age_filter && data.age_filter !== '__all' ? data.age_filter : null,
                sort: key,
                direction: dir,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    }, [data.search, data.role, data.start_date, data.end_date]);

    // Buscar por nombre o email
    const handleSearchSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        router.get(
            route('dashboard.users.index'),
            {
                search: data.search || null,
                role: data.role && data.role !== '__all' ? data.role : null,
                start_date: data.start_date || null,
                end_date: data.end_date || null,
                has_active_subscription: data.has_active_subscription ? 1 : null,
                age_filter: data.age_filter && data.age_filter !== '__all' ? data.age_filter : null,
                sort,
                direction,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    }, [data.search, data.role, data.start_date, data.end_date, sort, direction]);

    const applyActiveSubFilter = useCallback((checked: boolean | 'indeterminate') => {
        const enabled = checked === true;
        setData('has_active_subscription', enabled ? 1 : 0);
        router.get(
            route('dashboard.users.index'),
            {
                search: data.search || null,
                role: data.role && data.role !== '__all' ? data.role : null,
                start_date: data.start_date || null,
                end_date: data.end_date || null,
                has_active_subscription: enabled ? 1 : null,
                age_filter: data.age_filter && data.age_filter !== '__all' ? data.age_filter : null,
                sort,
                direction,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    }, [data.search, data.role, data.start_date, data.end_date, sort, direction, setData]);

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Usuarios', active: true },
            ]}
        >
            <Head title="Gestión de Usuarios" />

            <div className="flex items-center justify-between gap-4 flex-wrap md:flex-col xl:flex-row">
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold">Gestión de usuarios</h1>
                    <p className="text-muted-foreground">Gestiona todos los usuarios del sistema</p>
                </div>
                <div className="w-full max-w-md flex-wrap">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 flex-col">
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre o correo..."
                                className="pl-8"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                aria-label="Buscar por nombre o correo"
                            />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <label className="flex items-center gap-2 text-sm whitespace-nowrap">
                                <Checkbox
                                    checked={Boolean(data.has_active_subscription)}
                                    onCheckedChange={applyActiveSubFilter}
                                />
                                Suscripción activa
                            </label>

                            {/* Select combinado rol / segmento */}
                            <div className="w-48">
                                <label htmlFor="role_segment" className="sr-only">Rol / Segmento</label>
                                <Select value={combinedSelectValue} onValueChange={handleCombinedChange}>
                                    <SelectTrigger id="role_segment" className="w-full">
                                        <SelectValue placeholder="Rol / Segmento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="__all">Todos</SelectItem>
                                        {/* Roles existentes (excepto player duplicado) */}
                                        {roles.filter(r => r.value !== 'player').map(r => (
                                            <SelectItem key={r.value} value={`role:${r.value}`}>{r.label}</SelectItem>
                                        ))}
                                        <SelectItem value="role:player">Jugador (todos)</SelectItem>
                                        <SelectItem value="player_over18">Jugador +18</SelectItem>
                                        <SelectItem value="player_under18">Jugador -18</SelectItem>
                                        <SelectItem value="player_influencers">Influencers</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* El botón Buscar se ha eliminado porque el select dispara la búsqueda automáticamente */}

                        </div>
                    </form>
                </div>
                <div className="flex items-center gap-2">
                    <Button asChild variant="secondary">
                        <Link href={route('dashboard.users.trashed')}>
                            Restaurar usuarios
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('dashboard.users.create')}>
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
                        </Link>
                    </Button>
                </div>
            </div>

            {users.data.length > 0 ? (
                <div className="m-6 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-14">Avatar</TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Nombre"
                                        column="name"
                                        activeSort={sort}
                                        direction={direction}
                                        onSort={handleSort}
                                        onExplicitSort={handleExplicitSort}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Alias"
                                        column="alias"
                                        activeSort={sort}
                                        direction={direction}
                                        onSort={handleSort}
                                        onExplicitSort={handleExplicitSort}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Email"
                                        column="email"
                                        activeSort={sort}
                                        direction={direction}
                                        onSort={handleSort}
                                        onExplicitSort={handleExplicitSort}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Rol"
                                        column="role"
                                        activeSort={sort}
                                        direction={direction}
                                        onSort={handleSort}
                                        onExplicitSort={handleExplicitSort}
                                    />
                                </TableHead>
                                <TableHead className="w-fit">Categoría/Plan</TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Fecha de creación"
                                        column="created_at"
                                        activeSort={sort}
                                        direction={direction}
                                        onSort={handleSort}
                                        onExplicitSort={handleExplicitSort}
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
                                    <TableCell>{user.alias}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{roleMap[user.role] || user.role}</TableCell>
                                    <TableCell>
                                        {user.role === 'player' && user.age_status_label ? (
                                            <div className="flex flex-col gap-1">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold w-fit ${user.is_minor_for_reference
                                                        ? 'bg-destructive text-white'
                                                        : 'bg-emerald-100 text-emerald-700'
                                                        }`}
                                                >
                                                    {user.age_status_label}
                                                </span>
                                                {user.current_plan_label && (
                                                    <span
                                                        className={`inline-flex items-center rounded-md w-fit px-2 py-1 text-xs font-medium ${getSubscriptionBadgeClasses(user.current_plan_value)}`}
                                                    >
                                                        {(user.current_plan_value ?? user.current_plan_label ?? '').toUpperCase()}
                                                    </span>
                                                )}
                                                {user.current_plan_paid_at && (
                                                    <span className="text-[11px] text-muted-foreground">
                                                        Pagado {new Date(user.current_plan_paid_at).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        ) : user.current_plan_label ? (
                                            <div className="flex flex-col justify-center items-start">
                                                <span
                                                    className={`inline-flex items-center rounded-md w-fit px-2 py-1 text-xs font-medium ${getSubscriptionBadgeClasses(user.current_plan_value)}`}
                                                >
                                                    {(user.current_plan_value ?? user.current_plan_label ?? '').toUpperCase()}
                                                </span>
                                                {user.current_plan_paid_at && (
                                                    <span className="mt-1 text-[11px] text-muted-foreground">
                                                        Pagado {new Date(user.current_plan_paid_at).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                Sin plan activo
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                <Link href={route('dashboard.users.show', user.id)}>
                                                    <Eye className="h-4 w-4" />
                                                    <span className="sr-only">Ver usuario</span>
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                <Link href={route('dashboard.users.edit', user.id)}>
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
            ) : (
                <div className="py-10 text-center">
                    <p className="text-muted-foreground">No hay usuarios registrados.</p>
                </div>
            )}

            {/* Paginación */}
            <div className="m-6">
                <Pagination
                    data={users}
                    appendQuery={{
                        search: data.search || undefined,
                        // No enviar el sentinel '__all' para evitar where role='__all' en backend
                        role: (data.role && data.role !== '__all') ? data.role : undefined,
                        start_date: data.start_date || undefined,
                        end_date: data.end_date || undefined,
                        has_active_subscription: data.has_active_subscription ? 1 : undefined,
                        age_filter: data.age_filter && data.age_filter !== '__all' ? data.age_filter : undefined,
                        sort,
                        direction,
                    }}
                />
            </div>

            {/* Modal de confirmación para eliminar usuario */}
            <AlertDialog
                open={confirmationDialog.open}
                onOpenChange={(open: boolean) => setConfirmationDialog(prev => ({ ...prev, open }))}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que quieres eliminar al usuario "{confirmationDialog.userName}"? Esta acción no se puede deshacer.
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
