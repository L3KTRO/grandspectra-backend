import { useCallback, useEffect, useState } from 'react';

// Mantenemos el tipo por compatibilidad, pero internamente siempre usaremos 'dark'.
export type Appearance = 'light' | 'dark' | 'system';

// Forzamos siempre modo oscuro: simplificamos helper.
const forceDark = () => {
    if (typeof document !== 'undefined') {
        document.documentElement.classList.add('dark');
    }
};

// API pública previa: ahora solamente asegura que el modo oscuro quede aplicado.
export function initializeTheme() {
    forceDark();
}

export function useAppearance() {
    // Estado fijo en 'dark'. Si algún componente intenta cambiarlo, lo ignoramos.
    const [appearance, setAppearance] = useState<Appearance>('dark');

    // Devuelve siempre 'dark' y fuerza clase dark; ignora el parámetro entrante.
    const updateAppearance = useCallback((_mode: Appearance) => {
        setAppearance('dark');
        forceDark();
    }, []);

    useEffect(() => {
        forceDark();
    }, []);

    return { appearance, updateAppearance } as const;
}
