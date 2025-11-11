import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ActivityIcon,
    BanIcon,
    Calendar,
    CreditCard,
    EyeIcon,
    Flag,
    FlagOff,
    FlagOffIcon,
    FlagTriangleLeft,
    FlagTriangleRightIcon,
    Flashlight,
    HammerIcon,
    Handshake, HeartPulseIcon,
    LayoutGrid,
    LucideHammer,
    ScrollText,
    ShoppingCart,
    Star,
    StopCircleIcon, TelescopeIcon,
    Ticket,
    Trophy,
    User2,
    UsersIcon, WavesIcon, WavesLadderIcon
} from 'lucide-react';
import AppLogo from './app-logo';
import users from '@/routes/dashboard/users';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Usuarios',
        href: users.index().url,
        icon: UsersIcon,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Horizon',
        href: '/dashboard/horizon',
        icon: ActivityIcon,
    },
    {
        title: 'Pulse',
        href: '/dashboard/pulse',
        icon: HeartPulseIcon,
    },
    {
        title: 'Telescope',
        href: '/dashboard/telescope',
        icon: TelescopeIcon,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className={'bg-white dark:hover:bg-white'}>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
