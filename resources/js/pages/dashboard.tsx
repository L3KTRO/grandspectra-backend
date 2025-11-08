import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParticipationsChart } from '@/components/participations-chart';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { BarChart3, Calendar, Flag, Star, Trophy, Users } from 'lucide-react';

interface DashboardStats {
    total_users: number;
    total_challenges: number;
    active_seasons: number;
    pending_reports: number;
    total_invitation_codes: number;
    total_notifications: number;
}

interface ParticipationChartData {
    period: string;
    tiro: number;
    pase: number;
    otro: number;
    total_points: number;
}

interface DashboardProps {
    stats: DashboardStats;
    participationsChart: ParticipationChartData[];
}

export default function Dashboard({ stats, participationsChart }: DashboardProps) {
    return (
        <AppSidebarLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Bienvenido al panel de administración</p>
                </div>

                {/* Estadísticas principales */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.total_users || 0}</div>
                            <p className="text-xs text-muted-foreground">Usuarios registrados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Challenges</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.total_challenges || 0}</div>
                            <p className="text-xs text-muted-foreground">Challenges creados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Reportes Pendientes</CardTitle>
                            <Flag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats?.pending_reports || 0}</div>
                            <p className="text-xs text-muted-foreground">Requieren atención</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Códigos de Invitación</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats?.total_invitation_codes || 0}</div>
                            <p className="text-xs text-muted-foreground">Códigos creados</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Guía funcional (no técnica) */}
                <div>
                    <h2 className="text-2xl font-semibold">Cómo se organiza la plataforma</h2>
                    <p className="text-sm text-muted-foreground mb-4">Resumen sencillo de las secciones que gestionas desde este panel.</p>

                    {/* Card explicativo sobre los items del footer del sidebar */}
                    <Card className="col-span-1 md:col-span-2 lg:col-span-3 mb-4">
                        <CardHeader>
                            <CardTitle>Rutas públicas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">En el pie del menú lateral encontrarás accesos rápidos que redirigen a cada página visible para todos los usuarios. A continuación se explica brevemente cada uno:</p>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                <li><strong>Checkout:</strong> Si accedes desde administrador, verás lo que ve el jugador y el scouter de manera conjunta. (Si accedes con un rol diferente, verás solo lo que te corresponde). Además, como administrador puedes comprar varias veces el mismo item (con fines de test).</li>
                                <li><strong>Registro de usuario:</strong> Acceso a la página de registro de nuevos usuarios.</li>
                                <li><strong>Handshake:</strong> Esta página es la que aparecería si un usuario accede a la página de pagos sin estar autenticado.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personas (Usuarios)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">Aquí ves a todos los perfiles registrados: jugadores, scouters, y administradores. Desde su ficha puedes revisar actividad, actualizar datos, o eliminarlo.</p>
                                <p className="text-xs text-muted-foreground">Los usuarios borrados permanecerán en la sección de eliminados hasta que decidas eliminarlos definitivamente (esto conlleva el borrado de toda la información relacionada con el usuario como participaciones, etc.).</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Challenges</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Los retos que los jugadores completan subiendo sus intentos. Cada desafío pertenece a una temporada y aporta puntos al ranking.</p>
                                <p className="text-sm text-muted-foreground">No puede haber más de un challenge activo al mismo tiempo, habrán restricciones al poner las fechas de los desafíos.</p>
                                <p className="text-xs text-muted-foreground">Los challenges eliminados conllevan el borrado de toda la información relacionada con el challenges como participaciones.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Participaciones</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Cada vez que un jugador completa un reto se genera una participación. Si desde el panel un administrador modifica una participación, se guarda un registro (log) con los cambios realizados.</p>
                                <p className="text-xs text-muted-foreground">Editar varias veces la misma participación no multiplica las penalizaciones: se considera como 1 edición. De todas las participaciones de un jugador, la última es la que cuenta y puntúa; las anteriores quedan en estado "standby".</p>
                            </CardContent>
                        </Card>

                        {/* Card explicativo Pagos */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pagos</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Esta pantalla es read-only para visualizar los pagos de cada usuario.</p>
                                <p className="text-sm text-muted-foreground">Los pagos son gestionados por Redsys, y la plataforma no almacena datos sensibles de tarjetas de crédito.</p>
                                <p className="text-sm text-muted-foreground">Se ha agregado un bloqueo de borrado ante el borrado definitivo de un usuario. La información del pago persistirá aunque sin la relación del usuario.</p>
                                <p className="text-xs text-muted-foreground">El pago se guarda con un snapshot con información básica del usuario para que sea fácilmente localizable</p>
                                <p className="text-xs text-muted-foreground">El estado "pending" significa que el usuario ha entrado a la pasarela y no ha efectuado el pago.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Intentos de participación</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Los intentos son las acciones de grabar y enviar un vídeo para un reto. Para evitar fraudes, al pulsar grabar se reserva un intento con una clave única y se invalidan otras reservas previas.</p>
                                <p className="text-xs text-muted-foreground">Si un usuario intenta evadir una grabación activa (por ejemplo intentando volver a grabar varias veces) ese intento quedará invalidado por mala fe.</p>
                                <p className="text-xs text-muted-foreground">Fases de un intento: reservado → vídeo subido → autoevaluación enviada. Si el vídeo se subió pero no se envió la autoevaluación (ej. el usuario salió), al volver al reto se le redirige de nuevo a completar la autoevaluación.</p>
                                <p className="text-xs text-muted-foreground">Como administrador, puedes liberar intentos reservados de cada usuario accediendo a su vista individual.</p>

                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Temporadas</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Etapas que agrupan desafíos y definen el periodo válido para acumular puntos y suscripciones.</p>
                                <p className="text-sm text-muted-foreground">No puede haber más de una temporada activa al mismo tiempo, habrán restricciones al poner las fechas de estas.</p>
                                <p className="text-xs text-muted-foreground">Cuando termina una temporada, se programa una limpieza de datos multimedia a los 2 días siguientes.</p>
                                <p className="text-xs text-muted-foreground">Puedes ejecutar esta limpieza manualmente si lo deseas, solo borrará los datos multimedia asociados a las temporadas expiradas en el momento en el que la ejecutes.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Códigos de Invitación</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Se generan automáticamente al marcar un usuario como influencer, código único de 8 caracteres por defecto y editable hasta 12 caracteres</p>
                                <p className="text-xs text-muted-foreground">Podrás ver los usuarios que usaron cada código</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Reportes</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Avisos enviados por jugadores/scouters cuando sospechan de trampas o contenido inapropiado en un intento.</p>
                            </CardContent>
                        </Card>

                        {/* Card explicativo Penalizaciones (automáticas) */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Penalizaciones</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Las penalizaciones se aplican de forma automática:</p>
                                <p className="text-xs text-muted-foreground">- 1 corrección no implica la corrección de esa participación</p>
                                <p className="text-xs text-muted-foreground">- 2 correcciones implica la anulación de puntuacion para ese challenge, los editados anteriormente y los editados siguientes</p>

                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Notificaciones automáticas</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Mensajes que la plataforma envía a los jugadores.</p>
                                <p className="text-xs text-muted-foreground">- Al recibir la penalización después de 2 ediciones</p>
                                <p className="text-xs text-muted-foreground">- Al haber un nuevo challenge disponible</p>
                                <p className="text-xs text-muted-foreground">- Al estar próximo a finalizar un challenge</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Normas de uso</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <p className="text-sm text-muted-foreground">Antes de que un jugador pueda grabar un intento con su cámara, se le muestran las normas de uso que debe aceptar. Estas normas explican qué está permitido, qué no, y las consecuencias de incumplirlas.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
