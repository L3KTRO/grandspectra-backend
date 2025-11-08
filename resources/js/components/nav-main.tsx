import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();

    // Función para determinar si un ítem está activo
    const isItemActive = (itemHref: string): boolean => {
        // Caso especial para la ruta /dashboard que debe ser exacta
        if (itemHref === '/dashboard') {
            return url === '/dashboard' || url === '/dashboard/';
        }

        // Para otras rutas, verificamos si la URL actual comienza con la ruta del ítem
        // Pero nos aseguramos de que sea la ruta completa o una subruta
        return url.startsWith(itemHref) && (
            url === itemHref ||
            url.startsWith(`${itemHref}/`) ||
            url === `${itemHref}`
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Vista de administrador</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isItemActive(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
