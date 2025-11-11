import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { Film, Tv, Users, Star, Eye, Bookmark, ListChecks, MessageSquare } from 'lucide-react';

interface DashboardStats {
    users: number;
    movies: number;
    tv_shows: number;
    reviews: number;
    ratings: number;
    watchlists: number;
    watched: number;
    content_lists: number;
    recent_users: Array<{
        id: number;
        name: string;
        email: string;
        username: string;
        created_at: string;
    }>;
    recent_reviews: Array<{
        id: number;
        user_id: number;
        content: string;
        qualification: number;
        created_at: string;
        user: {
            id: number;
            name: string;
            username: string;
        };
    }>;
}

interface DashboardProps {
    stats: DashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppSidebarLayout>
            <Head title="Dashboard - Grand Spectra" />

            <div className="space-y-6">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
                    <h1 className="text-4xl font-bold mb-2">🎬 Grand Spectra 🍿</h1>
                    <p className="text-xl font-medium mb-4">"La red social definitiva para amantes del cine y las series"</p>
                    <p className="text-sm opacity-90">Panel de Administración</p>
                </div>

                {/* Descripción del Proyecto */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">¿Qué es Grand Spectra?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-muted-foreground">
                            <strong>Grand Spectra</strong> es una plataforma web moderna construida con <strong>Laravel 12 + React + TypeScript</strong>,
                            diseñada especialmente para los apasionados del cine y las series. Una red social donde los cinéfilos pueden descubrir
                            nuevo contenido, gestionar sus listas personales, seguir a otros usuarios y compartir sus opiniones con la comunidad.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            <div className="flex items-start gap-2">
                                <div className="text-purple-600 mt-1">✓</div>
                                <div>
                                    <strong>Spectra Hub:</strong> Búsqueda en más de 1 millón de películas y series
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="text-purple-600 mt-1">✓</div>
                                <div>
                                    <strong>Base de datos TMDB local:</strong> Velocidad y rendimiento optimizados
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="text-purple-600 mt-1">✓</div>
                                <div>
                                    <strong>Sistema social:</strong> Seguir usuarios y compartir gustos
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="text-purple-600 mt-1">✓</div>
                                <div>
                                    <strong>Gestión personal:</strong> Watchlists, vistas, calificaciones y reseñas
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Estadísticas del Catálogo */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">📊 Estadísticas del Catálogo</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Películas</CardTitle>
                                <Film className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-600">{stats?.movies?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">En la base de datos</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Series de TV</CardTitle>
                                <Tv className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-pink-600">{stats?.tv_shows?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">En la base de datos</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">{stats?.users?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">Cinéfilos en la plataforma</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Reseñas</CardTitle>
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{stats?.reviews?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">Opiniones compartidas</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Actividad de Usuarios */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">👥 Actividad de Usuarios</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Calificaciones</CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">{stats?.ratings?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">Contenidos valorados</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Marcados Como Vistos</CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-teal-600">{stats?.watched?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">Contenidos completados</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">En Watchlist</CardTitle>
                                <Bookmark className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">{stats?.watchlists?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">Para ver después</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Listas Personalizadas</CardTitle>
                                <ListChecks className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-indigo-600">{stats?.content_lists?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">Colecciones creadas</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Funcionalidades Principales */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">🌟 Funcionalidades de la Plataforma</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-purple-600" />
                                    Gestión de Usuarios
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Desde este panel puedes administrar todos los usuarios registrados en la plataforma. Visualiza perfiles,
                                    actividad, y gestiona permisos de administrador.
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Crear, editar y eliminar usuarios</li>
                                    <li>Asignar roles de administrador</li>
                                    <li>Ver actividad reciente de cada usuario</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Film className="h-5 w-5 text-pink-600" />
                                    Spectra Hub
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Motor de búsqueda potente con acceso a más de 1 millón de películas y series. Los usuarios pueden:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Buscar contenido por título, género o actor</li>
                                    <li>Ver información detallada: sinopsis, reparto, crew</li>
                                    <li>Añadir a watchlist o marcar como visto</li>
                                    <li>Calificar y escribir reseñas</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-600" />
                                    Calificaciones y Reseñas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Los usuarios pueden compartir sus opiniones sobre películas y series que han visto.
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Sistema de calificación con estrellas</li>
                                    <li>Reseñas detalladas con texto libre</li>
                                    <li>Moderación de contenido desde el panel</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bookmark className="h-5 w-5 text-orange-600" />
                                    Watchlists Personales
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Cada usuario puede mantener su propia lista de contenido pendiente por ver.
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Añadir películas y series rápidamente</li>
                                    <li>Gestionar y organizar su watchlist</li>
                                    <li>Marcar como visto cuando completen el contenido</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ListChecks className="h-5 w-5 text-indigo-600" />
                                    Listas Personalizadas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Los usuarios pueden crear colecciones temáticas de películas y series.
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Crear listas con nombres personalizados</li>
                                    <li>Añadir múltiples contenidos a cada lista</li>
                                    <li>Compartir listas con otros usuarios</li>
                                    <li>Votar listas de otros usuarios</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    Red Social
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Funcionalidades sociales para conectar cinéfilos con gustos similares.
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Seguir a otros usuarios</li>
                                    <li>Ver actividad de usuarios seguidos</li>
                                    <li>Descubrir nuevos perfiles</li>
                                    <li>Sistema de notificaciones</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tecnologías */}
                <Card>
                    <CardHeader>
                        <CardTitle>🛠️ Stack Tecnológico</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-secondary rounded-lg">
                                <div className="font-bold text-lg">Laravel 12</div>
                                <div className="text-xs text-muted-foreground">Backend Framework</div>
                            </div>
                            <div className="text-center p-3 bg-secondary rounded-lg">
                                <div className="font-bold text-lg">React + TypeScript</div>
                                <div className="text-xs text-muted-foreground">Frontend</div>
                            </div>
                            <div className="text-center p-3 bg-secondary rounded-lg">
                                <div className="font-bold text-lg">Inertia.js</div>
                                <div className="text-xs text-muted-foreground">SSR & Routing</div>
                            </div>
                            <div className="text-center p-3 bg-secondary rounded-lg">
                                <div className="font-bold text-lg">MySQL + Redis</div>
                                <div className="text-xs text-muted-foreground">Database & Cache</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actividad Reciente */}
                {stats?.recent_users && stats.recent_users.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>👥 Usuarios Registrados Recientemente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {stats.recent_users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString('es-ES')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppSidebarLayout>
    );
}
