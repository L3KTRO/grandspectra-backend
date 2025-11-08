import { toast } from 'sonner';

// Mostrar errores
export function showErrorToast(message: string) {
  return toast.error('Error', {
    description: message,
  });
}

// Mostrar mensajes de éxito
export function showSuccessToast(message: string) {
  return toast.success('Éxito', {
    description: message,
  });
}

// Mostrar mensaje informativo
export function showInfoToast(message: string) {
  return toast.info('Información', {
    description: message,
  });
}

// Mostrar mensaje de advertencia
export function showWarningToast(message: string) {
  return toast.warning('Advertencia', {
    description: message,
  });
}

// Mostrar todos los errores de validación
export function showValidationErrors(errors: Record<string, string>) {
  const errorMessages = Object.values(errors);
  
  if (errorMessages.length > 0) {
    return toast.error('Error de validación', {
      description: errorMessages.join(", "),
    });
  }
}

// Mostrar confirmación con botones y devolver una promesa
export function confirmWithToast(options: {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}): Promise<boolean> {
  const {
    title = 'Confirmar acción',
    description,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
  } = options || {};

  return new Promise((resolve) => {
    let toastId: string | number | undefined;
    toastId = toast(title, {
      description,
      duration: Infinity,
      action: {
        label: confirmText,
        onClick: () => {
          resolve(true);
          if (toastId !== undefined) toast.dismiss(toastId);
        },
      },
      cancel: {
        label: cancelText,
        onClick: () => {
          resolve(false);
          if (toastId !== undefined) toast.dismiss(toastId);
        },
      },
    });
  });
}
