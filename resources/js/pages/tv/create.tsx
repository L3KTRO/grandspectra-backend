import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';
import { dashboard } from '@/routes';
import * as dashboardTvRoutes from '@/routes/dashboard/tv';
import { TvForm, type TvFormData } from './components/tv-form';

export default function CreateShow() {
    const form = useForm<TvFormData>({
        name: '',
        original_name: '',
        tmdb_id: '',
        imdb_id: '',
        tvdb_id: '',
        type: '',
        overview: '',
        status: '',
        first_air_date: '',
        last_air_date: '',
        next_episode_to_air: '',
        number_of_seasons: '',
        number_of_episodes: '',
        count_existing_episodes: '',
        count_total_episodes: '',
        episode_run_time: '',
        origin_country: '',
        original_language: '',
        homepage: '',
        trailer: '',
        in_production: false,
        popularity: '',
        vote_average: '',
        vote_count: '',
        poster: '',
        backdrop: '',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        form.post(dashboardTvRoutes.store().url);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Series', href: dashboardTvRoutes.index().url },
                { title: 'Nueva serie', active: true },
            ]}
        >
            <Head title="Crear nueva serie" />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <PlusSquare className="h-8 w-8" />
                        <div>
                            <h1 className="text-2xl font-bold">Registrar nueva serie</h1>
                            <p className="text-muted-foreground">Agrega los datos básicos para comenzar.</p>
                        </div>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={dashboardTvRoutes.index().url}>Volver</Link>
                    </Button>
                </div>

                <TvForm form={form} onSubmit={handleSubmit} submitLabel="Crear serie" />
            </div>
        </AppSidebarLayout>
    );
}
