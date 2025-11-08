import { createContext, ReactNode, useContext, useState } from 'react';

type Locale = 'es' | 'en';

interface TranslationContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
    children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
    const [locale, setLocaleState] = useState<Locale>(() => {
        const stored = localStorage.getItem('locale');
        return (stored === 'en' || stored === 'es' ? stored : 'es') as Locale;
    });

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[locale];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return <TranslationContext.Provider value={{ locale, setLocale, t }}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}

const translations = {
    es: {
        register: {
            title: 'Registro',
            description: 'Completa el formulario para crear tu cuenta en All Star Challenge',
            avatar: 'Foto de perfil',
            name: 'Nombre completo',
            namePlaceholder: 'Tu nombre completo',
            email: 'Correo electrónico',
            emailPlaceholder: 'email@ejemplo.com',
            alias: 'Alias',
            aliasPlaceholder: 'tu_alias',
            aliasHelp: 'Solo letras, números, puntos y guiones bajos',
            password: 'Contraseña',
            passwordPlaceholder: 'Contraseña',
            confirmPassword: 'Confirmar contraseña',
            confirmPasswordPlaceholder: 'Confirmar contraseña',
            gender: 'Género',
            genderPlaceholder: 'Selecciona tu género',
            male: 'Masculino',
            female: 'Femenino',
            role: 'Rol de usuario',
            rolePlaceholder: 'Selecciona tu rol',
            player: 'Jugador',
            observer: 'Scouter',
            birthDate: 'Fecha de nacimiento',
            birthDatePlaceholder: 'Selecciona tu fecha de nacimiento',
            guardianTitle: 'Datos del tutor legal (obligatorio para menores)',
            guardianFirstName: 'Nombre del tutor',
            guardianFirstNamePlaceholder: 'Nombre',
            guardianLastName: 'Apellidos del tutor',
            guardianLastNamePlaceholder: 'Apellidos',
            guardianDni: 'DNI / Documento identificativo del tutor',
            guardianDniPlaceholder: 'Ej: 12345678Z',
            guardianDniHelp: 'Formato DNI español: 8 números y una letra (se acepta cualquier documento)',
            guardianDniErrorFormat: 'Formato: 8 números y una letra',
            guardianDniErrorLetter: 'La letra no coincide',
            guardianConsent:
                'Declaro que el tutor legal indicado autoriza el registro y uso de la plataforma por parte del menor y acepta la responsabilidad sobre su supervisión y el tratamiento de sus datos conforme a los términos del servicio. He leído y acepto el',
            guardianConsentLink: 'Documento de consentimiento para menores',
            invitationCode: 'Código de invitado',
            invitationCodePlaceholder: 'Ej: ABCD1234',
            welcomePackTitle: 'Welcome Pack',
            welcomePackDescription:
                'Por la adquisición de un plan de suscripción, recibirás una camiseta oficial de All Star Challenge',
            jerseyName: 'Nombre en camiseta',
            jerseyNamePlaceholder: 'Nombre para tu camiseta',
            jerseyNumber: 'Dorsal',
            jerseyNumberPlaceholder: 'Número de dorsal',
            jerseyNumberHelp: 'Solo números',
            jerseySize: 'Talla de camiseta',
            jerseySizePlaceholder: 'Selecciona tu talla',
            shippingAddress: 'Dirección de envío',
            shippingAddressPlaceholder: 'Dirección completa para envío',
            terms: 'Acepto los',
            termsLink: 'términos',
            and: 'y',
            conditions: 'condiciones',
            termsEnd: 'del servicio',
            submit: 'Registrarme',
        },
    },
    en: {
        register: {
            title: 'Register',
            description: 'Complete the form to create your account on All Star Challenge',
            avatar: 'Profile picture',
            name: 'Full name',
            namePlaceholder: 'Your full name',
            email: 'Email address',
            emailPlaceholder: 'email@example.com',
            alias: 'Alias',
            aliasPlaceholder: 'your_alias',
            aliasHelp: 'Only letters, numbers, dots and underscores',
            password: 'Password',
            passwordPlaceholder: 'Password',
            confirmPassword: 'Confirm password',
            confirmPasswordPlaceholder: 'Confirm password',
            gender: 'Gender',
            genderPlaceholder: 'Select your gender',
            male: 'Male',
            female: 'Female',
            role: 'User role',
            rolePlaceholder: 'Select your role',
            player: 'Player',
            observer: 'Scouter',
            birthDate: 'Date of birth',
            birthDatePlaceholder: 'Select your date of birth',
            guardianTitle: 'Legal guardian information (required for minors)',
            guardianFirstName: "Guardian's first name",
            guardianFirstNamePlaceholder: 'First name',
            guardianLastName: "Guardian's last name",
            guardianLastNamePlaceholder: 'Last name',
            guardianDni: 'Guardian ID / Document',
            guardianDniPlaceholder: 'Ex: 12345678Z',
            guardianDniHelp: 'Spanish DNI format: 8 numbers and one letter (any document accepted)',
            guardianDniErrorFormat: 'Format: 8 numbers and one letter',
            guardianDniErrorLetter: 'Letter does not match',
            guardianConsent:
                'I declare that the indicated legal guardian authorizes the registration and use of the platform by the minor and accepts responsibility for their supervision and the processing of their data in accordance with the terms of service. I have read and accept the',
            guardianConsentLink: 'Consent document for minors',
            invitationCode: 'Invitation code',
            invitationCodePlaceholder: 'Ex: ABCD1234',
            welcomePackTitle: 'Welcome Pack',
            welcomePackDescription:
                'Upon purchasing a subscription plan, you will receive an official All Star Challenge jersey',
            jerseyName: 'Jersey name',
            jerseyNamePlaceholder: 'Name for your jersey',
            jerseyNumber: 'Jersey number',
            jerseyNumberPlaceholder: 'Jersey number',
            jerseyNumberHelp: 'Numbers only',
            jerseySize: 'Jersey size',
            jerseySizePlaceholder: 'Select your size',
            shippingAddress: 'Shipping address',
            shippingAddressPlaceholder: 'Complete shipping address',
            terms: 'I accept the',
            termsLink: 'terms',
            and: 'and',
            conditions: 'conditions',
            termsEnd: 'of service',
            submit: 'Register',
        },
    },
};
