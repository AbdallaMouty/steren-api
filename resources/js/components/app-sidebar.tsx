import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ChartNoAxesColumnIncreasing, CreditCard, KeySquare, LayoutGrid, LayoutList, Settings } from 'lucide-react';
import AppLogo from './app-logo';

const AdsIcon = () => {
    return (
        <svg className="size-10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.66666 5.16699C9.12374 5.16699 9.49949 5.54296 9.49966 6V10C9.49966 10.4572 9.12385 10.834 8.66666 10.834H6.49966V5.16699H8.66666ZM12.6667 5.16699H14.8336V5.5H12.1667V7.83398H13.9997C14.4569 7.83398 14.8336 8.2098 14.8336 8.66699V10C14.8336 10.4572 14.4569 10.834 13.9997 10.834H11.8336V10.5H14.4997V8.16699H12.6667C12.2096 8.16699 11.8338 7.79103 11.8336 7.33398V6C11.8338 5.54296 12.2096 5.16699 12.6667 5.16699ZM1.99966 5.16699H3.33365C3.79058 5.16717 4.16648 5.54306 4.16666 6V10.834H3.83365V8.16699H1.49966V10.834H1.16666V6C1.16683 5.54306 1.54273 5.16717 1.99966 5.16699ZM6.83365 10.5H9.16666V5.5H6.83365V10.5ZM1.49966 7.83398H3.83365V5.5H1.49966V7.83398Z"
                fill="#334155"
                stroke="#334155"
            />
        </svg>
    );
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'User Management',
        href: '/users',
        icon: CreditCard,
    },
    {
        title: 'Listings Management',
        href: '/listings',
        icon: LayoutList,
    },
    {
        title: 'Promotion/Ads',
        href: '/promotions',
        //@ts-expect-error any
        icon: AdsIcon,
    },
    {
        title: 'Settings & Employment Roles',
        href: '/emp-settings',
        icon: Settings,
    },
    {
        title: 'Analytics & Insights',
        href: '/analytics',
        icon: ChartNoAxesColumnIncreasing,
    },
    {
        title: 'Authorized Dealers',
        href: '/dealers',
        icon: KeySquare,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
