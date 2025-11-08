import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useCallback } from 'react';

interface PaginationDataProps {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from?: number;
    to?: number;
}

interface DataTablePaginationProps {
    data: PaginationDataProps;
    baseUrl: string;
    filters?: Record<string, string | number | boolean | undefined>;
    showInfo?: boolean;
    onPageChange?: (page: number) => void;
}

/**
 * Componente para paginación con integración de Inertia y rutas Laravel
 */
export function DataTablePagination({
    data,
    baseUrl,
    filters = {},
    showInfo = true,
    onPageChange,
}: DataTablePaginationProps) {
    const { current_page, last_page, total, per_page, from, to } = data;

    const handlePageChange = useCallback(
        (page: number) => {
            if (page < 1 || page > last_page) return;
            
            if (onPageChange) {
                onPageChange(page);
                return;
            }

            const params = { ...filters, page };
            
            router.get(baseUrl, params, {
                preserveState: true,
                replace: true,
            });
        },
        [baseUrl, filters, last_page, onPageChange]
    );

    // Calcular páginas a mostrar
    const getVisiblePages = () => {
        if (last_page <= 1) return [1];
        
        const delta = 2; // Número de páginas antes y después de la actual
        const pages: (number | string)[] = [];

        // Siempre mostrar la primera página
        pages.push(1);

        // Calcular rango de páginas alrededor de la actual
        const start = Math.max(2, current_page - delta);
        const end = Math.min(last_page - 1, current_page + delta);

        // Añadir ellipsis si es necesario
        if (start > 2) {
            pages.push('...');
        }

        // Añadir páginas del rango
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Añadir ellipsis y última página si es necesario
        if (end < last_page - 1) {
            pages.push('...');
        }

        // Siempre mostrar la última página si hay más de una
        if (last_page > 1) {
            pages.push(last_page);
        }

        return pages;
    };

    if (last_page <= 1) return null;

    return (
        <div className="flex flex-col items-center justify-between gap-2 py-2 sm:flex-row">
            {showInfo && (
                <div className="text-sm text-muted-foreground">
                    Mostrando {from || (current_page - 1) * per_page + 1} a {to || Math.min(current_page * per_page, total)} de{' '}
                    {total} resultados
                </div>
            )}
            <div className="flex items-center space-x-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(1)}
                    disabled={current_page === 1}
                    className="h-8 w-8"
                >
                    <span className="sr-only">Primera página</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(current_page - 1)}
                    disabled={current_page === 1}
                    className="h-8 w-8"
                >
                    <span className="sr-only">Página anterior</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center">
                    {getVisiblePages().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                                    {page}
                                </span>
                            );
                        }
                        return (
                            <Button
                                key={`page-${page}`}
                                variant={current_page === page ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => handlePageChange(page as number)}
                                className="h-8 w-8"
                            >
                                <span className="sr-only">Ir a página {page}</span>
                                {page}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(current_page + 1)}
                    disabled={current_page === last_page}
                    className="h-8 w-8"
                >
                    <span className="sr-only">Página siguiente</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(last_page)}
                    disabled={current_page === last_page}
                    className="h-8 w-8"
                >
                    <span className="sr-only">Última página</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
