import { Head, useForm } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { AlertCircle } from 'lucide-react';
import * as dashboardUsersRoutes from '@/routes/dashboard/users';
import { dashboard } from '@/routes';

export default function CreateUser() {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        is_admin: false,
        avatar: null as File | null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(dashboardUsersRoutes.store().url);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Usuarios', href: dashboardUsersRoutes.index().url },
                { title: 'Crear Usuario', active: true },
            ]}
        >
            <Head title="Crear Usuario" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Crear Nuevo Usuario</h1>
                        <p className="text-muted-foreground">Añade un nuevo usuario al sistema</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={dashboardUsersRoutes.index().url}>Volver a Usuarios</Link>
                    </Button>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Información del Usuario</CardTitle>
                            <CardDescription>Completa todos los campos para crear un nuevo usuario.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center">
                                        Nombre <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && (
                                        <span className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                    />
                                    {errors.username && (
                                        <span className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.username}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="email" className="flex items-center">
                                        Correo Electrónico <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && (
                                        <span className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.email}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="flex items-center">
                                        Contraseña <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    {errors.password && (
                                        <span className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.password}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="flex items-center">
                                        Confirmar Contraseña <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    {errors.password_confirmation && (
                                        <span className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.password_confirmation}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Avatar</Label>
                                    <Input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                                    />
                                    {errors.avatar && (
                                        <span className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.avatar}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2 md:col-span-2">
                                    <Checkbox
                                        id="is_admin"
                                        checked={data.is_admin}
                                        onCheckedChange={(checked) => setData('is_admin', checked === true)}
                                    />
                                    <Label
                                        htmlFor="is_admin"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Usuario Administrador
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" asChild>
                                <Link href={dashboardUsersRoutes.index().url}>Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creando...' : 'Crear Usuario'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
