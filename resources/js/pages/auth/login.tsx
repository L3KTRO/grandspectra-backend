import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { showInfoToast, showSuccessToast, showWarningToast } from '@/hooks/use-sonner-toast';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Toaster } from '@/components/ui/sonner';
import password from '@/routes/password';
import { login } from '@/routes';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Prompt permission on user gesture to maximize chance of showing the browser dialog
        if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
            try {
                // Fire and forget; token registration happens onSuccess below
                Notification.requestPermission();
            } catch { }
        }
        post(login().url, {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Inicia sesión en tu cuenta" description="Introduce tu email y contraseña para iniciar sesión">
            <Head title="Iniciar sesión" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@ejemplo.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Contraseña</Label>
                            {canResetPassword && (
                                <TextLink href={password.request()} className="ml-auto text-sm" tabIndex={5}>
                                    ¿Olvidaste tu contraseña?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Contraseña"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Recuérdame</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Iniciar sesión
                    </Button>
                </div>

                {/*<div className="text-center text-sm text-muted-foreground">*/}
                {/*    Don't have an account?{' '}*/}
                {/*    <TextLink href={route('register')} tabIndex={5}>*/}
                {/*        Sign up*/}
                {/*    </TextLink>*/}
                {/*</div>*/}
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            <Toaster />
        </AuthLayout>
    );
}
