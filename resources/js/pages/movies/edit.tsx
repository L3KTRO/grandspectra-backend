import { Head, useForm, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { FormEventHandler } from 'react';
import * as dashboardMoviesRoutes from '@/routes/dashboard/movies';
import { dashboard } from '@/routes';
import { Film } from 'lucide-react';

interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    original_title: string | null;
    tmdb_id: string | null;
    imdb_id: string | null;
    overview: string | null;
    release_date: string | null;
    runtime: number | null;
    poster: string | null;
    backdrop: string | null;
    status: string | null;
    tagline: string | null;
    budget: string | null;
    revenue: string | null;
    popularity: number | null;
    vote_average: number | null;
    vote_count: number | null;
    adult: boolean;
    homepage: string | null;
    original_language: string | null;
    trailer: string | null;
    genres?: Genre[];
}

interface EditMovieProps {
    movie: Movie;
}

interface EditFormData {
    title: string;
    original_title: string;
    tmdb_id: string;
    imdb_id: string;
    overview: string;
    release_date: string;
    runtime: string;
    poster: string;
    backdrop: string;
    status: string;
    tagline: string;
    budget: string;
    revenue: string;
    popularity: string;
    vote_average: string;
    vote_count: string;
    adult: boolean;
    homepage: string;
    original_language: string;
    trailer: string;
}

export default function EditMovie({ movie }: EditMovieProps) {
    const form = useForm({
        title: movie.title || '',
        original_title: movie.original_title || '',
        tmdb_id: movie.tmdb_id || '',
        imdb_id: movie.imdb_id || '',
        overview: movie.overview || '',
        release_date: movie.release_date || '',
        runtime: movie.runtime?.toString() || '',
        poster: movie.poster || '',
        backdrop: movie.backdrop || '',
        status: movie.status || '',
        tagline: movie.tagline || '',
        budget: movie.budget || '',
        revenue: movie.revenue || '',
        popularity: movie.popularity?.toString() || '',
        vote_average: movie.vote_average?.toString() || '',
        vote_count: movie.vote_count?.toString() || '',
        adult: movie.adult || false,
        homepage: movie.homepage || '',
        original_language: movie.original_language || '',
        trailer: movie.trailer || '',
    });

    const { data, setData, put, processing, errors } = form;

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(dashboardMoviesRoutes.update({ movie: movie.id }).url);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Películas', href: dashboardMoviesRoutes.index().url },
                { title: 'Editar Película', active: true },
            ]}
        >
            <Head title={`Editar: ${movie.title}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Film className="h-8 w-8" />
                        <h1 className="text-2xl font-bold tracking-tight">Editar Película</h1>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={dashboardMoviesRoutes.index().url}>Volver</Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Información Básica */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Básica</CardTitle>
                                <CardDescription>
                                    Actualiza la información principal de la película.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Título <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => setData('title' as any, e.target.value)}
                                            required
                                        />
                                        {(errors as any).title && (
                                            <p className="text-sm text-destructive">{(errors as any).title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="original_title">Título Original</Label>
                                        <Input
                                            id="original_title"
                                            name="original_title"
                                            value={data.original_title}
                                            onChange={(e) => setData('original_title' as any, e.target.value)}
                                        />
                                        {(errors as any).original_title && (
                                            <p className="text-sm text-destructive">{(errors as any).original_title}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="overview">Sinopsis</Label>
                                    <Textarea
                                        id="overview"
                                        name="overview"
                                        value={data.overview}
                                        onChange={(e) => setData('overview' as any, e.target.value)}
                                        rows={5}
                                        className="resize-none"
                                    />
                                    {(errors as any).overview && (
                                        <p className="text-sm text-destructive">{(errors as any).overview}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tagline">Eslogan</Label>
                                    <Input
                                        id="tagline"
                                        name="tagline"
                                        value={data.tagline}
                                        onChange={(e) => setData('tagline' as any, e.target.value)}
                                        placeholder="Un eslogan memorable..."
                                    />
                                    {(errors as any).tagline && (
                                        <p className="text-sm text-destructive">{(errors as any).tagline}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="release_date">Fecha de Estreno</Label>
                                        <Input
                                            id="release_date"
                                            name="release_date"
                                            type="date"
                                            value={data.release_date}
                                            onChange={(e) => setData('release_date' as any, e.target.value)}
                                        />
                                        {(errors as any).release_date && (
                                            <p className="text-sm text-destructive">{(errors as any).release_date}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="runtime">Duración (minutos)</Label>
                                        <Input
                                            id="runtime"
                                            name="runtime"
                                            type="number"
                                            min="0"
                                            value={data.runtime}
                                            onChange={(e) => setData('runtime' as any, e.target.value)}
                                        />
                                        {(errors as any).runtime && (
                                            <p className="text-sm text-destructive">{(errors as any).runtime}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Estado</Label>
                                        <Input
                                            id="status"
                                            name="status"
                                            value={data.status}
                                            onChange={(e) => setData('status' as any, e.target.value)}
                                            placeholder="Released, In Production..."
                                        />
                                        {(errors as any).status && (
                                            <p className="text-sm text-destructive">{(errors as any).status}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="original_language">Idioma Original</Label>
                                        <Input
                                            id="original_language"
                                            name="original_language"
                                            value={data.original_language}
                                            onChange={(e) => setData('original_language' as any, e.target.value)}
                                            placeholder="es, en, fr..."
                                            maxLength={10}
                                        />
                                        {(errors as any).original_language && (
                                            <p className="text-sm text-destructive">{(errors as any).original_language}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2 pt-8">
                                        <Checkbox
                                            id="adult"
                                            checked={data.adult}
                                            onCheckedChange={(checked) => setData('adult' as any, checked as boolean)}
                                        />
                                        <Label htmlFor="adult" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Contenido para adultos
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* IDs y Enlaces */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Identificadores y Enlaces</CardTitle>
                                <CardDescription>
                                    IDs externos y enlaces relacionados.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tmdb_id">TMDB ID</Label>
                                        <Input
                                            id="tmdb_id"
                                            name="tmdb_id"
                                            value={data.tmdb_id}
                                            onChange={(e) => setData('tmdb_id' as any, e.target.value)}
                                        />
                                        {(errors as any).tmdb_id && (
                                            <p className="text-sm text-destructive">{(errors as any).tmdb_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="imdb_id">IMDB ID</Label>
                                        <Input
                                            id="imdb_id"
                                            name="imdb_id"
                                            value={data.imdb_id}
                                            onChange={(e) => setData('imdb_id' as any, e.target.value)}
                                            placeholder="tt1234567"
                                        />
                                        {(errors as any).imdb_id && (
                                            <p className="text-sm text-destructive">{(errors as any).imdb_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="homepage">Página Web Oficial</Label>
                                        <Input
                                            id="homepage"
                                            name="homepage"
                                            type="url"
                                            value={data.homepage}
                                            onChange={(e) => setData('homepage' as any, e.target.value)}
                                            placeholder="https://..."
                                        />
                                        {(errors as any).homepage && (
                                            <p className="text-sm text-destructive">{(errors as any).homepage}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="trailer">Trailer (YouTube ID)</Label>
                                        <Input
                                            id="trailer"
                                            name="trailer"
                                            value={data.trailer}
                                            onChange={(e) => setData('trailer' as any, e.target.value)}
                                            placeholder="dQw4w9WgXcQ"
                                        />
                                        {(errors as any).trailer && (
                                            <p className="text-sm text-destructive">{(errors as any).trailer}</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Imágenes */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Imágenes</CardTitle>
                                <CardDescription>
                                    URLs de las imágenes de la película.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="poster">Póster</Label>
                                        <Input
                                            id="poster"
                                            name="poster"
                                            value={data.poster}
                                            onChange={(e) => setData('poster' as any, e.target.value)}
                                            placeholder="URL del póster"
                                        />
                                        {(errors as any).poster && (
                                            <p className="text-sm text-destructive">{(errors as any).poster}</p>
                                        )}
                                        {data.poster && (
                                            <div className="mt-2">
                                                <img
                                                    src={data.poster}
                                                    alt="Póster"
                                                    className="h-40 w-auto rounded border object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="backdrop">Fondo</Label>
                                        <Input
                                            id="backdrop"
                                            name="backdrop"
                                            value={data.backdrop}
                                            onChange={(e) => setData('backdrop' as any, e.target.value)}
                                            placeholder="URL del backdrop"
                                        />
                                        {(errors as any).backdrop && (
                                            <p className="text-sm text-destructive">{(errors as any).backdrop}</p>
                                        )}
                                        {data.backdrop && (
                                            <div className="mt-2">
                                                <img
                                                    src={data.backdrop}
                                                    alt="Backdrop"
                                                    className="h-40 w-auto rounded border object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Datos Financieros y Valoraciones */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Financiero y Valoraciones</CardTitle>
                                <CardDescription>
                                    Información de presupuesto, recaudación y valoraciones.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="budget">Presupuesto</Label>
                                        <Input
                                            id="budget"
                                            name="budget"
                                            value={data.budget}
                                            onChange={(e) => setData('budget' as any, e.target.value)}
                                            placeholder="$100000000"
                                        />
                                        {(errors as any).budget && (
                                            <p className="text-sm text-destructive">{(errors as any).budget}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="revenue">Recaudación</Label>
                                        <Input
                                            id="revenue"
                                            name="revenue"
                                            value={data.revenue}
                                            onChange={(e) => setData('revenue' as any, e.target.value)}
                                            placeholder="$500000000"
                                        />
                                        {(errors as any).revenue && (
                                            <p className="text-sm text-destructive">{(errors as any).revenue}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="popularity">Popularidad</Label>
                                        <Input
                                            id="popularity"
                                            name="popularity"
                                            type="number"
                                            step="0.001"
                                            value={data.popularity}
                                            onChange={(e) => setData('popularity' as any, e.target.value)}
                                        />
                                        {(errors as any).popularity && (
                                            <p className="text-sm text-destructive">{(errors as any).popularity}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="vote_average">Valoración Promedio</Label>
                                        <Input
                                            id="vote_average"
                                            name="vote_average"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            value={data.vote_average}
                                            onChange={(e) => setData('vote_average' as any, e.target.value)}
                                        />
                                        {(errors as any).vote_average && (
                                            <p className="text-sm text-destructive">{(errors as any).vote_average}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="vote_count">Número de Votos</Label>
                                        <Input
                                            id="vote_count"
                                            name="vote_count"
                                            type="number"
                                            min="0"
                                            value={data.vote_count}
                                            onChange={(e) => setData('vote_count' as any, e.target.value)}
                                        />
                                        {(errors as any).vote_count && (
                                            <p className="text-sm text-destructive">{(errors as any).vote_count}</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Botones de acción */}
                        <Card>
                            <CardFooter className="flex justify-end gap-2 pt-6">
                                <Button variant="outline" asChild disabled={processing}>
                                    <Link href={dashboardMoviesRoutes.index().url}>Cancelar</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Actualizando...' : 'Actualizar Película'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}
