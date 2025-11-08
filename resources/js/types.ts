import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// Información del usuario autenticado
export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    avatar?: string | null;
    email_verified_at: string | null;
    created_at?: string;
    updated_at?: string;

    [key: string]: unknown;
}

export interface Auth {
    user: User;
}

export interface SharedData {
    name?: string;
    quote?: { message: string; author: string } | null;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    errors?: Record<string, string>;

    [key: string]: unknown;
}

// Props que Inertia pasa a cada página (permite extender con datos específicos)
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = SharedData & {
    errors: Record<string, string>;
} & T;

// Definición del elemento de navegación para el sidebar
export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | ComponentType<{ className?: string }> | null;
    items?: NavItem[];
    isActive?: boolean;
}

// Definición para los elementos de las migas de pan (breadcrumbs)
export interface BreadcrumbItem {
    title: string;
    href?: string;
    active?: boolean;
}

export * from './types/pagination';
