import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { TvIcon } from 'lucide-react';
import { dashboard } from '@/routes';
import * as dashboardTvRoutes from '@/routes/dashboard/tv';
import { TvForm, type TvFormData } from './components/tv-form';

interface Show {
    id: number;
    name: string;
    original_name?: string;
    tmdb_id?: string;
    imdb_id?: string;
    tvdb_id?: string;
    type?: string;
    overview?: string;
    status?: string;
    first_air_date?: string;
    last_air_date?: string;
    next_episode_to_air?: string;
    number_of_seasons?: number | null;
    number_of_episodes?: number | null;
    count_existing_episodes?: number | null;
    count_total_episodes?: number | null;
    episode_run_time?: string;
    origin_country?: string;
    original_language?: string;
    homepage?: string;
    trailer?: string;
    in_production?: boolean;
    popularity?: number | string | null;
    vote_average?: number | string | null;
    vote_count?: number | null;
    poster?: string;
    backdrop?: string;
}

interface EditShowProps {
    show: Show;
}

export default function EditShow({ show }: EditShowProps) {
    const form = useForm<TvFormData>({
        name: show.name || '',
        original_name: show.original_name || '',
        tmdb_id: show.tmdb_id || '',
        imdb_id: show.imdb_id || '',
        tvdb_id: show.tvdb_id || '',
        type: show.type || '',
        overview: show.overview || '',
        status: show.status || '',
        first_air_date: show.first_air_date || '',
        last_air_date: show.last_air_date || '',
        next_episode_to_air: show.next_episode_to_air || '',
        number_of_seasons: show.number_of_seasons?.toString() || '',
        number_of_episodes: show.number_of_episodes?.toString() || '',
        count_existing_episodes: show.count_existing_episodes?.toString() || '',
        count_total_episodes: show.count_total_episodes?.toString() || '',
        episode_run_time: show.episode_run_time || '',
        origin_country: show.origin_country || '',
        original_language: show.original_language || '',
        homepage: show.homepage || '',
        trailer: show.trailer || '',
        in_production: Boolean(show.in_production),
        popularity: show.popularity?.toString() || '',
        vote_average: show.vote_average?.toString() || '',
        vote_count: show.vote_count?.toString() || '',
        poster: show.poster || '',
        backdrop: show.backdrop || '',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        form.put(dashboardTvRoutes.update({ tv: show.id }).url);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Series', href: dashboardTvRoutes.index().url },
                { title: 'Editar serie', active: true },
            ]}
        >
            <Head title={`Editar serie: ${show.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <TvIcon className="h-8 w-8" />
                        <div>
                            <h1 className="text-2xl font-bold">Editar serie</h1>
                            <p className="text-muted-foreground">Actualiza la información de {show.name}</p>
                        </div>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={dashboardTvRoutes.index().url}>Volver</Link>
                    </Button>
                </div>

                <TvForm form={form} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
            </div>
        </AppSidebarLayout>
    );
}
