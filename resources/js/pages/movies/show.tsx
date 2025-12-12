import { Head, Link, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Film, Calendar, Clock, Star, TrendingUp, DollarSign, Globe, Play, Trash2 } from 'lucide-react';
import { useState } from 'react';
import * as dashboardMoviesRoutes from '@/routes/dashboard/movies';
import { dashboard } from '@/routes';

interface Genre {
    id: number;
    name: string;
}

interface Person {
    id: number;
    name: string;
}

interface Credit {
    id: number;
    person: Person;
    character?: string;
    occupation_id?: number;
}

interface Company {
    id: number;
    name: string;
}

interface Review {
    id: number;
    content: string;
    qualification: number;
    created_at: string;
    user: {
        id: number;
        name: string;
        username?: string;
    };
}

interface Movie {
    id: number;
    title: string;
    original_title?: string;
    tmdb_id?: string;
    imdb_id?: string;
    overview?: string;
    release_date?: string;
    runtime?: number;
    poster?: string;
    backdrop?: string;
    status?: string;
    tagline?: string;
    budget?: string;
    revenue?: string;
    popularity?: number | string;
    vote_average?: number | string;
    vote_count?: number;
    adult?: boolean;
    homepage?: string;
    original_language?: string;
    trailer?: string;
    created_at: string;
    updated_at: string;
    genres?: Genre[];
    credits?: Credit[];
    companies?: Company[];
    reviews?: Review[];
}

interface ShowMovieProps {
    movie: Movie;
}

export default function ShowMovie({ movie }: ShowMovieProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const formatDate = (date?: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatCurrency = (value?: string) => {
        if (!value || value === '0') return '-';
        const num = parseFloat(value);
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(num);
    };

    const formatRuntime = (minutes?: number) => {
        if (!minutes) return '-';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const handleDelete = () => {
        router.delete(dashboardMoviesRoutes.destroy({ movie: movie.id }).url, {
            onSuccess: () => {
                // Redirigir al index después de eliminar
            },
        });
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Películas', href: dashboardMoviesRoutes.index().url },
                { title: movie.title, active: true },
            ]}
        >
            <Head title={`Película: ${movie.title}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Detalles de la Película</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild>
                            <Link href={dashboardMoviesRoutes.index().url}>Volver</Link>
                        </Button>
                        <Button variant="default" asChild>
                            <Link href={dashboardMoviesRoutes.edit({ movie: movie.id }).url}>Editar</Link>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setShowDeleteDialog(true)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </Button>
                    </div>
                </div>

                {/* Hero Section */}
                {movie.backdrop && (
                    <div className="relative h-64 rounded-lg overflow-hidden">
                        <img
                            src={movie.backdrop}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Poster Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-neutral-200 flex items-center justify-center">
                                {movie.poster ? (
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Film className="h-20 w-20 text-muted-foreground" />
                                )}
                            </div>

                            {movie.trailer && (
                                <Button className="w-full mt-4" variant="outline" asChild>
                                    <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                                        <Play className="mr-2 h-4 w-4" />
                                        Ver Trailer
                                    </a>
                                </Button>
                            )}

                            {movie.homepage && (
                                <Button className="w-full mt-2" variant="outline" asChild>
                                    <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                                        <Globe className="mr-2 h-4 w-4" />
                                        Sitio Oficial
                                    </a>
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl">{movie.title}</CardTitle>
                                {movie.original_title && movie.original_title !== movie.title && (
                                    <CardDescription className="text-base">{movie.original_title}</CardDescription>
                                )}
                                {movie.tagline && (
                                    <p className="text-sm italic text-muted-foreground mt-2">"{movie.tagline}"</p>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-4">
                                    {movie.release_date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{formatDate(movie.release_date)}</span>
                                        </div>
                                    )}
                                    {movie.runtime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{formatRuntime(movie.runtime)}</span>
                                        </div>
                                    )}
                                    {movie.vote_average && (
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-medium">{Number(movie.vote_average).toFixed(1)}/10</span>
                                            {movie.vote_count && (
                                                <span className="text-xs text-muted-foreground">({movie.vote_count} votos)</span>
                                            )}
                                        </div>
                                    )}
                                    {movie.popularity && (
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{Number(movie.popularity).toFixed(1)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Genres */}
                                {movie.genres && movie.genres.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Géneros</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {movie.genres.map((genre) => (
                                                <Badge key={genre.id} variant="secondary">
                                                    {genre.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Overview */}
                                {movie.overview && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Sinopsis</h3>
                                        <p className="text-sm leading-relaxed">{movie.overview}</p>
                                    </div>
                                )}

                                {/* Status and Language */}
                                <div className="grid grid-cols-2 gap-4">
                                    {movie.status && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
                                            <p className="text-sm">{movie.status}</p>
                                        </div>
                                    )}
                                    {movie.original_language && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Idioma Original</h3>
                                            <p className="text-sm uppercase">{movie.original_language}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Financial Info */}
                        {(movie.budget || movie.revenue) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Información Financiera
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        {movie.budget && (
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">Presupuesto</h3>
                                                <p className="text-lg font-semibold">{formatCurrency(movie.budget)}</p>
                                            </div>
                                        )}
                                        {movie.revenue && (
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">Recaudación</h3>
                                                <p className="text-lg font-semibold">{formatCurrency(movie.revenue)}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Production Companies */}
                        {movie.companies && movie.companies.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Productoras</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.companies.map((company) => (
                                            <Badge key={company.id} variant="outline">
                                                {company.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Technical Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Detalles Técnicos</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                                        <p className="text-sm">{movie.id}</p>
                                    </div>
                                    {movie.tmdb_id && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">TMDB ID</h3>
                                            <p className="text-sm">{movie.tmdb_id}</p>
                                        </div>
                                    )}
                                    {movie.imdb_id && (
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">IMDB ID</h3>
                                            <p className="text-sm">{movie.imdb_id}</p>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Contenido Adulto</h3>
                                        <p className="text-sm">{movie.adult ? 'Sí' : 'No'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Creado</h3>
                                        <p className="text-sm">{formatDate(movie.created_at)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Actualizado</h3>
                                        <p className="text-sm">{formatDate(movie.updated_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que quieres eliminar la película "{movie.title}"? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
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

