import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formatea una fecha en formato legible
 * @param dateString - Fecha en formato string (ISO o similar)
 * @returns Fecha formateada en formato DD/MM/YYYY
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return '';

    // Formatear fecha como DD/MM/YYYY
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
