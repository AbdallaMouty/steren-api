import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Check, Filter, Plus, Trash2, X } from 'lucide-react';
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
}

export default function Users(props: Props) {
    const [index, setIndex] = useState(0);
    const buttons = [
        {
            en: 'All',
            ar: 'الكل',
        },
        {
            en: 'Active',
            ar: 'فعال',
        },
        {
            en: 'Sold',
            ar: 'مباع',
        },
        {
            en: 'Declined',
            ar: 'مرفوض',
        },
        {
            en: 'Pending',
            ar: 'قيد الانتظار',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl p-4">
                        <h1 className="text-5xl font-bold">All Users</h1>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center gap-5">
                    <div className="flex items-center justify-center">
                        {buttons.map((b, i) => (
                            <Button
                                onClick={() => setIndex(i)}
                                key={i}
                                className={`h-10 min-w-32 ${i === 0 ? 'rounded-l-lg rounded-r-none' : i === buttons.length - 1 ? 'rounded-l-none rounded-r-lg' : 'rounded-none'} ${i === index ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-gray-800 hover:bg-neutral-400'}`}
                            >
                                {b.en}
                            </Button>
                        ))}
                    </div>
                    <Input placeholder="Search" className="h-10" />
                    <Button className="w-72 bg-neutral-900">
                        <Filter /> Filter
                    </Button>
                    <Button className="w-72 bg-neutral-900">
                        <Plus /> Add new user
                    </Button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit overflow-hidden rounded-xl border md:min-h-min">
                    <Table className="text-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-10">Name</TableHead>
                                <TableHead>User Type</TableHead>
                                <TableHead>Contact Info</TableHead>
                                <TableHead>Total Listings</TableHead>
                                <TableHead>Pending Posts</TableHead>
                                <TableHead>Sold Cars</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Login</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props.data.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className="pl-10">
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.type}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.contact_info.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.total_listings}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.pending}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.sold}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.status}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                            {item.last_login}
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
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
