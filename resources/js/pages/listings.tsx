import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Check, DollarSign, Pause, Rocket, RotateCcw, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/users',
    },
];

type UserStatus = 'active' | 'suspended' | 'pending_verification' | 'inactive';
type UserType = 'dealer' | 'private';

interface ContactInfo {
    email: string;
    phone: string;
    address?: string;
}

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
}

interface User {
    id: number;
    name: string;
    type: UserType;
    contact_info: ContactInfo;
    total_listings: number;
    pending: number;
    sold: number;
    status: UserStatus;
    last_login: string; // ISO 8601 format
}

interface Props {
    data: User[];
    cars: Car[];
}

export default function Listings(props: Props) {
    const [index, setIndex] = useState(0);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
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

    const handleReject = (carId: string | number) => {
        const rejection_reason = prompt('Why are you rejecting this car?');
        if (!rejection_reason) return;

        router.post(
            `/cars/${carId}/reject`,
            { rejection_reason },
            {
                onError: (errors) => {
                    // Laravel puts custom errors under `errors.message`
                    if (errors.message) {
                        toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                    } else {
                        toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                    }
                },
                onSuccess: () => {
                    toast.success('Car rejected successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleReset = (carId: string | number) => {
        router.post(
            `/cars/${carId}/reset`,
            {},
            {
                onError: (errors) => {
                    // Laravel puts custom errors under `errors.message`
                    if (errors.message) {
                        toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                    } else {
                        toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                    }
                },
                onSuccess: () => {
                    toast.success('Car reset successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handlePause = (carId: string | number) => {
        router.post(
            `/cars/${carId}/pause`,
            {},
            {
                onError: (errors) => {
                    // Laravel puts custom errors under `errors.message`
                    if (errors.message) {
                        toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                    } else {
                        toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                    }
                },
                onSuccess: () => {
                    toast.success('Car paused successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleBoost = (carId: string | number) => {
        router.post(
            `/cars/${carId}/boost`,
            {},
            {
                onError: (errors) => {
                    // Laravel puts custom errors under `errors.message`
                    if (errors.message) {
                        toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                    } else {
                        toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                    }
                },
                onSuccess: () => {
                    toast.success('Car paused successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleSold = (carId: string | number) => {
        router.post(
            `/cars/${carId}/sold`,
            {},
            {
                onError: (errors) => {
                    // Laravel puts custom errors under `errors.message`
                    if (errors.message) {
                        toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                    } else {
                        toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                    }
                },
                onSuccess: () => {
                    toast.success('Car paused successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleApprove = (carId: string | number) => {
        router.post(
            `/cars/${carId}/approve`,
            {},
            {
                onError: (errors) => {
                    // Laravel puts custom errors under `errors.message`
                    if (errors.message) {
                        toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                    } else {
                        toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                    }
                },
                onSuccess: () => {
                    toast.success('Car approved successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleDelete = (carId: string | number) => {
        router.delete(`/cars/${carId}`, {
            onError: (errors) => {
                // Laravel puts custom errors under `errors.message`
                if (errors.message) {
                    toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                } else {
                    toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                }
            },
            onSuccess: () => {
                toast.success('Car deleted successfully.', { style: { backgroundColor: 'green', color: 'white' } });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl p-4">
                        <h1 className="text-5xl font-bold">All Posts</h1>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center gap-5">
                    <div className="flex items-center justify-center">
                        {buttons.map((b, i) => (
                            <Button
                                onClick={() => {
                                    setIndex(i);
                                    setFilter(b.en.toLowerCase());
                                    setSearch('');
                                }}
                                key={i}
                                className={`h-10 min-w-32 ${i === 0 ? 'rounded-l-lg rounded-r-none' : i === buttons.length - 1 ? 'rounded-l-none rounded-r-lg' : 'rounded-none'} ${i === index ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-gray-800 hover:bg-neutral-400'}`}
                            >
                                {b.color && <div className={`${b.color} aspect-square w-4 rounded-full`}></div>} {b.en}
                            </Button>
                        ))}
                    </div>
                    <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="h-10" />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit overflow-hidden rounded-xl border md:min-h-min">
                    <Table className="text-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-10">Post title</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>User type</TableHead>
                                <TableHead>Submission date</TableHead>
                                <TableHead>Plan type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filter === 'all' ? (
                                <>
                                    {props.cars
                                        .filter((c) => `${c.make.toLowerCase()} ${c.model.toLowerCase()}`.includes(search.toLowerCase()))
                                        .map((item, i) => (
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
                                                    <Link
                                                        className="flex w-full items-center justify-start gap-2"
                                                        href="/listings/car"
                                                        data={{ id: item.id }}
                                                    >
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
                                                                onClick={() => handleDelete(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2 className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Delete
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleReject(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                            >
                                                                <X className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Decline
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handlePause(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-orange-500 shadow-none hover:bg-orange-500 hover:text-white"
                                                            >
                                                                <Pause className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Pause
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleBoost(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-red-700 shadow-none hover:bg-red-700 hover:text-white"
                                                            >
                                                                <Rocket className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Boost
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleSold(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-green-500 shadow-none hover:bg-green-500 hover:text-white"
                                                            >
                                                                <DollarSign className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Sold
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleReset(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-indigo-500 shadow-none hover:bg-indigo-500 hover:text-white"
                                                            >
                                                                <RotateCcw className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Reset
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleApprove(item.id)}
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
                                </>
                            ) : (
                                <>
                                    {props.cars
                                        .filter((c) => `${c.make.toLowerCase()} ${c.model.toLowerCase()}`.includes(search.toLowerCase()))
                                        .filter((c) => c.status.toLowerCase() === filter)
                                        .map((item, i) => (
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
                                                    <Link
                                                        className="flex w-full items-center justify-start gap-2"
                                                        href="/listings/car"
                                                        data={{ id: item.id }}
                                                    >
                                                        <div
                                                            className={`${buttons.filter((b) => b.en.toLowerCase() === item.status.toLowerCase())[0].color} aspect-square size-4 rounded-full`}
                                                        ></div>{' '}
                                                        <span className="capitalize">{item.status}</span>
                                                    </Link>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex flex-wrap items-center justify-start gap-2">
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleDelete(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2 className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Delete
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleReject(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                            >
                                                                <X className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Decline
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handlePause(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-orange-500 shadow-none hover:bg-orange-500 hover:text-white"
                                                            >
                                                                <Pause className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Pause
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleBoost(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-red-700 shadow-none hover:bg-red-700 hover:text-white"
                                                            >
                                                                <Rocket className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Boost
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleSold(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-green-500 shadow-none hover:bg-green-500 hover:text-white"
                                                            >
                                                                <DollarSign className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Sold
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleReset(item.id)}
                                                                variant={'outline'}
                                                                className="border-none bg-transparent p-0 text-indigo-500 shadow-none hover:bg-indigo-500 hover:text-white"
                                                            >
                                                                <RotateCcw className="h-1 w-1" />
                                                            </Button>{' '}
                                                            Reset
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 text-sm">
                                                            <Button
                                                                onClick={() => handleApprove(item.id)}
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
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
