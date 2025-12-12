import { type InertiaFormProps } from '@inertiajs/react';
import { type FormEventHandler } from 'react';
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

export interface TvFormData extends Record<string, string | boolean> {
    name: string;
    original_name: string;
    tmdb_id: string;
    imdb_id: string;
    tvdb_id: string;
    type: string;
    overview: string;
    status: string;
    first_air_date: string;
    last_air_date: string;
    next_episode_to_air: string;
    number_of_seasons: string;
    number_of_episodes: string;
    count_existing_episodes: string;
    count_total_episodes: string;
    episode_run_time: string;
    origin_country: string;
    original_language: string;
    homepage: string;
    trailer: string;
    in_production: boolean;
    popularity: string;
    vote_average: string;
    vote_count: string;
    poster: string;
    backdrop: string;
}

interface TvFormProps {
    form: InertiaFormProps<TvFormData>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitLabel: string;
}

export function TvForm({ form, onSubmit, submitLabel }: TvFormProps) {
    const { data, setData, processing, errors } = form;

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Información General</CardTitle>
                    <CardDescription>Datos básicos de la serie.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nombre <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="original_name">Nombre Original</Label>
                            <Input
                                id="original_name"
                                value={data.original_name}
                                onChange={(e) => setData('original_name', e.target.value)}
                            />
                            {errors.original_name && (
                                <p className="text-sm text-destructive">{errors.original_name}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Input
                                id="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                placeholder="Scripted, Reality..."
                            />
                            {errors.type && (
                                <p className="text-sm text-destructive">{errors.type}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Estado</Label>
                            <Input
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                placeholder="Returning Series, Ended..."
                            />
                            {errors.status && (
                                <p className="text-sm text-destructive">{errors.status}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="overview">Sinopsis</Label>
                        <Textarea
                            id="overview"
                            value={data.overview}
                            onChange={(e) => setData('overview', e.target.value)}
                            rows={5}
                            className="resize-none"
                        />
                        {errors.overview && (
                            <p className="text-sm text-destructive">{errors.overview}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="in_production"
                            checked={data.in_production}
                            onCheckedChange={(checked) => setData('in_production', checked === true)}
                        />
                        <Label htmlFor="in_production" className="text-sm font-medium">En producción</Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Información de emisión</CardTitle>
                    <CardDescription>Fechas y métricas de lanzamiento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_air_date">Primera emisión</Label>
                            <Input
                                id="first_air_date"
                                type="date"
                                value={data.first_air_date}
                                onChange={(e) => setData('first_air_date', e.target.value)}
                            />
                            {errors.first_air_date && (
                                <p className="text-sm text-destructive">{errors.first_air_date}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_air_date">Última emisión</Label>
                            <Input
                                id="last_air_date"
                                type="date"
                                value={data.last_air_date}
                                onChange={(e) => setData('last_air_date', e.target.value)}
                            />
                            {errors.last_air_date && (
                                <p className="text-sm text-destructive">{errors.last_air_date}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="next_episode_to_air">Próximo episodio</Label>
                            <Input
                                id="next_episode_to_air"
                                value={data.next_episode_to_air}
                                onChange={(e) => setData('next_episode_to_air', e.target.value)}
                            />
                            {errors.next_episode_to_air && (
                                <p className="text-sm text-destructive">{errors.next_episode_to_air}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="episode_run_time">Duración episodio (minutos)</Label>
                            <Input
                                id="episode_run_time"
                                value={data.episode_run_time}
                                onChange={(e) => setData('episode_run_time', e.target.value)}
                                placeholder="45"
                            />
                            {errors.episode_run_time && (
                                <p className="text-sm text-destructive">{errors.episode_run_time}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="origin_country">País de origen</Label>
                            <Input
                                id="origin_country"
                                value={data.origin_country}
                                onChange={(e) => setData('origin_country', e.target.value)}
                                placeholder="US, ES..."
                            />
                            {errors.origin_country && (
                                <p className="text-sm text-destructive">{errors.origin_country}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="number_of_seasons">Temporadas</Label>
                            <Input
                                id="number_of_seasons"
                                type="number"
                                min="0"
                                value={data.number_of_seasons}
                                onChange={(e) => setData('number_of_seasons', e.target.value)}
                            />
                            {errors.number_of_seasons && (
                                <p className="text-sm text-destructive">{errors.number_of_seasons}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="number_of_episodes">Episodios</Label>
                            <Input
                                id="number_of_episodes"
                                type="number"
                                min="0"
                                value={data.number_of_episodes}
                                onChange={(e) => setData('number_of_episodes', e.target.value)}
                            />
                            {errors.number_of_episodes && (
                                <p className="text-sm text-destructive">{errors.number_of_episodes}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="count_total_episodes">Episodios totales</Label>
                            <Input
                                id="count_total_episodes"
                                type="number"
                                min="0"
                                value={data.count_total_episodes}
                                onChange={(e) => setData('count_total_episodes', e.target.value)}
                            />
                            {errors.count_total_episodes && (
                                <p className="text-sm text-destructive">{errors.count_total_episodes}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="count_existing_episodes">Episodios existentes</Label>
                            <Input
                                id="count_existing_episodes"
                                type="number"
                                min="0"
                                value={data.count_existing_episodes}
                                onChange={(e) => setData('count_existing_episodes', e.target.value)}
                            />
                            {errors.count_existing_episodes && (
                                <p className="text-sm text-destructive">{errors.count_existing_episodes}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="original_language">Idioma original</Label>
                            <Input
                                id="original_language"
                                value={data.original_language}
                                onChange={(e) => setData('original_language', e.target.value)}
                                placeholder="es, en..."
                            />
                            {errors.original_language && (
                                <p className="text-sm text-destructive">{errors.original_language}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Identificadores y enlaces</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tmdb_id">TMDB ID</Label>
                            <Input
                                id="tmdb_id"
                                value={data.tmdb_id}
                                onChange={(e) => setData('tmdb_id', e.target.value)}
                            />
                            {errors.tmdb_id && (
                                <p className="text-sm text-destructive">{errors.tmdb_id}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tvdb_id">TVDB ID</Label>
                            <Input
                                id="tvdb_id"
                                value={data.tvdb_id}
                                onChange={(e) => setData('tvdb_id', e.target.value)}
                            />
                            {errors.tvdb_id && (
                                <p className="text-sm text-destructive">{errors.tvdb_id}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imdb_id">IMDB ID</Label>
                            <Input
                                id="imdb_id"
                                value={data.imdb_id}
                                onChange={(e) => setData('imdb_id', e.target.value)}
                            />
                            {errors.imdb_id && (
                                <p className="text-sm text-destructive">{errors.imdb_id}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="homepage">Sitio oficial</Label>
                            <Input
                                id="homepage"
                                type="url"
                                value={data.homepage}
                                onChange={(e) => setData('homepage', e.target.value)}
                                placeholder="https://..."
                            />
                            {errors.homepage && (
                                <p className="text-sm text-destructive">{errors.homepage}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trailer">Trailer (YouTube ID)</Label>
                            <Input
                                id="trailer"
                                value={data.trailer}
                                onChange={(e) => setData('trailer', e.target.value)}
                                placeholder="dQw4w9WgXcQ"
                            />
                            {errors.trailer && (
                                <p className="text-sm text-destructive">{errors.trailer}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Rendimiento</CardTitle>
                    <CardDescription>Datos de popularidad y votos.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="popularity">Popularidad</Label>
                        <Input
                            id="popularity"
                            type="number"
                            step="0.1"
                            value={data.popularity}
                            onChange={(e) => setData('popularity', e.target.value)}
                        />
                        {errors.popularity && (
                            <p className="text-sm text-destructive">{errors.popularity}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vote_average">Valoración</Label>
                        <Input
                            id="vote_average"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={data.vote_average}
                            onChange={(e) => setData('vote_average', e.target.value)}
                        />
                        {errors.vote_average && (
                            <p className="text-sm text-destructive">{errors.vote_average}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vote_count">Número de votos</Label>
                        <Input
                            id="vote_count"
                            type="number"
                            min="0"
                            value={data.vote_count}
                            onChange={(e) => setData('vote_count', e.target.value)}
                        />
                        {errors.vote_count && (
                            <p className="text-sm text-destructive">{errors.vote_count}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Imágenes</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="poster">Póster</Label>
                        <Input
                            id="poster"
                            value={data.poster}
                            onChange={(e) => setData('poster', e.target.value)}
                            placeholder="URL del póster"
                        />
                        {errors.poster && (
                            <p className="text-sm text-destructive">{errors.poster}</p>
                        )}
                        {data.poster && (
                            <img
                                src={data.poster}
                                alt="Póster"
                                className="mt-2 h-48 rounded border object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="backdrop">Backdrop</Label>
                        <Input
                            id="backdrop"
                            value={data.backdrop}
                            onChange={(e) => setData('backdrop', e.target.value)}
                            placeholder="URL del backdrop"
                        />
                        {errors.backdrop && (
                            <p className="text-sm text-destructive">{errors.backdrop}</p>
                        )}
                        {data.backdrop && (
                            <img
                                src={data.backdrop}
                                alt="Backdrop"
                                className="mt-2 h-48 rounded border object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : submitLabel}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
