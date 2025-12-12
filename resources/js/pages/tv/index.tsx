import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { SortableHeader, type SortDirection } from '@/components/sortable-header';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Edit, Eye, Film, Plus, Search, Trash2, TvIcon } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import * as dashboardTvRoutes from '@/routes/dashboard/tv';
import { dashboard } from '@/routes';

interface Genre {
    id: number;
    name: string;
}

interface Show {
    id: number;
    name: string;
    original_name?: string;
    tmdb_id?: string;
    tvdb_id?: string;
    first_air_date?: string;
    poster?: string;
    popularity?: number | string;
    vote_average?: number | string;
    number_of_seasons?: number | string;
    status?: string;
    created_at: string;
    genres?: Genre[];
}

interface ShowsIndexProps {
    shows: {
        data: Show[];
        current_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        from: number | null;
        last_page: number;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search?: string | null;
        sort?: string | null;
        direction?: SortDirection | null;
    };
}

export default function ShowsIndex({ shows, filters }: ShowsIndexProps) {
    const { data, setData } = useForm({
        search: filters.search || '',
    });

    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        showId: null as number | null,
        showName: '',
    });

    const handleSort = (column: string) => {
        let newDirection: SortDirection = 'asc';

        if (filters.sort === column) {
            newDirection = filters.direction === 'asc' ? 'desc' : 'asc';
        }

        router.get(
            dashboardTvRoutes.index().url,
            {
                search: data.search || null,
                sort: column,
                direction: newDirection,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const handleSearchSubmit = (event: FormEvent) => {
        event.preventDefault();
        router.get(
            dashboardTvRoutes.index().url,
            {
                search: data.search || null,
                sort: filters.sort || null,
                direction: filters.direction || null,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const deleteShow = (id: number, name: string) => {
        setConfirmationDialog({
            open: true,
            showId: id,
            showName: name,
        });
    };

    const handleConfirmDelete = () => {
        if (!confirmationDialog.showId) return;

        router.delete(dashboardTvRoutes.destroy({ tv: confirmationDialog.showId }).url, {
            onSuccess: () => {
                setConfirmationDialog({ open: false, showId: null, showName: '' });
            },
        });
    };

    const formatDate = (date?: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' });
    };

    const formatNumber = (value?: number | string | null) => {
        if (!value && value !== 0) return '-';
        const numeric = typeof value === 'string' ? parseFloat(value) : value;
        if (Number.isNaN(numeric)) return '-';
        return numeric.toFixed(1);
    };

    const paginationData = {
        ...shows,
        from: shows.from ?? 0,
        to: shows.to ?? 0,
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Series', active: true },
            ]}
        >
            <Head title="Gestión de Series" />

            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <TvIcon className="h-8 w-8" />
                        <div>
                            <h1 className="text-3xl font-bold">Gestión de series</h1>
                            <p className="text-muted-foreground">Administra todas las series disponibles.</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={dashboardTvRoutes.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Nueva serie
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre o TMDB/TVDB ID"
                            className="pl-8"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                        />
                    </div>
                    <Button type="submit">Buscar</Button>
                </form>

                {shows.data.length > 0 ? (
                    <>
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-20">Póster</TableHead>
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
                                                label="Primera emisión"
                                                column="first_air_date"
                                                activeSort={filters.sort || undefined}
                                                direction={filters.direction || undefined}
                                                onSort={handleSort}
                                            />
                                        </TableHead>
                                        <TableHead>
                                            <SortableHeader
                                                label="Popularidad"
                                                column="popularity"
                                                activeSort={filters.sort || undefined}
                                                direction={filters.direction || undefined}
                                                onSort={handleSort}
                                            />
                                        </TableHead>
                                        <TableHead>
                                            <SortableHeader
                                                label="Valoración"
                                                column="vote_average"
                                                activeSort={filters.sort || undefined}
                                                direction={filters.direction || undefined}
                                                onSort={handleSort}
                                            />
                                        </TableHead>
                                        <TableHead>Temporadas</TableHead>
                                        <TableHead>Géneros</TableHead>
                                        <TableHead className="text-center w-32">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {shows.data.map((show) => (
                                        <TableRow key={show.id}>
                                            <TableCell>
                                                <div className="h-16 w-12 rounded overflow-hidden bg-neutral-200 flex items-center justify-center text-xs font-medium">
                                                    {show.poster ? (
                                                        <img
                                                            src={show.poster}
                                                            alt={show.name}
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <Film className="h-6 w-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{show.name}</div>
                                                {show.original_name && show.original_name !== show.name && (
                                                    <div className="text-xs text-muted-foreground">{show.original_name}</div>
                                                )}
                                            </TableCell>
                                            <TableCell>{formatDate(show.first_air_date)}</TableCell>
                                            <TableCell>{formatNumber(show.popularity)}</TableCell>
                                            <TableCell>
                                                {show.vote_average ? (
                                                    <Badge variant="secondary">{formatNumber(show.vote_average)}/10</Badge>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell>{show.number_of_seasons ?? '-'}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {show.genres && show.genres.length > 0 ? (
                                                        show.genres.slice(0, 2).map((genre) => (
                                                            <Badge key={genre.id} variant="outline" className="text-xs">
                                                                {genre.name}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">-</span>
                                                    )}
                                                    {show.genres && show.genres.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{show.genres.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                        <Link href={dashboardTvRoutes.show({ tv: show.id }).url}>
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Ver serie</span>
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                        <Link href={dashboardTvRoutes.edit({ tv: show.id }).url}>
                                                            <Edit className="h-4 w-4" />
                                                            <span className="sr-only">Editar serie</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => deleteShow(show.id, show.name)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Eliminar serie</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination
                            data={paginationData}
                            appendQuery={{
                                search: data.search || undefined,
                                sort: filters.sort || undefined,
                                direction: filters.direction || undefined,
                            }}
                        />
                    </>
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-muted-foreground">No hay series registradas.</p>
                    </div>
                )}
            </div>

            <AlertDialog
                open={confirmationDialog.open}
                onOpenChange={(open) => setConfirmationDialog((prev) => ({ ...prev, open }))}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Deseas eliminar la serie "{confirmationDialog.showName}"? Esta acción no se puede deshacer.
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
