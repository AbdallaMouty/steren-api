import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Check, DollarSign, Pause, Rocket, RotateCcw, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

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
}

interface Props {
    data: DataType[];
}

export default function Dashboard(props: Props) {
    const buttons = [
        {
            en: 'All',
            ar: 'الكل',
            color: null,
        },
        {
            en: 'Pending',
            ar: 'قيد الانتظار',
            color: 'bg-indigo-500',
        },
        {
            en: 'Paused',
            ar: 'موقف',
            color: 'bg-orange-500',
        },
        {
            en: 'Rejected',
            ar: 'مرفوض',
            color: 'bg-red-500',
        },
        {
            en: 'Sold',
            ar: 'مباع',
            color: 'bg-green-500',
        },
        {
            en: 'Boosted',
            ar: 'مدفوع',
            color: 'border-2 border-red-700 bg-transparent',
        },
        {
            en: 'Approved',
            ar: 'فعال',
            color: 'border-2 border-blue-700 bg-transparent',
        },
    ];

    const handleButton = () => {
        toast.warning('go to listings page to edit', { action: { label: 'go', onClick: () => router.get('/listings') } });
    };

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
                                        <Link className="w-full" href="/listings/car" data={{ id: item.id }}>
                                            {item.make} {item.model}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/listings/car" data={{ id: item.id }}>
                                            {item.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/listings/car" data={{ id: item.id }}>
                                            {item.seller_type}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/listings/car" data={{ id: item.id }}>
                                            {item.created_at.slice(0, 10)}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/listings/car" data={{ id: item.id }}>
                                            {item.plan}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="flex w-full items-center justify-start gap-2" href="/listings/car" data={{ id: item.id }}>
                                            <div
                                                className={`${buttons.filter((b) => b.en.toLowerCase() === item.status.toLowerCase()).length > 0 ? buttons.filter((b) => b.en.toLowerCase() === item.status.toLowerCase())[0].color : ''} aspect-square size-4 rounded-full`}
                                            ></div>{' '}
                                            <span className="capitalize">{item.status}</span>
                                        </Link>
                                    </TableCell>
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
