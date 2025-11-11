import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Shield } from 'lucide-react';
import * as dashboardUsersRoutes from '@/routes/dashboard/users';
import { dashboard } from '@/routes';

interface User {
    id: number;
    name: string;
    email: string;
    username?: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
    avatar?: string | null;
    email_verified_at?: string | null;
    reviews?: Array<{
        id: number;
        content: string;
        qualification: number;
        created_at: string;
    }>;
    watchlist?: Array<{
        id: number;
        created_at: string;
    }>;
    ratings?: Array<{
        id: number;
        rating: number;
        created_at: string;
    }>;
    watched?: Array<{
        id: number;
        created_at: string;
    }>;
}

interface ShowUserProps {
    user: User;
}

export default function ShowUser({ user }: ShowUserProps) {
    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Usuarios', href: dashboardUsersRoutes.index().url },
                { title: user.name, active: true },
            ]}
        >
            <Head title={`Usuario: ${user.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Detalles del Usuario</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild>
                            <Link href={dashboardUsersRoutes.index().url}>Volver</Link>
                        </Button>
                        <Button variant="default" asChild>
                            <Link href={dashboardUsersRoutes.edit({ user: user.id }).url}>Editar</Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center text-xl font-semibold shrink-0">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span>{(user.name || '?').charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <CardTitle className="mb-1 flex items-center gap-2">
                                    {user.name}
                                    {user.is_admin && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            <Shield className="h-3 w-3" />
                                            Admin
                                        </span>
                                    )}
                                </CardTitle>
                                <CardDescription>@{user.username}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                                <p>{user.id}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                                <p>{user.name}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                                <p>@{user.username}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                                <p>{user.email}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Email Verificado</h3>
                                <p>{user.email_verified_at ? 'Sí' : 'No'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Administrador</h3>
                                <p>{user.is_admin ? 'Sí' : 'No'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Fecha de creación</h3>
                                <p>{new Date(user.created_at).toLocaleString()}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Última actualización</h3>
                                <p>{new Date(user.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
