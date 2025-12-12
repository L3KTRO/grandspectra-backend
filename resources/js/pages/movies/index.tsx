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
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus, Search, Film } from 'lucide-react';
import { FormEvent, useState } from 'react';
import * as dashboardMoviesRoutes from '@/routes/dashboard/movies';
import { dashboard } from '@/routes';
import { SortableHeader, SortDirection } from '@/components/sortable-header';

interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    original_title?: string;
    tmdb_id?: string;
    release_date?: string;
    poster?: string;
    backdrop?: string;
    popularity?: number;
    vote_average?: number;
    runtime?: number;
    status?: string;
    created_at: string;
    genres?: Genre[];
}

interface MoviesIndexProps {
    movies: {
        data: Movie[];
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

export default function MoviesIndex({ movies, filters }: MoviesIndexProps) {
    const { data, setData } = useForm({
        search: filters.search || '',
    });

    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        movieId: null as number | null,
        movieTitle: '',
    });

    const handleSort = (column: string) => {
        let newDirection: SortDirection = 'desc';

        if (filters.sort === column) {
            newDirection = filters.direction === 'asc' ? 'desc' : 'asc';
        }

        router.get(
            dashboardMoviesRoutes.index().url,
            {
                search: data.search || null,
                sort: column,
                direction: newDirection,
            },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    const deleteMovie = (id: number, title: string) => {
        setConfirmationDialog({
            open: true,
            movieId: id,
            movieTitle: title,
        });
    };

    const handleConfirmDelete = () => {
        if (confirmationDialog.movieId) {
            router.delete(dashboardMoviesRoutes.destroy({ movie: confirmationDialog.movieId }).url, {
                onSuccess: () => {
                    setConfirmationDialog({
                        open: false,
                        movieId: null,
                        movieTitle: '',
                    });
                },
            });
        }
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            dashboardMoviesRoutes.index().url,
            {
                search: data.search || null,
                sort: filters.sort || null,
                direction: filters.direction || null,
            },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const formatDate = (date?: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Películas', active: true },
            ]}
        >
            <Head title="Gestión de Películas" />

            <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl font-bold">Gestión de películas</h1>
                        <p className="text-muted-foreground">Gestiona todas las películas del sistema</p>
                    </div>
                    <Button asChild>
                        <Link href={dashboardMoviesRoutes.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Nueva Película
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por título o TMDB ID..."
                            className="pl-8"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            aria-label="Buscar por título o TMDB ID"
                        />
                    </div>
                    <Button type="submit">Buscar</Button>
                </form>

                {movies.data.length > 0 ? (
                    <>
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-20">Poster</TableHead>
                                        <TableHead>
                                            <SortableHeader
                                                label="Título"
                                                column="title"
                                                activeSort={filters.sort || undefined}
                                                direction={filters.direction || undefined}
                                                onSort={handleSort}
                                            />
                                        </TableHead>
                                        <TableHead>
                                            <SortableHeader
                                                label="Fecha de Estreno"
                                                column="release_date"
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
                                        <TableHead>Géneros</TableHead>
                                        <TableHead className="text-center w-32">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {movies.data.map((movie) => (
                                        <TableRow key={movie.id}>
                                            <TableCell>
                                                <div className="h-16 w-12 rounded overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-medium">
                                                    {movie.poster ? (
                                                        <img
                                                            src={movie.poster}
                                                            alt={movie.title}
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    ) : (
                                                        <Film className="h-6 w-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{movie.title}</div>
                                                {movie.original_title && movie.original_title !== movie.title && (
                                                    <div className="text-xs text-muted-foreground">{movie.original_title}</div>
                                                )}
                                            </TableCell>
                                            <TableCell>{formatDate(movie.release_date)}</TableCell>
                                            <TableCell>{movie.popularity ? Number(movie.popularity).toFixed(1) : '-'}</TableCell>
                                            <TableCell>
                                                {movie.vote_average ? (
                                                    <Badge variant="secondary">{Number(movie.vote_average).toFixed(1)}/10</Badge>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {movie.genres && movie.genres.length > 0 ? (
                                                        movie.genres.slice(0, 2).map((genre) => (
                                                            <Badge key={genre.id} variant="outline" className="text-xs">
                                                                {genre.name}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">-</span>
                                                    )}
                                                    {movie.genres && movie.genres.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{movie.genres.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                        <Link href={dashboardMoviesRoutes.show({ movie: movie.id }).url}>
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Ver película</span>
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                        <Link href={dashboardMoviesRoutes.edit({ movie: movie.id }).url}>
                                                            <Edit className="h-4 w-4" />
                                                            <span className="sr-only">Editar película</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => deleteMovie(movie.id, movie.title)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Eliminar película</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination
                            data={movies}
                            appendQuery={{
                                search: data.search || undefined,
                                sort: filters.sort || undefined,
                                direction: filters.direction || undefined,
                            }}
                        />
                    </>
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-muted-foreground">No hay películas registradas.</p>
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
                            ¿Estás seguro de que quieres eliminar la película "{confirmationDialog.movieTitle}"? Esta acción no se puede deshacer.
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

