import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface CancelServiceButtonProps {
    serviceRequestId: number;
    canBeCancelled: boolean;
    variant?: 'default' | 'outline' | 'destructive';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
}

export default function CancelServiceButton({
    serviceRequestId,
    canBeCancelled,
    variant = 'destructive',
    size = 'default',
    className = ''
}: CancelServiceButtonProps) {
    if (!canBeCancelled) {
        return null;
    }

    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            asChild
        >
            <Link href={`/service-requests/${serviceRequestId}/cancel`}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancelar Servicio
            </Link>
        </Button>
    );
}
