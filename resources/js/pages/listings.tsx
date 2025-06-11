import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Check, Trash2, X } from 'lucide-react';
import { useState } from 'react';

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
            en: 'Active',
            ar: 'فعال',
            color: 'border-2 border-blue-700 bg-transparent',
        },
    ];

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
                                                        {item.submission_date.slice(0, 10)}
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
                                                        {item.submission_date.slice(0, 10)}
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
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
