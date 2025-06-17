import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Check, Plus, RotateCcw, Trash2, X } from 'lucide-react';
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
    cars: [];
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
            en: 'Authorized',
            ar: 'مصرح',
        },
        {
            en: 'suspended',
            ar: 'موقوف',
        },
    ];

    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const handleSuspend = (id: string | number) => {
        router.post(
            `/users/${id}/suspend`,
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
                    toast.success('User suspended successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleReset = (id: string | number) => {
        router.post(
            `/users/${id}/restore`,
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
                    toast.success('User restored successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleAuthorize = (id: string | number) => {
        router.post(
            `/users/${id}/authorize`,
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
                    toast.success('User authorized successfully.', { style: { backgroundColor: 'green', color: 'white' } });
                },
            },
        );
    };

    const handleDelete = (id: string | number) => {
        router.delete(`/users/${id}`, {
            onError: (errors) => {
                // Laravel puts custom errors under `errors.message`
                if (errors.message) {
                    toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                } else {
                    toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                }
            },
            onSuccess: () => {
                toast.success('User deleted successfully.', { style: { backgroundColor: 'green', color: 'white' } });
            },
        });
    };

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
                                onClick={() => {
                                    setIndex(i);
                                    setFilter(b.en.toLowerCase());
                                    setSearch('');
                                }}
                                key={i}
                                className={`h-10 min-w-32 ${i === 0 ? 'rounded-l-lg rounded-r-none' : i === buttons.length - 1 ? 'rounded-l-none rounded-r-lg' : 'rounded-none'} ${i === index ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-gray-800 hover:bg-neutral-400'}`}
                            >
                                {b.en}
                            </Button>
                        ))}
                    </div>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="h-10" />
                    {/*<Button className="w-72 bg-neutral-900 dark:text-white dark:hover:text-neutral-700">
                        <Filter /> Filter
                    </Button>*/}
                    <Button className="w-72 bg-neutral-900 dark:text-white dark:hover:text-neutral-700">
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
                        {filter === 'all' ? (
                            <TableBody>
                                {props.data
                                    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((item, i) => (
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
                                                    {item.email && (
                                                        <>
                                                            <span>{item.email}</span> <br />
                                                        </>
                                                    )}{' '}
                                                    {item.phone_number}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {
                                                        //@ts-expect-error any
                                                        props.cars.filter((c) => c.seller_id === item.id).length
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {
                                                        //@ts-expect-error any
                                                        props.cars.filter((c) => c.status === 'pending').filter((c) => c.seller_id === item.id).length
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {
                                                        //@ts-expect-error any
                                                        props.cars.filter((c) => c.status === 'sold').filter((c) => c.seller_id === item.id).length
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {item.active === 1 ? (item.authorized === 1 ? 'Authorized' : 'Active') : 'Suspended'}
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
                                                            onClick={() => handleDelete(item.id)}
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
                                                            onClick={() => handleSuspend(item.id)}
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="border-none bg-transparent text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                        >
                                                            <X />
                                                        </Button>{' '}
                                                        Suspend
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            onClick={() => handleReset(item.id)}
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="border-none bg-transparent text-emerald-500 shadow-none hover:bg-emerald-500 hover:text-white"
                                                        >
                                                            <RotateCcw />
                                                        </Button>{' '}
                                                        Restore
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            onClick={() => handleAuthorize(item.id)}
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="rounded-xl bg-green-500 text-white hover:text-green-500"
                                                        >
                                                            <Check />
                                                        </Button>{' '}
                                                        Authorize
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        ) : (
                            <TableBody>
                                {props.data
                                    .filter((u) =>
                                        filter === 'authorized' ? u.authorized === 1 : filter === 'active' ? u.active === 1 : u.active === 0,
                                    )
                                    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((item, i) => (
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
                                                    {item.email && (
                                                        <>
                                                            <span>{item.email}</span> <br />
                                                        </>
                                                    )}{' '}
                                                    {item.phone_number}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {
                                                        //@ts-expect-error any
                                                        props.cars.filter((c) => c.seller_id === item.id).length
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {
                                                        //@ts-expect-error any
                                                        props.cars.filter((c) => c.status === 'pending').filter((c) => c.seller_id === item.id).length
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {
                                                        //@ts-expect-error any
                                                        props.cars.filter((c) => c.status === 'sold').filter((c) => c.seller_id === item.id).length
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link className="w-full" href="/users/edit" data={{ userId: item.id }}>
                                                    {item.active === 1 ? (item.authorized === 1 ? 'Authorized' : 'Active') : 'Suspended'}
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
                                                            onClick={() => handleDelete(item.id)}
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
                                                            onClick={() => handleSuspend(item.id)}
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="border-none bg-transparent text-red-500 shadow-none hover:bg-red-500 hover:text-white"
                                                        >
                                                            <X />
                                                        </Button>{' '}
                                                        Suspend
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            onClick={() => handleReset(item.id)}
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="border-none bg-transparent text-emerald-500 shadow-none hover:bg-emerald-500 hover:text-white"
                                                        >
                                                            <RotateCcw />
                                                        </Button>{' '}
                                                        Restore
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Button
                                                            onClick={() => handleAuthorize(item.id)}
                                                            variant={'outline'}
                                                            size={'icon'}
                                                            className="rounded-xl bg-green-500 text-white hover:text-green-500"
                                                        >
                                                            <Check />
                                                        </Button>{' '}
                                                        Authorize
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        )}
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
