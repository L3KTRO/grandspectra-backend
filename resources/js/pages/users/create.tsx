import { Head, useForm } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, CheckCircle, Loader2, CalendarIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Option {
    value: string;
    label: string;
}

interface CreateUserProps {
    roles: Option[];
    jerseySizes: Option[];
    genders: Option[];
}

export default function CreateUser({ roles, jerseySizes, genders }: CreateUserProps) {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        alias: '',
        role: '',
        is_active: true,
        is_influencer: false,
        birth_date: '',
        gender: '',
        jersey_name: '',
        jersey_number: '',
        jersey_size: '',
        shipping_address: '',
        avatar: null as File | null,
        guardian_first_name: '',
        guardian_last_name: '',
        guardian_dni: '',
        guardian_consent: false as boolean,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setShowErrorAlert(false);

        post(route('dashboard.users.store'), {
            onSuccess: () => {
                setShowSuccessDialog(true);
            },
            onError: () => {
                setErrorMessage('Por favor, verifica los campos marcados en rojo');
                setShowErrorAlert(true);
            }
        });
    };

    const handleBirthDateChange = (date: Date | undefined) => {
        if (date) {
            setBirthDate(date);
            setData('birth_date', format(date, 'yyyy-MM-dd'));
        }
    };

    const isMinor = (() => {
        if (!birthDate) return false;
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age < 18;
    })();

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Usuarios', href: route('dashboard.users.index') },
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
                        <Link href={route('dashboard.users.index')}>Volver a Usuarios</Link>
                    </Button>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Información del Usuario</CardTitle>
                            <CardDescription>Completa todos los campos para crear un nuevo usuario en el sistema.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                    <p className="text-xs text-muted-foreground">Imagen cuadrada recomendada (&lt;=2MB). Se mostrará en listados y submissions.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center">
                                        Nombre y Apellidos <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Nombre completo del usuario"
                                            className={errors.name ? 'border-destructive focus:ring-destructive/50' : ''}
                                            aria-invalid={errors.name ? 'true' : 'false'}
                                            aria-describedby={errors.name ? 'name-error' : undefined}
                                        />
                                    </div>
                                    {errors.name && (
                                        <span id="name-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="alias" className="flex items-center">
                                        Alias <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="alias"
                                            type="text"
                                            value={data.alias}
                                            onChange={(e) => setData('alias', e.target.value)}
                                            placeholder="Alias o nombre de usuario"
                                            className={errors.alias ? 'border-destructive focus:ring-destructive/50' : ''}
                                            aria-invalid={errors.alias ? 'true' : 'false'}
                                            aria-describedby={errors.alias ? 'alias-error' : undefined}
                                        />
                                    </div>
                                    {errors.alias && (
                                        <span id="alias-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.alias}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center">
                                        Email <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="correo@ejemplo.com"
                                            className={errors.email ? 'border-destructive focus:ring-destructive/50' : ''}
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                            aria-describedby={errors.email ? 'email-error' : undefined}
                                        />
                                    </div>
                                    {errors.email && (
                                        <span id="email-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.email}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birth_date" className="flex items-center">
                                        Fecha de Nacimiento <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="birth_date"
                                                type="button"
                                                variant="outline"
                                                className={cn(
                                                    'w-full pl-3 text-left font-normal',
                                                    errors.birth_date ? 'border-destructive focus:ring-destructive/50' : '',
                                                )}
                                                aria-invalid={errors.birth_date ? 'true' : 'false'}
                                                aria-describedby={errors.birth_date ? 'birth-date-error' : undefined}
                                            >
                                                {birthDate ? format(birthDate, 'PPP', { locale: es }) : <span>Selecciona una fecha</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={birthDate}
                                                onSelect={handleBirthDateChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <p className="text-xs text-muted-foreground">
                                        La fecha de nacimiento determina la categoría y verifica si es menor de edad
                                    </p>
                                    {errors.birth_date && (
                                        <span id="birth-date-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.birth_date}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="gender" className="flex items-center">
                                        Sexo <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                        <SelectTrigger
                                            id="gender"
                                            className={errors.gender ? 'border-destructive focus:ring-destructive/50' : ''}
                                            aria-invalid={errors.gender ? 'true' : 'false'}
                                            aria-describedby={errors.gender ? 'gender-error' : undefined}
                                        >
                                            <SelectValue placeholder="Selecciona el sexo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {genders.map((g) => (
                                                <SelectItem key={g.value} value={g.value}>
                                                    {g.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">El sexo determina la categoría en la que competirá</p>
                                    {errors.gender && (
                                        <span id="gender-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.gender}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role" className="flex items-center">
                                        Rol <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                        <SelectTrigger
                                            id="role"
                                            className={errors.role ? 'border-destructive focus:ring-destructive/50' : ''}
                                            aria-invalid={errors.role ? 'true' : 'false'}
                                            aria-describedby={errors.role ? 'role-error' : undefined}
                                        >
                                            <SelectValue placeholder="Selecciona un rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.value} value={role.value}>
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <span id="role-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.role}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="flex items-center">
                                        Contraseña <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Mínimo 8 caracteres"
                                            className={errors.password ? 'border-destructive focus:ring-destructive/50' : ''}
                                            aria-invalid={errors.password ? 'true' : 'false'}
                                            aria-describedby={errors.password ? 'password-error' : 'password-desc'}
                                        />
                                    </div>
                                    <p id="password-desc" className="text-xs text-muted-foreground">
                                        La contraseña debe tener al menos 8 caracteres
                                    </p>
                                    {errors.password && (
                                        <span id="password-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.password}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="flex items-center">
                                        Confirmar Contraseña <span className="ml-1 text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Repite la contraseña"
                                            className={errors.password_confirmation ? 'border-destructive focus:ring-destructive/50' : ''}
                                            aria-invalid={errors.password_confirmation ? 'true' : 'false'}
                                            aria-describedby={errors.password_confirmation ? 'confirmation-error' : undefined}
                                        />
                                    </div>
                                    {errors.password_confirmation && (
                                        <span id="confirmation-error" className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.password_confirmation}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-border pt-4">
                                <h3 className="mb-2 text-lg font-semibold">Welcome Pack</h3>
                                <p className="mb-4 text-sm text-muted-foreground">Datos para el envío del paquete de bienvenida al jugador.</p>

                                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="jersey_name">Nombre para la Camiseta</Label>
                                        <Input
                                            id="jersey_name"
                                            value={data.jersey_name}
                                            onChange={(e) => setData('jersey_name', e.target.value)}
                                            placeholder="Nombre que aparecerá en la camiseta"
                                        />
                                        {errors.jersey_name && (
                                            <span className="flex items-center text-sm text-destructive">
                                                <AlertCircle className="mr-1 h-3 w-3" />
                                                {errors.jersey_name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jersey_number">Número Dorsal</Label>
                                        <Input
                                            id="jersey_number"
                                            value={data.jersey_number}
                                            onChange={(e) => setData('jersey_number', e.target.value)}
                                            placeholder="Número para la camiseta (máx. 2 dígitos)"
                                            maxLength={2}
                                        />
                                        {errors.jersey_number && (
                                            <span className="flex items-center text-sm text-destructive">
                                                <AlertCircle className="mr-1 h-3 w-3" />
                                                {errors.jersey_number}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="jersey_size">Talla de Camiseta</Label>
                                        <Select value={data.jersey_size} onValueChange={(value) => setData('jersey_size', value)}>
                                            <SelectTrigger id="jersey_size">
                                                <SelectValue placeholder="Selecciona una talla" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jerseySizes.map((size) => (
                                                    <SelectItem key={size.value} value={size.value}>
                                                        {size.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.jersey_size && (
                                            <span className="flex items-center text-sm text-destructive">
                                                <AlertCircle className="mr-1 h-3 w-3" />
                                                {errors.jersey_size}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="shipping_address">Dirección de Envío</Label>
                                    <textarea
                                        id="shipping_address"
                                        value={data.shipping_address}
                                        onChange={(e) => setData('shipping_address', e.target.value)}
                                        placeholder="Dirección completa para el envío del welcome pack"
                                        rows={3}
                                        className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    {errors.shipping_address && (
                                        <span className="flex items-center text-sm text-destructive">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            {errors.shipping_address}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Consentimiento de Menores - Mostrar si es menor */}
                            {isMinor && (
                                <div className="border-t border-border pt-4">
                                    <h3 className="mb-2 text-lg font-semibold">Consentimiento de Menores</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">Rellena los datos del tutor legal que autorizó el registro del menor.</p>
                                    
                                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="guardian_first_name">Nombre del tutor</Label>
                                            <Input
                                                id="guardian_first_name"
                                                value={data.guardian_first_name}
                                                onChange={(e) => setData('guardian_first_name', e.target.value)}
                                                placeholder="Nombre del tutor legal"
                                            />
                                            {errors.guardian_first_name && (
                                                <span className="flex items-center text-sm text-destructive">
                                                    <AlertCircle className="mr-1 h-3 w-3" />
                                                    {errors.guardian_first_name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="guardian_last_name">Apellidos del tutor</Label>
                                            <Input
                                                id="guardian_last_name"
                                                value={data.guardian_last_name}
                                                onChange={(e) => setData('guardian_last_name', e.target.value)}
                                                placeholder="Apellidos del tutor legal"
                                            />
                                            {errors.guardian_last_name && (
                                                <span className="flex items-center text-sm text-destructive">
                                                    <AlertCircle className="mr-1 h-3 w-3" />
                                                    {errors.guardian_last_name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="guardian_dni">DNI Tutor</Label>
                                            <Input
                                                id="guardian_dni"
                                                value={data.guardian_dni}
                                                onChange={(e) => setData('guardian_dni', e.target.value.toUpperCase())}
                                                placeholder="12345678A"
                                            />
                                            {errors.guardian_dni && (
                                                <span className="flex items-center text-sm text-destructive">
                                                    <AlertCircle className="mr-1 h-3 w-3" />
                                                    {errors.guardian_dni}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-2 pt-6">
                                            <Checkbox
                                                id="guardian_consent"
                                                checked={data.guardian_consent}
                                                onCheckedChange={(checked) => setData('guardian_consent', checked ? true : false)}
                                            />
                                            <Label
                                                htmlFor="guardian_consent"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Confirmar consentimiento del tutor
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" asChild>
                                <Link href={route('dashboard.users.index')}>Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {processing ? 'Creando...' : 'Crear Usuario'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Alerta de error */}
                {showErrorAlert && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
            </div>

            {/* Diálogo de éxito */}
            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            Usuario creado con éxito
                        </DialogTitle>
                        <DialogDescription>El nuevo usuario ha sido creado correctamente en el sistema.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                setShowSuccessDialog(false);
                                window.location.href = route('dashboard.users.index');
                            }}
                        >
                            Volver al listado
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppSidebarLayout>
    );
}
