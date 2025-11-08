import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajustes de apariencia',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ajustes de apariencia" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Apariencia" description="El tema oscuro está habilitado permanentemente." />
                    <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-6 text-sm dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-200">
                        La personalización de tema ha sido deshabilitada. La interfaz se mostrará siempre en modo oscuro para asegurar consistencia visual.
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
