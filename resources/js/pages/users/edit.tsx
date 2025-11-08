import { Head, useForm } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarIcon, AtSign } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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

interface User {
    id: number;
    name: string;
    email: string;
    is_influencer: boolean;
    role: string;
    alias?: string;
    birth_date?: string;
    gender?: string;
    jersey_name?: string;
    jersey_number?: string;
    jersey_size?: string;
    shipping_address?: string;
    avatar?: string | null;
    guardian_first_name?: string;
    guardian_last_name?: string;
    guardian_dni?: string;
    guardian_consent?: boolean;
}

interface Option {
    value: string;
    label: string;
}

interface EditUserProps {
    user: User;
    roles: Option[];
    genders: Option[];
    jerseySizes: Option[];
}

export default function EditUser({ user, roles, genders, jerseySizes }: EditUserProps) {
    const [birthDate, setBirthDate] = useState<Date | undefined>(
        user.birth_date ? new Date(user.birth_date) : undefined
    );

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        is_influencer: user.is_influencer ? '1' : '0',
        role: user.role,
        // El controlador ya envía alias "raw" (sin @)
        alias: user.alias || '',
        birth_date: user.birth_date || '',
        gender: user.gender || '',
        // Campos welcome pack
        jersey_name: user.jersey_name || '',
        jersey_number: user.jersey_number || '',
        jersey_size: user.jersey_size || '',
        shipping_address: user.shipping_address || '',
        avatar_base64: '' as string, // data URI
        remove_avatar: false as boolean,
        // Campos tutor legal
        guardian_first_name: user.guardian_first_name || '',
        guardian_last_name: user.guardian_last_name || '',
        guardian_dni: user.guardian_dni || '',
        guardian_consent: user.guardian_consent || false,
    });
    // Validación de formato de alias
    const validateAliasFormat = (value: string): boolean => {
        const aliasRegex = /^[a-zA-Z0-9._]+$/;
        return aliasRegex.test(value);
    };

    // Manejador para el alias: quitar '@' si lo escriben y validar formato
    const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value || '';
        if (value.startsWith('@')) value = value.substring(1);
        if (value === '' || validateAliasFormat(value)) {
            setData('alias', value);
        }
    };


    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Envío JSON normal; avatar ya va en base64 si se seleccionó
        put(route('dashboard.users.update', user.id));
    };

    const handleAvatarChange = (file?: File) => {
        if (!file) {
            setData('avatar_base64', '');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // Validar que sea data:image
            if (!result.startsWith('data:image/')) return;
            setData('avatar_base64', result);
        };
        reader.readAsDataURL(file);
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
                { title: 'Editar Usuario', active: true },
            ]}
        >
            <Head title="Editar Usuario" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Editar Usuario</h1>
                <Button variant="outline" asChild>
                    <Link href={route('dashboard.users.index')}>Volver</Link>
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
                                                    setData('remove_avatar', e.target.checked ? true : false);
                                                    if (e.target.checked) setData('avatar_base64', '');
                                                }}
                                            />
                                            Eliminar avatar actual
                                        </label>
                                    )}
                                    <p className="text-xs text-muted-foreground">Formato JPG/PNG, máx 2MB.</p>
                                    <input type="hidden" name="avatar_base64" value={data.avatar_base64} />
                                </div>
                            </div>
                            {errors.avatar_base64 && (
                                <p className="text-sm text-destructive">{errors.avatar_base64}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre y Apellidos</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="alias">Alias</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <AtSign className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <Input
                                        id="alias"
                                        name="alias"
                                        value={data.alias}
                                        onChange={handleAliasChange}
                                        placeholder="tu_alias"
                                        className="pl-9"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Solo letras, números, puntos y guiones bajos</p>
                                {errors.alias && (
                                    <p className="text-sm text-destructive">{errors.alias}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="birth_date"
                                            name="birth_date_display"
                                            type="button"
                                            variant="outline"
                                            className={cn(
                                                'w-full pl-3 text-left font-normal',
                                                errors.birth_date ? 'border-destructive' : ''
                                            )}
                                        >
                                            {birthDate ? (
                                                format(birthDate, 'PPP', { locale: es })
                                            ) : (
                                                <span>Selecciona una fecha</span>
                                            )}
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
                                    La fecha de nacimiento determina la categoría y si es menor de edad
                                </p>
                                {errors.birth_date && (
                                    <p className="text-sm text-destructive">{errors.birth_date}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="gender">Sexo</Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(value) => setData('gender', value)}
                                >
                                    <SelectTrigger name="gender">
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
                                <p className="text-xs text-muted-foreground">
                                    El sexo determina la categoría en la que competirá
                                </p>
                                {errors.gender && (
                                    <p className="text-sm text-destructive">{errors.gender}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Rol</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(value) => setData('role', value)}
                                >
                                    <SelectTrigger name="role">
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
                                    <p className="text-sm text-destructive">{errors.role}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña (Dejar en blanco para mantener la actual)</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_influencer"
                                checked={data.is_influencer === '1'}
                                onCheckedChange={(checked) => setData('is_influencer', checked ? '1' : '0')}
                            />
                            <Label htmlFor="is_influencer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Marcar como Influencer
                            </Label>
                        </div>

                        {data.role !== 'observer' && (
                            <div className="pt-4 border-t border-border">
                                <h3 className="text-lg font-semibold mb-2">Welcome Pack</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Datos para el envío del paquete de bienvenida al jugador.
                                </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jersey_name">Nombre para la Camiseta</Label>
                                    <Input
                                        id="jersey_name"
                                        name="jersey_name"
                                        value={data.jersey_name}
                                        onChange={(e) => setData('jersey_name', e.target.value)}
                                        placeholder="Nombre que aparecerá en la camiseta"
                                    />
                                    {errors.jersey_name && (
                                        <p className="text-sm text-destructive">{errors.jersey_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jersey_number">Número Dorsal</Label>
                                    <Input
                                        id="jersey_number"
                                        name="jersey_number"
                                        value={data.jersey_number}
                                        onChange={(e) => setData('jersey_number', e.target.value)}
                                        placeholder="Número para la camiseta (máx. 2 dígitos)"
                                        maxLength={2}
                                    />
                                    {errors.jersey_number && (
                                        <p className="text-sm text-destructive">{errors.jersey_number}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jersey_size">Talla de Camiseta</Label>
                                    <Select
                                        value={data.jersey_size}
                                        onValueChange={(value) => setData('jersey_size', value)}
                                    >
                                        <SelectTrigger id="jersey_size" name="jersey_size">
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
                                        <p className="text-sm text-destructive">{errors.jersey_size}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="shipping_address">Dirección de Envío</Label>
                                <textarea
                                    id="shipping_address"
                                    name="shipping_address"
                                    value={data.shipping_address}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('shipping_address', e.target.value)}
                                    placeholder="Dirección completa para el envío del welcome pack"
                                    rows={3}
                                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {/* Hidden real birth_date & gender & role ensure fallback submit */}
                                <input type="hidden" name="birth_date" value={data.birth_date} />
                                <input type="hidden" name="gender" value={data.gender} />
                                <input type="hidden" name="role" value={data.role} />
                                <input type="hidden" name="is_influencer" value={data.is_influencer} />
                                <input type="hidden" name="remove_avatar" value={data.remove_avatar ? '1' : '0'} />
                                {errors.shipping_address && (
                                    <p className="text-sm text-destructive">{errors.shipping_address}</p>
                                )}
                            </div>
                            </div>
                        )}

                        {/* Consentimiento de Menores - Mostrar si es menor */}
                        {isMinor && (
                            <div className="pt-4 border-t border-border">
                                <h3 className="text-lg font-semibold mb-2">Consentimiento de Menores</h3>
                                <p className="text-sm text-muted-foreground mb-4">Rellena los datos del tutor legal que autorizó el registro del menor.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian_first_name">Nombre del tutor</Label>
                                        <Input id="guardian_first_name" name="guardian_first_name" value={data.guardian_first_name} onChange={(e) => setData('guardian_first_name', e.target.value)} />
                                        {errors.guardian_first_name && (
                                            <p className="text-sm text-destructive">{errors.guardian_first_name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian_last_name">Apellidos del tutor</Label>
                                        <Input id="guardian_last_name" name="guardian_last_name" value={data.guardian_last_name} onChange={(e) => setData('guardian_last_name', e.target.value)} />
                                        {errors.guardian_last_name && (
                                            <p className="text-sm text-destructive">{errors.guardian_last_name}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian_dni">DNI Tutor</Label>
                                        <Input id="guardian_dni" name="guardian_dni" value={data.guardian_dni} onChange={(e) => setData('guardian_dni', e.target.value.toUpperCase())} />
                                        {errors.guardian_dni && (
                                            <p className="text-sm text-destructive">{errors.guardian_dni}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="guardian_consent" checked={data.guardian_consent === true} onCheckedChange={(checked) => setData('guardian_consent', checked ? true : false)} />
                                        <Label htmlFor="guardian_consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Confirmar consentimiento del tutor</Label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('dashboard.users.index')}>Cancelar</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Guardando...' : 'Actualizar Usuario'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppSidebarLayout>
    );
}
