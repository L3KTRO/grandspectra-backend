import { Head, useForm, Link } from '@inertiajs/react';
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
import { FormEventHandler } from 'react';
import { User } from '@/types';
import * as dashboardUsersRoutes from '@/routes/dashboard/users';
import { dashboard } from '@/routes';
import { AtSign } from 'lucide-react';

interface EditUserProps {
    user: User;
}

interface EditFormData {
    name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
    is_admin: boolean;
    avatar_base64: string;
    remove_avatar: boolean;
}

export default function EditUser({ user }: EditUserProps) {
    const form = useForm({
        name: user.name,
        email: user.email,
        username: user.username as string,
        password: '',
        password_confirmation: '',
        is_admin: user.is_admin as boolean,
        avatar_base64: '',
        remove_avatar: false,
    });

    const { data, setData, put, processing, errors } = form;

    const validateUsernameFormat = (value: string): boolean => {
        const usernameRegex = /^[a-zA-Z0-9._]+$/;
        return usernameRegex.test(value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value || '';
        if (value.startsWith('@')) value = value.substring(1);
        if (value === '' || validateUsernameFormat(value)) {
            setData('username' as any, value);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(dashboardUsersRoutes.update({ user: user.id }).url);
    };

    const handleAvatarChange = (file?: File) => {
        if (!file) {
            setData('avatar_base64' as any, '');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            if (!result.startsWith('data:image/')) return;
            setData('avatar_base64' as any, result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: dashboard().url },
                { title: 'Usuarios', href: dashboardUsersRoutes.index().url },
                { title: 'Editar Usuario', active: true },
            ]}
        >
            <Head title="Editar Usuario" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Editar Usuario</h1>
                    <Button variant="outline" asChild>
                        <Link href={dashboardUsersRoutes.index().url}>Volver</Link>
                    </Button>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Información del Usuario</CardTitle>
                            <CardDescription>
                                Actualiza la información del usuario.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="avatar">Avatar</Label>
                                <div className="flex items-center gap-4">
                                    {user.avatar && !data.avatar_base64 && !data.remove_avatar && (
                                        <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover border" />
                                    )}
                                    {data.avatar_base64 && (
                                        <img
                                            src={data.avatar_base64}
                                            alt="preview"
                                            className="h-16 w-16 rounded-full object-cover border"
                                        />
                                    )}
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            id="avatar"
                                            name="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleAvatarChange(e.target.files && e.target.files[0] ? e.target.files[0] : undefined)}
                                        />
                                        {user.avatar && (
                                            <label className="flex items-center gap-2 text-xs">
                                                <input
                                                    type="checkbox"
                                                    checked={!!data.remove_avatar}
                                                    onChange={(e) => {
                                                        setData('remove_avatar' as any, e.target.checked ? true : false);
                                                        if (e.target.checked) setData('avatar_base64' as any, '');
                                                    }}
                                                />
                                                Eliminar avatar actual
                                            </label>
                                        )}
                                        <p className="text-xs text-muted-foreground">Formato JPG/PNG, máx 2MB.</p>
                                        <input type="hidden" name="avatar_base64" value={data.avatar_base64} />
                                    </div>
                                </div>
                                {(errors as any).avatar_base64 && (
                                    <p className="text-sm text-destructive">{(errors as any).avatar_base64}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name' as any, e.target.value)}
                                        required
                                    />
                                    {(errors as any).name && (
                                        <p className="text-sm text-destructive">{(errors as any).name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <AtSign className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <Input
                                            id="username"
                                            name="username"
                                            value={data.username}
                                            onChange={handleUsernameChange}
                                            placeholder="username"
                                            className="pl-9"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Solo letras, números, puntos y guiones bajos</p>
                                    {(errors as any).username && (
                                        <p className="text-sm text-destructive">{(errors as any).username}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email' as any, e.target.value)}
                                    required
                                />
                                {(errors as any).email && (
                                    <p className="text-sm text-destructive">{(errors as any).email}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña (opcional)</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password' as any, e.target.value)}
                                        placeholder="Dejar en blanco para mantener la actual"
                                    />
                                    {(errors as any).password && (
                                        <p className="text-sm text-destructive">{(errors as any).password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation' as any, e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_admin"
                                    checked={data.is_admin}
                                    onCheckedChange={(checked) => setData('is_admin' as any, checked as boolean)}
                                />
                                <Label htmlFor="is_admin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Administrador
                                </Label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="outline" asChild>
                                <Link href={dashboardUsersRoutes.index().url}>Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Actualizar Usuario'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
