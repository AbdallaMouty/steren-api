import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Check, Trash2, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DataType {
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
}

interface Props {
    data: DataType[];
}

export default function Dashboard(props: Props) {
    console.log(props);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl p-4">
                        <h1 className="text-5xl font-bold">Dashboard</h1>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit overflow-hidden rounded-xl border md:min-h-min">
                    <Table className="text-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-10">Post Title</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>User Type</TableHead>
                                <TableHead>Submission Date</TableHead>
                                <TableHead>Plan Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props.data.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className="pl-10">
                                        {item.year} {item.make} {item.model}
                                    </TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.seller_type}</TableCell>
                                    <TableCell>{item.submission_date}</TableCell>
                                    <TableCell>{item.plan}</TableCell>
                                    <TableCell className="flex items-center justify-start gap-1">
                                        <div
                                            className={`${item.status === 'active' ? 'bg-green-500' : item.status === 'pending' ? 'bg-indigo-500' : 'bg-red-500'} aspect-square w-3 rounded-full`}
                                        />{' '}
                                        {item.status}
                                    </TableCell>
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
                <TableCaption>
                    <Link href="/listings">
                        <Button variant={'outline'} className="text-md h-10 w-32">
                            Show All
                        </Button>
                    </Link>
                </TableCaption>
            </div>
        </AppLayout>
    );
}
