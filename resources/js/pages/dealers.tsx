import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check, DollarSign, Pause, Rocket, RotateCcw, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ads Management',
        href: '/dealers',
    },
];

type UserStatus = 'active' | 'suspended' | 'pending_verification' | 'inactive';
type UserType = 'dealer' | 'private';

interface Car {
    id: number;
    username: string;
    plan: string;
    created_at: string;
    status: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuel_type: string;
    transmission: string;
    color: string;
    body_type: string;
    engine_size?: string;
    horsepower: number;
    features: string[];
    images: string[];
    location: string;
    seller_type: string;
    rating: number;
    battery_range?: string;
    rejection_reason?: string;
    wakeel: string;
    wakeel_icon: string;
    authorized: number;
    seller_id: number;
}

interface User {
    id: number;
    name: string;
    type: UserType;
    email: string;
    phone_number: string;
    total_listings: number;
    pending: number;
    sold: number;
    status: UserStatus;
    last_login: string; // ISO 8601 format
    authorized: number;
    active: number;
}

interface Props {
    data: User[];
    cars: Car[];
}

const Analytics = (props: Props) => {
    const users = props.data.filter((u) => u.authorized === 1);
    const authorizedUserIds = new Set(users.map((u) => u.id));

    const handleButton = () => {
        toast.warning('go to listings page to edit', { action: { label: 'go', onClick: () => router.get('/listings') } });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ads Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <CardTitle>Ads Management</CardTitle>
                        <CardDescription className="mt-5">Prioritize this wakel’s listings over other same-brand listings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit overflow-hidden rounded-xl border md:min-h-min">
                            <Table className="text-lg">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="pl-10">Car Make</TableHead>
                                        <TableHead>Wakeel</TableHead>
                                        <TableHead>Submission date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {props.cars
                                        .filter((car) => authorizedUserIds.has(Number(car.seller_id)))
                                        .map((c) => (
                                            <TableRow>
                                                <TableCell className="pl-10"> {c.make}</TableCell>
                                                <TableCell className="flex items-center justify-start gap-2">
                                                    {' '}
                                                    {c.wakeel} <img src={`${c.wakeel_icon}`} alt={c.wakeel} className="w-10" />
                                                </TableCell>
                                                <TableCell>{c.created_at.slice(0, 10)}</TableCell>
                                                <TableCell>{c.status}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap items-center justify-start gap-2">
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                variant={'outline'}
                                                                onClick={handleButton}
                                                                className="border-none bg-transparent p-0 text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2 className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Delete
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                variant={'outline'}
                                                                onClick={handleButton}
                                                                className="border-none bg-transparent p-0 text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                            >
                                                                <X className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Decline
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                variant={'outline'}
                                                                onClick={handleButton}
                                                                className="border-none bg-transparent p-0 text-orange-500 shadow-none hover:bg-orange-500 hover:text-white"
                                                            >
                                                                <Pause className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Pause
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                variant={'outline'}
                                                                onClick={handleButton}
                                                                className="border-none bg-transparent p-0 text-red-700 shadow-none hover:bg-red-700 hover:text-white"
                                                            >
                                                                <Rocket className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Boost
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                variant={'outline'}
                                                                onClick={handleButton}
                                                                className="border-none bg-transparent p-0 text-green-500 shadow-none hover:bg-green-500 hover:text-white"
                                                            >
                                                                <DollarSign className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Sold
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                variant={'outline'}
                                                                onClick={handleButton}
                                                                className="border-none bg-transparent p-0 text-indigo-500 shadow-none hover:bg-indigo-500 hover:text-white"
                                                            >
                                                                <RotateCcw className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Reset
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                variant={'outline'}
                                                                size={'icon'}
                                                                className="rounded-xl bg-green-500 p-0 text-white hover:text-green-500"
                                                            >
                                                                <Check />
                                                            </Button>{' '}
                                                            Approve
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Analytics;
