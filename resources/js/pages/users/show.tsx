import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
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
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Eye, ChevronDown } from 'lucide-react';
import { nl } from '@/utils/localization';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface User {
    id: number;
    name: string;
    alias: string;
    email: string;
    gender?: string;
    birth_date?: string | null;
    role: string;
    is_influencer: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    jersey_name?: string;
    jersey_number?: string;
    jersey_size?: string;
    shipping_address?: string;
    avatar?: string | null;
}

interface Penalty {
    id: number;
    type: string;
    reason: string;
    is_active: boolean;
    created_at: string;
    season?: { id: number; name: string };
}

interface ReportItem {
    id: number;
    reason: string;
    status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
    created_at: string;
    submission?: { id: number; challenge?: { id: number; title: string } };
}

interface PaymentItem {
    id: number;
    season: { id: number; name: string } | null;
    season_level: 'basic' | 'extra' | 'premium' | 'free' | 'scouter' | null;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled' | null;
    method: 'card' | 'redsys' | 'stripe' | 'paypal' | 'transfer' | 'cash' | null;
    reference: string | null;
    paid_at: string | null;
    created_at: string | null;
}

interface ShowUserProps {
    user: User;
    roleOptions: Record<string, string>;
    penalties: Penalty[];
    reportsAgainst: ReportItem[];
    reportsMade: ReportItem[];
    seasonRelations?: Array<{
        id: number;
        name: string;
        is_active: boolean;
        subscription_level: 'basic' | 'extra' | 'premium' | null;
        attempts_used: number;
        total_points: number;
        ranking_position: number | null;
    }>;
    prevUserId?: number | null;
    nextUserId?: number | null;
    editedSubmissions?: Array<{
        id: number;
        challenge?: { id: number; title: string } | null;
        created_at?: string | null;
        first_edited_at?: string | null;
        edits_count: number;
        raw_score: number;
        is_zeroed: boolean;
    }>;
    submissions?: Array<{
        id: number;
        challenge?: { id: number; title: string } | null;
        season?: { id: number; name: string } | null;
        attempt?: number | null;
        score?: number | null;
        created_at?: string | null;
    }>;
    reservedAttempts?: Array<{
        id: number;
        challenge?: { id: number; title: string } | null;
        attempt_number: number;
        attempt_key: string | null;
        has_video: boolean;
        reserved_at: string | null;
    }>;
    invalidAttempts?: Array<{
        id: number;
        challenge?: { id: number; title: string } | null;
        attempt_number: number;
        invalidated_at: string | null;
    }>;
    isMinor?: boolean;
    guardianConsent?: {
        first_name: string | null;
        last_name: string | null;
        dni: string | null;
        consent_confirmed_at: string | null;
    } | null;
    payments?: PaymentItem[];
}

export default function ShowUser({ user, roleOptions, penalties, reportsAgainst, reportsMade, seasonRelations, prevUserId, nextUserId, submissions = [], editedSubmissions = [], reservedAttempts = [], invalidAttempts = [], isMinor = false, guardianConsent = null, payments = [] }: ShowUserProps) {
    const reportStatusLabels: Record<string, string> = {
        pending: 'Pendiente',
        under_review: 'En revisión',
        resolved: 'Resuelto',
        dismissed: 'Descartado',
    };

    const paymentStatusLabels: Record<string, string> = {
        pending: 'Pendiente',
        completed: 'Completado',
        failed: 'Fallido',
        refunded: 'Reembolsado',
        cancelled: 'Cancelado',
    };

    const paymentMethodLabels: Record<string, string> = {
        card: 'Tarjeta',
        redsys: 'Redsys',
        stripe: 'Stripe',
        paypal: 'PayPal',
        transfer: 'Transferencia',
        cash: 'Efectivo',
    };

    const translateStatus = (s: string) => reportStatusLabels[s] ?? s;
    const translatePaymentStatus = (s: string | null) => s ? (paymentStatusLabels[s] ?? s) : '-';
    const translatePaymentMethod = (m: string | null) => m ? (paymentMethodLabels[m] ?? m) : '-';

    const getSubscriptionBadgeClasses = (level?: string | null) => {
        switch (level) {
            case 'premium':
                return 'bg-yellow-100 text-yellow-800';
            case 'extra':
                return 'bg-blue-100 text-blue-800';
            case 'basic':
                return 'bg-gray-100 text-gray-800';
            case 'free':
                return 'bg-slate-100 text-slate-700';
            case 'scouter':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusBadgeVariant = (status?: string | null): 'default' | 'secondary' | 'destructive' | 'outline' => {
        switch (status) {
            case 'completed':
                return 'secondary';
            case 'pending':
                return 'default';
            case 'failed':
                return 'destructive';
            case 'refunded':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const [expandedSeasons, setExpandedSeasons] = useState<number[]>([]);

    const toggleSeason = (id: number) => {
        setExpandedSeasons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const [releaseTarget, setReleaseTarget] = React.useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const openReleaseDialog = (id: number) => {
        setReleaseTarget(id);
        setIsDialogOpen(true);
    };

    const submitRelease = () => {
        if (!releaseTarget) return;
        
        // Usar Inertia para hacer el DELETE request con CSRF automático
        router.delete(route('dashboard.users.reserved-attempts.release', [user.id, releaseTarget]), {
            onSuccess: () => {
                setIsDialogOpen(false);
                setReleaseTarget(null);
            },
            onError: (errors) => {
                console.error('Error liberando intento:', errors);
            }
        });
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Usuarios', href: route('dashboard.users.index') },
                { title: user.name, active: true },
            ]}
        >
            <Head title={`Usuario: ${user.name}`} />

            <div className="flex items-center justify-between m-6">
                <h1 className="text-2xl font-bold tracking-tight">Detalles del Usuario</h1>
                <div className="flex items-center gap-2">
                    {prevUserId ? (
                        <Button variant="outline" asChild>
                            <Link href={route('dashboard.users.show', prevUserId)}>Anterior</Link>
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>Anterior</Button>
                    )}

                    <Button variant="ghost" asChild>
                        <Link href={route('dashboard.users.index')}>Volver</Link>
                    </Button>

                    {nextUserId ? (
                        <Button variant="outline" asChild>
                            <Link href={route('dashboard.users.show', nextUserId)}>Siguiente</Link>
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>Siguiente</Button>
                    )}
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
                        <div>
                            <CardTitle className="mb-1">Información del Usuario</CardTitle>
                            <CardDescription>Detalles completos del usuario.</CardDescription>
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
                            <h3 className="text-sm font-medium text-muted-foreground">Alias</h3>
                            <p>{user.alias}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                            <p>{user.email}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Género</h3>
                            <p>{user.gender ? (user.gender === 'male' ? 'Masculino' : user.gender === 'female' ? 'Femenino' : user.gender) : '-'}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Nacimiento</h3>
                            <p>{user.birth_date ? format(new Date(user.birth_date), 'dd/MM/yyyy', { locale: es }) : '-'}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Rol</h3>
                            <p>{roleOptions[user.role] || user.role}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Es Influencer</h3>
                            <p>{user.is_influencer ? 'Sí' : 'No'}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
                            <p>{user.is_active ? 'Activo' : 'Inactivo'}</p>
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

                    {/* Welcome Pack Section */}
                    {user.role !== 'observer' && (user.jersey_name || user.jersey_number || user.jersey_size || user.shipping_address) ? (
                        <div className="mt-6 pt-6 border-t border-border">
                            <h3 className="text-lg font-semibold mb-4">Información del Welcome Pack</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Nombre para la Camiseta</h3>
                                    <p>{user.jersey_name || '-'}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Número Dorsal</h3>
                                    <p>{user.jersey_number || '-'}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Talla de Camiseta</h3>
                                    <p>{user.jersey_size || '-'}</p>
                                </div>

                                <div className="col-span-1 md:col-span-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">Dirección de Envío</h3>
                                    <p className="whitespace-pre-wrap">{user.shipping_address || '-'}</p>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {isMinor && guardianConsent && (
                        <div className="mt-6 pt-6 border-t border-border">
                            <h3 className="text-lg font-semibold mb-2">Consentimiento de Menores</h3>
                            <p className="text-sm text-muted-foreground mb-4">Datos del tutor legal que autorizó el registro del menor.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Nombre Tutor</h4>
                                    <p>{guardianConsent.first_name || '-'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Apellidos Tutor</h4>
                                    <p>{guardianConsent.last_name || '-'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">DNI Tutor</h4>
                                    <p>{guardianConsent.dni || '-'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Fecha Confirmación</h4>
                                    <p>{guardianConsent.consent_confirmed_at ? new Date(guardianConsent.consent_confirmed_at).toLocaleString() : '-'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                    <Button variant="default" asChild>
                        <Link href={route('dashboard.users.edit', user.id)}>Editar</Link>
                    </Button>
                </CardFooter>
            </Card>

            {/* Relación con Temporadas (collapsible para ver participaciones por temporada) */}
            {seasonRelations && seasonRelations.length > 0 && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Relación con Temporadas</CardTitle>
                        <CardDescription>Información de suscripción y participaciones por temporada</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Temporada</TableHead>
                                    <TableHead>Suscripción</TableHead>
                                    <TableHead>Intentos usados</TableHead>
                                    <TableHead>Puntos</TableHead>
                                    <TableHead>Posición</TableHead>
                                    <TableHead>&nbsp;</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {seasonRelations.map((s) => {
                                    const isOpen = expandedSeasons.includes(s.id);
                                    const submissionsForSeason = (typeof submissions !== 'undefined' && submissions)
                                        ? submissions.filter((sub) => sub.season && sub.season.id === s.id)
                                        : [];
                                    return (
                                        <>
                                            <TableRow key={s.id} className="cursor-pointer" onClick={() => toggleSeason(s.id)} role="button" aria-expanded={isOpen}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`h-2 w-2 rounded-full ${s.is_active ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                                        <span className="font-medium">{s.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {s.subscription_level ? (
                                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${s.subscription_level === 'premium'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : s.subscription_level === 'extra'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {String(s.subscription_level).toUpperCase()}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500">—</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>{s.attempts_used}</TableCell>
                                                <TableCell>{s.total_points}</TableCell>
                                                <TableCell>{s.ranking_position ?? '—'}</TableCell>
                                                <TableCell className="text-right">
                                                    <ChevronDown className={`h-4 w-4 text-gray-600 transform transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
                                                </TableCell>
                                            </TableRow>
                                            {isOpen && (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="px-4 py-3">
                                                        {submissionsForSeason.length === 0 ? (
                                                            <p className="text-sm text-muted-foreground">Sin participaciones en esta temporada</p>
                                                        ) : (
                                                            <div className="overflow-auto">
                                                                <table className="min-w-full text-sm">
                                                                    <thead className="bg-gray-600">
                                                                        <tr>
                                                                            <th className="px-3 py-2 text-left">ID</th>
                                                                            <th className="px-3 py-2 text-left">Challenge</th>
                                                                            <th className="px-3 py-2 text-left">Intento</th>
                                                                            <th className="px-3 py-2 text-left">Fecha</th>
                                                                            <th className="px-3 py-2 text-left">Acciones</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {submissionsForSeason.map((sub) => (
                                                                            <tr key={sub.id} className="border-t ">
                                                                                <td className="px-3 py-2">#{sub.id}</td>
                                                                                <td className="px-3 py-2">{nl(sub.challenge?.title) || '—'}</td>
                                                                                <td className="px-3 py-2">{sub.attempt ?? '—'}</td>
                                                                                <td className="px-3 py-2">{sub.created_at ? format(new Date(sub.created_at), 'dd/MM/yyyy HH:mm', { locale: es }) : '—'}</td>
                                                                                <td className="px-3 py-2">
                                                                                    {sub.challenge ? (
                                                                                        <Link href={route('dashboard.challenges.submissions.show', [sub.challenge.id, sub.id])} className="inline-flex items-cente" onClick={(e: any) => e.stopPropagation()}>
                                                                                            <Eye className="h-4 w-4" />
                                                                                        </Link>
                                                                                    ) : (
                                                                                        '-'
                                                                                    )}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Pagos del Usuario */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Historial de Pagos</CardTitle>
                    <CardDescription>Pagos realizados por el usuario</CardDescription>
                </CardHeader>
                <CardContent>
                    {payments.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sin pagos registrados</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Temporada</TableHead>
                                    <TableHead>Nivel</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Método</TableHead>
                                    <TableHead>Referencia</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha de pago</TableHead>
                                    <TableHead className="text-center">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>#{p.id}</TableCell>
                                        <TableCell>{p.season ? p.season.name : '—'}</TableCell>
                                        <TableCell>
                                            {p.season_level ? (
                                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getSubscriptionBadgeClasses(p.season_level)}`}>
                                                    {String(p.season_level).toUpperCase()}
                                                </span>
                                            ) : (
                                                '—'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {p.amount ? (
                                                <span className="font-medium">
                                                    {new Intl.NumberFormat('es-ES', {
                                                        style: 'currency',
                                                        currency: p.currency || 'EUR',
                                                    }).format(p.amount / 100)}
                                                </span>
                                            ) : (
                                                '—'
                                            )}
                                        </TableCell>
                                        <TableCell>{translatePaymentMethod(p.method)}</TableCell>
                                        <TableCell className="max-w-[150px] truncate" title={p.reference || undefined}>
                                            {p.reference || '—'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getPaymentStatusBadgeVariant(p.status)}>
                                                {translatePaymentStatus(p.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {p.paid_at ? format(new Date(p.paid_at), 'dd/MM/yyyy HH:mm', { locale: es }) : '—'}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                                <Link href={route('dashboard.payments.show', p.id)}>
                                                    <Eye className="h-4 w-4" />
                                                    <span className="sr-only">Ver detalles del pago</span>
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Penalizaciones del Usuario */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Penalizaciones</CardTitle>
                    <CardDescription>Listado de penalizaciones aplicadas al usuario</CardDescription>
                </CardHeader>
                <CardContent>
                    {penalties.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sin penalizaciones</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Temporada</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {penalties.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.season ? p.season.name : '-'}</TableCell>
                                        <TableCell>{p.type}</TableCell>
                                        <TableCell className="max-w-[420px] truncate" title={p.reason}>{p.reason}</TableCell>
                                        <TableCell>
                                            <Badge variant={p.is_active ? 'destructive' : 'outline'}>
                                                {p.is_active ? 'Activa' : 'Inactiva'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{format(new Date(p.created_at), 'PPP', { locale: es })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Participaciones editadas (control individual) */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Participaciones editadas</CardTitle>
                    <CardDescription>Listado de participaciones editadas por administradores</CardDescription>
                </CardHeader>
                <CardContent>
                    {editedSubmissions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sin ediciones registradas</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Challenge</TableHead>
                                    <TableHead>Primera edición</TableHead>
                                    <TableHead>Ediciones</TableHead>
                                    <TableHead>Puntuación original</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {editedSubmissions.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell>#{s.id}</TableCell>
                                        <TableCell>{nl(s.challenge?.title) || '—'}</TableCell>
                                        <TableCell>{s.first_edited_at ? format(new Date(s.first_edited_at), 'dd/MM/yyyy HH:mm', { locale: es }) : '—'}</TableCell>
                                        <TableCell>{s.edits_count}</TableCell>
                                        <TableCell>{s.raw_score}</TableCell>
                                        <TableCell>
                                            <Badge variant={s.is_zeroed ? 'destructive' : 'secondary'}>
                                                {s.is_zeroed ? 'Score 0 por penalización' : 'Sin penalización'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Reportes contra el Usuario */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Reportes contra el usuario</CardTitle>
                    <CardDescription>Reportes en los que este usuario fue reportado</CardDescription>
                </CardHeader>
                <CardContent>
                    {reportsAgainst.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sin reportes contra este usuario</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Challenge</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportsAgainst.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell>
                                            <Link href={route('dashboard.reports.show', r.id)} className="hover:underline">#{r.id}</Link>
                                        </TableCell>
                                        <TableCell className="max-w-[420px] truncate" title={r.reason}>{r.reason}</TableCell>
                                        <TableCell>
                                            {r.submission?.challenge ? (
                                                <Link href={route('dashboard.challenges.show', r.submission.challenge.id)} className="hover:underline">
                                                    {nl(r.submission.challenge.title)}
                                                </Link>
                                            ) : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={r.status === 'pending' ? 'destructive' : r.status === 'under_review' ? 'default' : r.status === 'resolved' ? 'outline' : 'secondary'}>
                                                {translateStatus(r.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{format(new Date(r.created_at), 'PPP', { locale: es })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Reportes realizados por el Usuario */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Reportes realizados por el usuario</CardTitle>
                    <CardDescription>Reportes que este usuario ha presentado</CardDescription>
                </CardHeader>
                <CardContent>
                    {reportsMade.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sin reportes realizados</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Challenge</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportsMade.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell>
                                            <Link href={route('dashboard.reports.show', r.id)} className="hover:underline">#{r.id}</Link>
                                        </TableCell>
                                        <TableCell className="max-w-[420px] truncate" title={r.reason}>{r.reason}</TableCell>
                                        <TableCell>
                                            {r.submission?.challenge ? (
                                                <Link href={route('dashboard.challenges.show', r.submission.challenge.id)} className="hover:underline">
                                                    {nl(r.submission.challenge.title)}
                                                </Link>
                                            ) : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={r.status === 'pending' ? 'destructive' : r.status === 'under_review' ? 'default' : r.status === 'resolved' ? 'outline' : 'secondary'}>
                                                {translateStatus(r.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{format(new Date(r.created_at), 'PPP', { locale: es })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Intentos Reservados */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Intentos reservados activos</CardTitle>
                    <CardDescription>Intentos que el usuario tiene reservados y aún no ha completado</CardDescription>
                </CardHeader>
                <CardContent>
                    {reservedAttempts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sin intentos reservados</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Challenge</TableHead>
                                    <TableHead>Intento #</TableHead>
                                    <TableHead>Tiene video</TableHead>
                                    <TableHead>Fecha reserva</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reservedAttempts.map(r => (
                                    <TableRow key={r.id}>
                                        <TableCell>#{r.id}</TableCell>
                                        <TableCell>{nl(r.challenge?.title) || '—'}</TableCell>
                                        <TableCell>{r.attempt_number}</TableCell>
                                        <TableCell>
                                            <Badge variant={r.has_video ? 'secondary' : 'outline'}>
                                                {r.has_video ? 'Sí' : 'No'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{r.reserved_at ? format(new Date(r.reserved_at), 'dd/MM/yyyy HH:mm', { locale: es }) : '—'}</TableCell>
                                        <TableCell>
                                            <Button 
                                                type="button" 
                                                variant="destructive" 
                                                size="sm" 
                                                className="transition-all hover:brightness-110 hover:shadow focus-visible:ring-ring/50" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    openReleaseDialog(r.id); 
                                                }}
                                            >
                                                Liberar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
            {/* ...existing code... */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar liberación</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esto eliminará el intento reservado seleccionado y liberará el slot para que el usuario pueda volver a reservarlo. Si había un video subido se intentará borrar. ¿Deseas continuar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={submitRelease}>
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppSidebarLayout>
    );
}
