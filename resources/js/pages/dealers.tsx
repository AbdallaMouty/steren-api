import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Check, Trash2, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ads Management',
        href: '/dealers',
    },
];

interface Car {
    id: number;
    username: string;
    plan: string;
    submission_date: string;
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
}

interface Props {
    data: Car[];
}

const Analytics = (props: Props) => {
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
                                    {props.data.map((c) => (
                                        <TableRow>
                                            <TableCell className="pl-10"> {c.make}</TableCell>
                                            <TableCell className="flex items-center justify-start gap-2">
                                                {' '}
                                                {c.wakeel} <img src={`${c.wakeel_icon}`} alt={c.wakeel} className="w-10" />
                                            </TableCell>
                                            <TableCell>{c.submission_date.slice(0, 10)}</TableCell>
                                            <TableCell>{c.status}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-start gap-7">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="border-none bg-transparent text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                        >
                                                            <Trash2 />
                                                        </Button>{' '}
                                                        Delete
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="border-none bg-transparent text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                        >
                                                            <X />
                                                        </Button>{' '}
                                                        Decline
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="rounded-xl bg-green-500 text-white hover:text-green-500"
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
