import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: '/analytics',
    },
];

const Analytics = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Analytics;
