// Interfaces comunes para la paginación en el proyecto
export interface PaginationMeta {
    current_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: { url: string, label: string, active: boolean }[];
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
    links: any;
}

export interface PaginatedProps<T> {
    data: T[];
    current_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: { url: string, label: string, active: boolean }[];
}

export interface BasePaginatedPageProps<T> {
    [key: string]: PaginatedProps<T> | any;
    flash?: {
        success?: string;
    };
}
