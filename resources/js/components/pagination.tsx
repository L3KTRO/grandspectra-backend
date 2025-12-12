import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    // Acepta tanto un objeto data completo como un array de links directamente
    data?: {
        data: unknown[];
        links?: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links?: { url: string | null; label: string; active: boolean }[];
    className?: string;
    appendQuery?: Record<string, string | number | boolean | undefined>;
}

function mergeQueryIntoUrl(url: string, appendQuery?: Record<string, string | number | boolean | undefined>) {
    if (!appendQuery) return url;
    try {
        const isAbsolute = /^(https?:)?\/\//i.test(url);
        const base = isAbsolute ? url : (typeof window !== 'undefined' ? new URL(url, window.location.origin).toString() : url);
        const u = new URL(base);
        Object.entries(appendQuery).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') return;
            u.searchParams.set(key, String(value));
        });
        const withOrigin = u.toString();
        if (!isAbsolute && typeof window !== 'undefined') {
            return withOrigin.replace(`${u.origin}`, '');
        }
        return withOrigin;
    } catch {
        const hasQuery = url.includes('?');
        const extra = Object.entries(appendQuery)
            .filter(([, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
            .join('&');
        if (!extra) return url;
        return url + (hasQuery ? '&' : '?') + extra;
    }
}

export function Pagination({ data, links: propLinks, className, appendQuery }: PaginationProps) {
    // Determinar qué tipo de datos estamos usando
    const links = propLinks || data?.links;

    // Si no hay links o data, o solo hay una página, no mostrar paginación
    if (!links?.length && !data) return null;
    if (data?.last_page === 1) return null;
    if (links?.length === 3 && links[1].active) return null; // Solo hay una página en formato links

    // Renderizar info de resultados solo si tenemos los datos completos
    const showResultsInfo = data && typeof data.from !== 'undefined' && typeof data.to !== 'undefined' && typeof data.total !== 'undefined';

    return (
        <div className={cn('flex items-center justify-between', className)}>
            {showResultsInfo && (
                <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">{data.from}</span> a <span className="font-medium">{data.to}</span> de{' '}
                    <span className="font-medium">{data.total}</span> resultados
                </div>
            )}

            {links && links.length > 0 && (
                <div className={cn('flex items-center space-x-2', !showResultsInfo && 'ml-auto')}>
                    {/* Renderizar los links de paginación */}
                    {links.map((link, i) => {
                        // No renderizar los links "..." que Inertia usa como separadores
                        if (link.label.includes('...')) {
                            return (
                                <span
                                    key={i}
                                    className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-2 text-sm font-medium text-muted-foreground"
                                >
                                    ...
                                </span>
                            );
                        }

                        // Renderizar los botones Anterior/Siguiente con iconos.
                        // En producción algunas instalaciones devuelven claves de traducción como
                        // 'pagination.previous' / 'pagination.next' en lugar del texto traducido,
                        // así que detectamos esos casos y los tratamos como flechas.
                        const labelStr = String(link.label || '').toString();
                        const isPrevLabel = /pagination\.previous/i.test(labelStr) || labelStr.includes('&laquo;') || /previous/i.test(labelStr) || labelStr.includes('«');
                        const isNextLabel = /pagination\.next/i.test(labelStr) || labelStr.includes('&raquo;') || /next/i.test(labelStr) || labelStr.includes('»');

                        if (isPrevLabel) {
                            const href = link.url ? mergeQueryIntoUrl(link.url, appendQuery) : null;
                            return href ? (
                                <Link
                                    key={i}
                                    href={href}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                >
                                    <span className="sr-only">Página anterior</span>
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            ) : (
                                <span
                                    key={i}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium text-muted-foreground opacity-50"
                                >
                                    <span className="sr-only">Página anterior</span>
                                    <ChevronLeft className="h-4 w-4" />
                                </span>
                            );
                        }

                        if (isNextLabel) {
                            const href = link.url ? mergeQueryIntoUrl(link.url, appendQuery) : null;
                            return href ? (
                                <Link
                                    key={i}
                                    href={href}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                >
                                    <span className="sr-only">Página siguiente</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            ) : (
                                <span
                                    key={i}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium text-muted-foreground opacity-50"
                                >
                                    <span className="sr-only">Página siguiente</span>
                                    <ChevronRight className="h-4 w-4" />
                                </span>
                            );
                        }

                        const href = link.url ? mergeQueryIntoUrl(link.url, appendQuery) : null;
                        return href ? (
                            <Link
                                key={i}
                                href={href}
                                className={cn(
                                    'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input px-2 text-sm font-medium shadow-sm transition-colors',
                                    link.active
                                        ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                                        : 'bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
                                )}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <span
                                key={i}
                                className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-2 text-sm font-medium text-muted-foreground opacity-50"
                            >
                                {link.label}
                            </span>
                        );
                    })}
                </div>
            )}

            {!links && data && (
                <div className="flex items-center space-x-2">
                    {/* Botón Anterior */}
                    {data.prev_page_url ? (
                        <Link
                            href={mergeQueryIntoUrl(data.prev_page_url, appendQuery)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            <span className="sr-only">Página anterior</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    ) : (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium text-muted-foreground opacity-50">
                            <span className="sr-only">Página anterior</span>
                            <ChevronLeft className="h-4 w-4" />
                        </span>
                    )}

                    {/* Páginas */}
                    {Array.from({ length: data.last_page }).map((_, index) => {
                        const page = index + 1;
                        const isActive = page === data.current_page;
                        const rawUrl = `${data.path}?page=${page}`;
                        const pageUrl = mergeQueryIntoUrl(rawUrl, appendQuery);

                        return (
                            <Link
                                key={page}
                                href={pageUrl}
                                className={cn(
                                    'inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-medium shadow-sm transition-colors',
                                    isActive
                                        ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                                        : 'border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
                                )}
                            >
                                {page}
                            </Link>
                        );
                    })}

                    {/* Botón Siguiente */}
                    {data.next_page_url ? (
                        <Link
                            href={mergeQueryIntoUrl(data.next_page_url, appendQuery)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            <span className="sr-only">Página siguiente</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    ) : (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium text-muted-foreground opacity-50">
                            <span className="sr-only">Página siguiente</span>
                            <ChevronRight className="h-4 w-4" />
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
