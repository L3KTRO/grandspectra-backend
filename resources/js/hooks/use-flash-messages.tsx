import { showErrorToast, showInfoToast, showSuccessToast, showValidationErrors, showWarningToast } from '@/hooks/use-sonner-toast';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface PagePropsFlash {
    errors: Record<string, string>;
    flash: {
        success?: string;
        error?: string;
        info?: string;
        warning?: string;
    };
    [key: string]: any;
}

/**
 * Hook para manejar los mensajes flash y errores de validación a través de toasts
 */
export function useFlashMessages() {
    const page = usePage<PagePropsFlash>();

    useEffect(() => {
        // Mostrar errores de validación
        const errors = page.props.errors as Record<string, string>;
        if (errors && Object.keys(errors).length > 0) {
            showValidationErrors(errors);
        }

        // Mostrar mensajes de éxito
        const success = page.props.flash?.success as string;
        if (success) {
            showSuccessToast(success);
        }

        // Mostrar mensajes de error
        const error = page.props.flash?.error as string;
        if (error) {
            showErrorToast(error);
        }

        // Mostrar mensajes de información
        const info = page.props.flash?.info as string;
        if (info) {
            showInfoToast(info);
        }

        // Mostrar mensajes de advertencia
        const warning = page.props.flash?.warning as string;
        if (warning) {
            showWarningToast(warning);
        }
    }, [page.props.errors, page.props.flash?.success, page.props.flash?.error, page.props.flash?.info]);
}

/**
 * Componente para manejar mensajes flash y errores
 * Utiliza este componente en tu layout principal
 */
export function FlashMessages() {
    useFlashMessages();
    return null;
}
