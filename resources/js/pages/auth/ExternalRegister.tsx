import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { AtSign, CalendarIcon, LoaderCircle } from 'lucide-react';
import { ChangeEvent, FormEventHandler, useEffect, useMemo, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { LanguageSelector } from '@/components/language-selector';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TranslationProvider, useTranslation } from '@/hooks/useTranslation';
import ExternalAuthLayout from '@/layouts/external-auth-layout';

type AgePolicyProps = {
    minimumSignupAge: number;
    maximumBirthDate: string;
};

type PageProps = {
    agePolicy: AgePolicyProps;
};

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    gender: string;
    birth_date: string;
    alias: string;
    role: string;
    avatar?: File | null;
    // Welcome Pack
    jersey_name: string;
    jersey_number: string;
    jersey_size: string;
    shipping_address: string;
    terms_accepted: boolean;
    // Invitation Code
    invitation_code?: string;
    // Legal guardian (only for minors)
    guardian_first_name?: string;
    guardian_last_name?: string;
    guardian_dni?: string;
    guardian_consent?: boolean;
};

function ExternalRegisterContent() {
    const { t, locale } = useTranslation();
    const { agePolicy } = usePage<PageProps>().props;
    const maxAllowedBirthDate = useMemo(() => {
        // En lugar de usar la fecha del backend, calculamos basándonos en el 31 de diciembre del año actual
        // Para edad mínima de 14 años: pueden registrarse quienes cumplan 14 antes o el 31/12/2025
        const today = new Date();
        const minimumAge = agePolicy?.minimumSignupAge || 14;
        
        // Fecha máxima: 31 de diciembre del año actual menos la edad mínima
        const maxDate = new Date(today.getFullYear() - minimumAge, 11, 31, 23, 59, 59);
        
        return maxDate;
    }, [agePolicy?.minimumSignupAge]);

    const { data, setData, post, processing, errors } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: '',
        birth_date: '',
        alias: '',
        role: 'player',
        avatar: null as unknown as File | null,
        // Welcome Pack
        jersey_name: '',
        jersey_number: '',
        jersey_size: 'M',
        shipping_address: '',
        terms_accepted: false,
        // Invitation Code
        invitation_code: '',
        // Guardian (menores)
        guardian_first_name: '',
        guardian_last_name: '',
        guardian_dni: '',
        guardian_consent: false,
    });

    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string>('/assets/icon.png');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isMinor, setIsMinor] = useState<boolean>(false);
    const [guardianDniError, setGuardianDniError] = useState<string>('');

    // Función para validar el formato del alias (letras, números, puntos, guiones bajos)
    const validateAliasFormat = (value: string): boolean => {
        const aliasRegex = /^[a-zA-Z0-9._]+$/;
        return aliasRegex.test(value);
    };

    // Manejador para el campo alias
    const handleAliasChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Eliminar el @ si el usuario lo incluye (lo mostraremos visualmente)
        if (value.startsWith('@')) {
            value = value.substring(1);
        }

        // Solo actualizar si cumple con el formato o está vacío
        if (value === '' || validateAliasFormat(value)) {
            setData('alias', value);
        }
    };

    const handleBirthDateChange = (date: Date | undefined) => {
        if (date && date > maxAllowedBirthDate) {
            return;
        }

        setBirthDate(date);
        if (date) {
            setData('birth_date', format(date, 'yyyy-MM-dd'));
            // Calcular si es menor de edad (<18)
            // Se considera menor si no cumplirá 18 años antes o el 31 de diciembre de este año
            const today = new Date();
            const endOfYear = new Date(today.getFullYear(), 11, 31); // 31 de diciembre de este año
            
            // Edad que tendrá al final del año (31 de diciembre)
            let ageAtEndOfYear = endOfYear.getFullYear() - date.getFullYear();
            
            // Si el cumpleaños es después del 31 de diciembre, no cumplirá años este año
            const birthMonth = date.getMonth();
            const birthDay = date.getDate();
            
            if (birthMonth > 11 || (birthMonth === 11 && birthDay > 31)) {
                // Esto nunca debería pasar ya que diciembre es mes 11 y tiene 31 días
                ageAtEndOfYear--;
            }
            
            // Si nació después del 31 de diciembre (imposible, pero por coherencia con backend)
            if (endOfYear.getMonth() < birthMonth || 
                (endOfYear.getMonth() === birthMonth && endOfYear.getDate() < birthDay)) {
                ageAtEndOfYear--;
            }
            
            const minor = ageAtEndOfYear < 18;
            setIsMinor(minor);
            
            if (!minor) {
                // Limpiar datos de tutor si deja de ser menor por cambio de fecha
                setData('guardian_first_name', '');
                setData('guardian_last_name', '');
                setData('guardian_dni', '');
                setData('guardian_consent', false as unknown as boolean);
                setGuardianDniError('');
            }
        } else {
            setIsMinor(false);
            setData('guardian_first_name', '');
            setData('guardian_last_name', '');
            setData('guardian_dni', '');
            setData('guardian_consent', false as unknown as boolean);
            setGuardianDniError('');
        }
    };

    const validateGuardianDni = (raw: string) => {
        if (raw.trim() === '') {
            setGuardianDniError('');
            return;
        }
        const value = raw.toUpperCase();
        if (!/^[0-9]{0,8}[A-Z]?$/.test(value)) {
            setGuardianDniError(t('register.guardianDniErrorFormat'));
            return;
        }
        if (/^[0-9]{8}[A-Z]$/.test(value)) {
            const numbers = value.substring(0, 8);
            const letter = value.substring(8);
            const lettersSeq = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const expected = lettersSeq[parseInt(numbers, 10) % 23];
            if (letter !== expected) {
                setGuardianDniError(t('register.guardianDniErrorLetter'));
                return;
            }
        }
        setGuardianDniError('');
    };

    const handleRoleChange = (value: string) => {
        setData('role', value);
        // Nota: solo ocultamos visualmente los campos cuando no es "player".
        // Si se desea limpiar los valores al cambiar a "observer",
        // se podría descomentar el bloque siguiente.
        // if (value !== 'player') {
        //     setData('invitation_code', '');
        //     setData('jersey_name', '');
        //     setData('jersey_number', '');
        //     setData('jersey_size', 'M');
        //     setData('shipping_address', '');
        // }
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files && e.currentTarget.files[0];
        setData('avatar', file ?? null);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl('/logo.svg');
        }
    };

    useEffect(() => {
        return () => {
            // revoke blob url if any
            if (previewUrl && previewUrl.startsWith('blob:')) {
                try {
                    URL.revokeObjectURL(previewUrl);
                } catch (e) {
                    // noop
                }
            }
        };
    }, [previewUrl]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('external.register'), { forceFormData: true });
    };

    return (
        <ExternalAuthLayout title={t('register.title')} description={t('register.description')}>
            <Head title={t('register.title')} />

            <div className="mb-4 flex justify-end">
                <LanguageSelector />
            </div>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                {/* Avatar selector - visible, circular preview */}
                <div className="flex justify-center">
                    <label htmlFor="avatar" className="cursor-pointer text-center">
                        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center border-4 border-gray-600 hover:border-gold transition">
                            <img
                                src={previewUrl}
                                id="__avatar_preview_img"
                                alt="Avatar preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mt-2 text-sm text-gray-300">{t('register.avatar')}</div>
                        <input
                            id="avatar"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            disabled={processing}
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                        />
                    </label>
                </div>

                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="font-medium text-white">
                            {t('register.name')}
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('register.namePlaceholder')}
                            className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-medium text-white">
                            {t('register.email')}
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('register.emailPlaceholder')}
                            className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="alias" className="font-medium text-white">
                            {t('register.alias')}
                        </Label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <AtSign className="h-5 w-5 text-gold" />
                            </div>
                            <Input
                                id="alias"
                                type="text"
                                required
                                value={data.alias}
                                onChange={handleAliasChange}
                                placeholder={t('register.aliasPlaceholder')}
                                className="border-gray-700 bg-gray-800 pl-10 text-white focus:border-gold focus:ring-gold"
                            />
                        </div>
                        <p className="text-xs text-gray-400">{t('register.aliasHelp')}</p>
                        <InputError message={errors.alias} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="font-medium text-white">
                            {t('register.password')}
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={t('register.passwordPlaceholder')}
                            className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="font-medium text-white">
                            {t('register.confirmPassword')}
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder={t('register.confirmPasswordPlaceholder')}
                            className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gender" className="font-medium text-white">
                            {t('register.gender')}
                        </Label>
                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                            <SelectTrigger className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold">
                                <SelectValue placeholder={t('register.genderPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent className="border-gray-800 bg-gray-900 text-white">
                                <SelectItem value="male" className="focus:bg-gold focus:text-white">
                                    {t('register.male')}
                                </SelectItem>
                                <SelectItem value="female" className="focus:bg-gold focus:text-white">
                                    {t('register.female')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.gender} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role" className="font-medium text-white">
                            {t('register.role')}
                        </Label>
                        <Select value={data.role} onValueChange={handleRoleChange}>
                            <SelectTrigger className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold">
                                <SelectValue placeholder={t('register.rolePlaceholder')} />
                            </SelectTrigger>
                            <SelectContent className="border-gray-800 bg-gray-900 text-white">
                                <SelectItem value="player" className="focus:bg-gold focus:text-white">
                                    {t('register.player')}
                                </SelectItem>
                                <SelectItem value="scouter" className="focus:bg-gold focus:text-white">
                                    {t('register.observer')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="birth_date" className="font-medium text-white">
                            {t('register.birthDate')}
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="birth_date"
                                    type="button"
                                    variant="outline"
                                    className="w-full justify-start border-gray-700 bg-gray-800 text-left font-normal text-white hover:bg-gray-700"
                                    style={{
                                        borderColor: errors.birth_date ? 'rgb(239, 68, 68)' : 'rgb(55, 65, 81)',
                                        boxShadow: errors.birth_date ? '0 0 0 1px rgb(239, 68, 68)' : undefined,
                                    }}
                                >
                                    {birthDate ? (
                                        format(
                                            birthDate,
                                            locale === 'es' ? "d 'de' MMMM 'de' yyyy" : 'MMMM d, yyyy',
                                            { locale: locale === 'es' ? es : enUS }
                                        )
                                    ) : (
                                        <span className="text-gray-400">{t('register.birthDatePlaceholder')}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 text-gold opacity-70" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto border-gray-700 bg-gray-800 p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={birthDate}
                                    onSelect={handleBirthDateChange}
                                    initialFocus
                                    endMonth={maxAllowedBirthDate}
                                    disabled={(date) => date > maxAllowedBirthDate}
                                    locale={locale === 'es' ? es : enUS}
                                    className="border-gold-500"
                                    classNames={{
                                        day_selected: 'bg-gold text-white',
                                        day_today: 'bg-gray-600 text-white',
                                        button_reset: 'text-gold hover:text-gold-300',
                                        week: 'flex w-full mt-2',
                                        day: 'relative h-9 w-9 p-0 text-center flex-none group/day aspect-square select-none',
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.birth_date} />
                    </div>

                    {/* Datos tutor legal - solo si menor de edad */}
                    {isMinor && (
                        <div className="mt-2 space-y-4 rounded-md border border-yellow-700/40 bg-yellow-900/10 p-4">
                            <h4 className="text-sm font-semibold text-gold">{t('register.guardianTitle')}</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="guardian_first_name" className="font-medium text-white">
                                        {t('register.guardianFirstName')}
                                    </Label>
                                    <Input
                                        id="guardian_first_name"
                                        type="text"
                                        required={isMinor}
                                        value={data.guardian_first_name}
                                        onChange={(e) => setData('guardian_first_name', e.target.value)}
                                        placeholder={t('register.guardianFirstNamePlaceholder')}
                                        className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                                    />
                                    <InputError message={errors.guardian_first_name as string} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="guardian_last_name" className="font-medium text-white">
                                        {t('register.guardianLastName')}
                                    </Label>
                                    <Input
                                        id="guardian_last_name"
                                        type="text"
                                        required={isMinor}
                                        value={data.guardian_last_name}
                                        onChange={(e) => setData('guardian_last_name', e.target.value)}
                                        placeholder={t('register.guardianLastNamePlaceholder')}
                                        className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                                    />
                                    <InputError message={errors.guardian_last_name as string} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="guardian_dni" className="font-medium text-white">
                                    {t('register.guardianDni')}
                                </Label>
                                <Input
                                    id="guardian_dni"
                                    type="text"
                                    required={isMinor}
                                    value={data.guardian_dni}
                                    onChange={(e) => {
                                        const v = e.target.value.toUpperCase();
                                        // Limitar a 9 caracteres (8 + letra)
                                        if (v.length <= 9) {
                                            setData('guardian_dni', v);
                                            validateGuardianDni(v);
                                        }
                                    }}
                                    placeholder={t('register.guardianDniPlaceholder')}
                                    className="border-gray-700 bg-gray-800 text-white uppercase tracking-wide focus:border-gold focus:ring-gold"
                                />
                                <p className="text-xs text-gray-400">{t('register.guardianDniHelp')}</p>
                                <InputError message={guardianDniError || (errors.guardian_dni as string)} />
                            </div>
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="guardian_consent"
                                    checked={data.guardian_consent === true}
                                    required={isMinor}
                                    onCheckedChange={(checked) => setData('guardian_consent', checked === true ? true : false)}
                                    style={{
                                        borderColor: data.guardian_consent ? '#ECD38A' : '#503C11',
                                        backgroundColor: data.guardian_consent ? '#C8962A' : '#140F04',
                                        color: data.guardian_consent ? 'white' : undefined,
                                    }}
                                />
                                <Label htmlFor="guardian_consent" className="text-xs text-white/90 leading-relaxed">
                                    {t('register.guardianConsent')}{' '}
                                    <a
                                        href="/consentimiento-menores"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gold underline-offset-2 hover:underline"
                                        style={{ fontWeight: 600 }}
                                    >
                                        {t('register.guardianConsentLink')}
                                    </a>.
                                </Label>
                            </div>
                            <InputError message={errors.guardian_consent as string} />
                        </div>
                    )}

                    {/* Invitation Code - Solo para Jugador */}
                    {data.role === 'player' && (
                        <div className="grid gap-2">
                            <Label htmlFor="invitation_code" className="font-medium text-white">
                                {t('register.invitationCode')}
                            </Label>
                            <Input
                                id="invitation_code"
                                type="text"
                                required
                                value={data.invitation_code ?? ''}
                                onChange={(e) => setData('invitation_code', e.target.value.toUpperCase())}
                                placeholder={t('register.invitationCodePlaceholder')}
                                className="border-gray-700 bg-gray-800 tracking-wider text-white uppercase focus:border-gold focus:ring-gold"
                            />
                            <InputError message={errors.invitation_code} />
                        </div>
                    )}

                    {/* Welcome Pack - Solo para Jugador */}
                    {data.role === 'player' && (
                        <div className="mt-6 mb-4">
                            <h3 className="mb-2 text-lg font-bold text-gold">{t('register.welcomePackTitle')}</h3>
                            <p className="mb-4 text-sm text-white/80">
                                {t('register.welcomePackDescription')}
                            </p>

                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="jersey_name" className="font-medium text-white">
                                        {t('register.jerseyName')}
                                    </Label>
                                    <Input
                                        id="jersey_name"
                                        type="text"
                                        value={data.jersey_name}
                                        onChange={(e) => setData('jersey_name', e.target.value)}
                                        placeholder={t('register.jerseyNamePlaceholder')}
                                        className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                                    />
                                    <InputError message={errors.jersey_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="jersey_number" className="font-medium text-white">
                                        {t('register.jerseyNumber')}
                                    </Label>
                                    <Input
                                        id="jersey_number"
                                        type="text"
                                        value={data.jersey_number}
                                        onChange={(e) => {
                                            // Solo permitir números
                                            if (/^\d*$/.test(e.target.value)) {
                                                setData('jersey_number', e.target.value);
                                            }
                                        }}
                                        placeholder={t('register.jerseyNumberPlaceholder')}
                                        className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                                    />
                                    <p className="text-xs text-gray-400">{t('register.jerseyNumberHelp')}</p>
                                    <InputError message={errors.jersey_number} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="jersey_size" className="font-medium text-white">
                                        {t('register.jerseySize')}
                                    </Label>
                                    <Select value={data.jersey_size} onValueChange={(value) => setData('jersey_size', value)}>
                                        <SelectTrigger className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold">
                                            <SelectValue placeholder={t('register.jerseySizePlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent className="border-gray-800 bg-gray-900 text-white">
                                            <SelectItem value="XS" className="focus:bg-gold focus:text-white">
                                                XS
                                            </SelectItem>
                                            <SelectItem value="S" className="focus:bg-gold focus:text-white">
                                                S
                                            </SelectItem>
                                            <SelectItem value="M" className="focus:bg-gold focus:text-white">
                                                M
                                            </SelectItem>
                                            <SelectItem value="L" className="focus:bg-gold focus:text-white">
                                                L
                                            </SelectItem>
                                            <SelectItem value="XL" className="focus:bg-gold focus:text-white">
                                                XL
                                            </SelectItem>
                                            <SelectItem value="2XL" className="focus:bg-gold focus:text-white">
                                                2XL
                                            </SelectItem>
                                            <SelectItem value="3XL" className="focus:bg-gold focus:text-white">
                                                3XL
                                            </SelectItem>
                                            <SelectItem value="4XL" className="focus:bg-gold focus:text-white">
                                                4XL
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.jersey_size} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="shipping_address" className="font-medium text-white">
                                        {t('register.shippingAddress')}
                                    </Label>
                                    <Input
                                        id="shipping_address"
                                        type="text"
                                        value={data.shipping_address}
                                        onChange={(e) => setData('shipping_address', e.target.value)}
                                        placeholder={t('register.shippingAddressPlaceholder')}
                                        className="border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-gold"
                                    />
                                    <InputError message={errors.shipping_address} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="terms_accepted"
                            checked={data.terms_accepted}
                            onCheckedChange={(checked) => setData('terms_accepted', checked === true ? true : false)}
                            style={{
                                borderColor: data.terms_accepted ? '#ECD38A' : '#503C11',
                                backgroundColor: data.terms_accepted ? '#C8962A' : '#140F04',
                                color: data.terms_accepted ? 'white' : undefined,
                            }}
                        />
                        <Label htmlFor="terms_accepted" className="text-sm text-white">
                            {t('register.terms')}{' '}
                            <a
                                href={route('terms')}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#C8962A', fontWeight: 600 }}
                                className="hover:underline"
                            >
                                {t('register.termsLink')}
                            </a>{' '}
                            {t('register.and')}{' '}
                            <a
                                href={route('privacity')}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#C8962A', fontWeight: 600 }}
                                className="hover:underline"
                            >
                                {t('register.conditions')}
                            </a>{' '}
                            {t('register.termsEnd')}
                        </Label>
                    </div>
                    <InputError message={errors.terms_accepted} />

                    <Button
                        type="submit"
                        className="mt-2 w-full py-3 text-lg font-bold text-white shadow-lg transition-all"
                        disabled={processing}
                        style={{
                            backgroundColor: '#C8962A',
                            boxShadow: '0 10px 15px -3px rgba(200, 150, 41, 0.3)',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#A07822')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#C8962A')}
                    >
                        {processing && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                        {t('register.submit')}
                    </Button>
                </div>
            </form>
        </ExternalAuthLayout>
    );
}

export default function ExternalRegister() {
    return (
        <TranslationProvider>
            <ExternalRegisterContent />
        </TranslationProvider>
    );
}
