import { useTranslation } from '@/hooks/useTranslation';
import { Button } from './ui/button';

export function LanguageSelector() {
    const { locale, setLocale } = useTranslation();

    return (
        <div className="flex gap-2">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setLocale('es')}
                className={`h-10 w-10 p-0 ${locale === 'es' ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'}`}
                title="Español"
            >
                <SpainFlag />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setLocale('en')}
                className={`h-10 w-10 p-0 ${locale === 'en' ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'}`}
                title="English"
            >
                <UKFlag />
            </Button>
        </div>
    );
}

function SpainFlag() {
    return (
        <svg viewBox="0 0 32 24" className="h-full w-full rounded">
            <rect width="32" height="24" fill="#AA151B" />
            <rect width="32" height="16" y="4" fill="#F1BF00" />
            <rect width="32" height="8" fill="#AA151B" />
        </svg>
    );
}

function UKFlag() {
    return (
        <svg viewBox="0 0 60 30" className="h-full w-full rounded">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 L30,30 M0,15 L60,15" stroke="#FFF" strokeWidth="10" />
            <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
        </svg>
    );
}
