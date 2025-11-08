import { toast as sonnerToast } from 'sonner';

// Este hook proporciona compatibilidad con el antiguo hook useToast para código existente
export function useToast() {
  return {
    toast: ({
      title,
      description,
      variant,
      ...props
    }: {
      title?: string;
      description?: React.ReactNode;
      variant?: 'default' | 'destructive' | 'success' | 'warning';
      [key: string]: any;
    }) => {
      const options = {
        description,
        ...props
      };

      switch (variant) {
        case 'destructive':
          return sonnerToast.error(title, options);
        case 'success':
          return sonnerToast.success(title, options);
        case 'warning':
          return sonnerToast.warning(title, options);
        default:
          return sonnerToast(title, options);
      }
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    }
  };
}
