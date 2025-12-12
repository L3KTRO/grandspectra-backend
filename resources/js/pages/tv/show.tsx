import { Head, Link } from '@inertiajs/react';
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
import { Calendar, Clock, Film, Globe, Layers, Play, Repeat, Star, TrendingUp, TvIcon } from 'lucide-react';
import { dashboard } from '@/routes';
import * as dashboardTvRoutes from '@/routes/dashboard/tv';

interface Genre {
    id: number;
    name: string;
}

interface Network {
    id: number;
    name: string;
}

interface Company {
    id: number;
    name: string;
}

interface Season {
    id: number;
    season_number: number;
    name?: string;
    overview?: string;
    poster?: string;
    air_date?: string;
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

interface Show {
    id: number;
    name: string;
    original_name?: string;
    overview?: string;
    tmdb_id?: string;
    tvdb_id?: string;
    imdb_id?: string;
    type?: string;
    status?: string;
    first_air_date?: string;
    last_air_date?: string;
    next_episode_to_air?: string;
    episode_run_time?: string;
    number_of_seasons?: number;
    number_of_episodes?: number;
    count_total_episodes?: number;
    count_existing_episodes?: number;
    origin_country?: string;
    original_language?: string;
    homepage?: string;
    popularity?: number | string;
    vote_average?: number | string;
    vote_count?: number;
    poster?: string;
    backdrop?: string;
    trailer?: string;
    in_production?: boolean;
    created_at: string;
    updated_at: string;
    genres?: Genre[];
    networks?: Network[];
    companies?: Company[];
    seasons?: Season[];
    credits?: Credit[];
    creators?: Person[];
    reviews?: Review[];
}

interface ShowProps {
    show: Show;
}

export default function ShowTv({ show }: ShowProps) {
    const formatDate = (date?: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatNumber = (value?: number | string) => {
        if (value === undefined || value === null) return '-';
        const numeric = typeof value === 'string' ? parseFloat(value) : value;
        if (Number.isNaN(numeric)) return '-';
        return numeric.toFixed(1);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Series', href: dashboardTvRoutes.index().url },
                { title: show.name, active: true },
            ]}
        >
            <Head title={`Serie: ${show.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Detalles de la serie</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild>
                            <Link href={dashboardTvRoutes.index().url}>Volver</Link>
                        </Button>
                        <Button asChild>
                            <Link href={dashboardTvRoutes.edit({ tv: show.id }).url}>Editar</Link>
                        </Button>
                    </div>
                </div>

                {show.backdrop && (
                    <div className="relative h-64 rounded-lg overflow-hidden">
                        <img src={show.backdrop} alt={show.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-neutral-200 flex items-center justify-center">
                                {show.poster ? (
                                    <img src={show.poster} alt={show.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Film className="h-20 w-20 text-muted-foreground" />
                                )}
                            </div>

                            {show.trailer && (
                                <Button className="w-full mt-4" variant="outline" asChild>
                                    <a href={show.trailer} target="_blank" rel="noopener noreferrer">
                                        <Play className="mr-2 h-4 w-4" /> Ver trailer
                                    </a>
                                </Button>
                            )}

                            {show.homepage && (
                                <Button className="w-full mt-2" variant="outline" asChild>
                                    <a href={show.homepage} target="_blank" rel="noopener noreferrer">
                                        <Globe className="mr-2 h-4 w-4" /> Sitio oficial
                                    </a>
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <TvIcon className="h-7 w-7 text-muted-foreground" /> {show.name}
                                </CardTitle>
                                {show.original_name && show.original_name !== show.name && (
                                    <CardDescription className="text-base">{show.original_name}</CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    {show.first_air_date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>Estreno: {formatDate(show.first_air_date)}</span>
                                        </div>
                                    )}
                                    {show.last_air_date && (
                                        <div className="flex items-center gap-2">
                                            <Repeat className="h-4 w-4" />
                                            <span>Último episodio: {formatDate(show.last_air_date)}</span>
                                        </div>
                                    )}
                                    {show.episode_run_time && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{show.episode_run_time} min</span>
                                        </div>
                                    )}
                                    {show.vote_average && (
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-medium">{formatNumber(show.vote_average)}/10</span>
                                            {show.vote_count && <span className="text-xs">({show.vote_count} votos)</span>}
                                        </div>
                                    )}
                                    {show.popularity && (
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />
                                            <span>{formatNumber(show.popularity)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {show.status && <Badge variant="secondary">{show.status}</Badge>}
                                    <Badge variant={show.in_production ? 'default' : 'outline'}>
                                    {show.in_production ? 'En producción' : 'Finalizada'}
                                    </Badge>
                                    {show.type && <Badge variant="outline">{show.type}</Badge>}
                                    {show.origin_country && (
                                        <Badge variant="outline">País: {show.origin_country}</Badge>
                                    )}
                                </div>

                                {show.genres && show.genres.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Géneros</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {show.genres.map((genre) => (
                                                <Badge key={genre.id} variant="secondary">
                                                    {genre.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {show.overview && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Sinopsis</h3>
                                        <p className="text-sm leading-relaxed">{show.overview}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Temporadas</p>
                                        <p className="font-medium">{show.number_of_seasons ?? '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Episodios</p>
                                        <p className="font-medium">{show.number_of_episodes ?? '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Episodios totales registrados</p>
                                        <p className="font-medium">{show.count_total_episodes ?? '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Idioma original</p>
                                        <p className="font-medium uppercase">{show.original_language ?? '-'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {show.creators && show.creators.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Creadores</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {show.creators.map((creator) => (
                                        <Badge key={creator.id} variant="outline">
                                            {creator.name}
                                        </Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {show.networks && show.networks.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cadenas y plataformas</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {show.networks.map((network) => (
                                        <Badge key={network.id} variant="outline">
                                            {network.name}
                                        </Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {show.companies && show.companies.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Productoras</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {show.companies.map((company) => (
                                        <Badge key={company.id} variant="outline">
                                            {company.name}
                                        </Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {show.seasons && show.seasons.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Temporadas</CardTitle>
                                    <CardDescription>Resumen de cada temporada disponible.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {show.seasons.map((season) => (
                                        <div key={season.id} className="flex gap-3 rounded-lg border p-3">
                                            <div className="h-20 w-14 rounded overflow-hidden bg-neutral-200 flex items-center justify-center">
                                                {season.poster ? (
                                                    <img src={season.poster} alt={season.name || `Temporada ${season.season_number}`} className="h-full w-full object-cover" />
                                                ) : (
                                                    <Layers className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="space-y-1 text-sm">
                                                <p className="font-semibold">Temporada {season.season_number}</p>
                                                {season.name && <p className="text-muted-foreground">{season.name}</p>}
                                                {season.air_date && <p className="text-xs text-muted-foreground">Estreno: {formatDate(season.air_date)}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {show.reviews && show.reviews.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Reseñas recientes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {show.reviews.map((review) => (
                                        <div key={review.id} className="rounded-lg border p-4 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{review.user.name}</p>
                                                    {review.user.username && (
                                                        <p className="text-xs text-muted-foreground">@{review.user.username}</p>
                                                    )}
                                                </div>
                                                <Badge variant="secondary">{review.qualification}/10</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{formatDate(review.created_at)}</p>
                                            <p className="text-sm leading-relaxed">{review.content}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Detalles técnicos</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">ID interno</p>
                                    <p className="font-medium">{show.id}</p>
                                </div>
                                {show.tmdb_id && (
                                    <div>
                                        <p className="text-muted-foreground">TMDB ID</p>
                                        <p className="font-medium">{show.tmdb_id}</p>
                                    </div>
                                )}
                                {show.tvdb_id && (
                                    <div>
                                        <p className="text-muted-foreground">TVDB ID</p>
                                        <p className="font-medium">{show.tvdb_id}</p>
                                    </div>
                                )}
                                {show.imdb_id && (
                                    <div>
                                        <p className="text-muted-foreground">IMDB ID</p>
                                        <p className="font-medium">{show.imdb_id}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-muted-foreground">Creado</p>
                                    <p className="font-medium">{formatDate(show.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Actualizado</p>
                                    <p className="font-medium">{formatDate(show.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
