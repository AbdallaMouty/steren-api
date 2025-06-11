import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Check, Plus, Trash2, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile Overview',
        href: '/users/edit',
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
    auth: { user: User };
    data: User[];
}

export default function EditUser(props: Props) {
    const userId = props.auth.user.id;

    const user = props.data.filter((user) => user.id === userId)[0];
    dayjs.extend(relativeTime);

    const plans = ['Free', 'Boosted'];

    const footerBtns = ['Promote to Dealer', 'Suspend', 'Remove', 'Deactivate', 'Reactivate Account', 'Reset Password'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <h1 className="text-3xl font-bold">Profile Overview</h1>
                    </CardHeader>
                    <CardTitle className="w-full pr-16 text-end">{user.name}</CardTitle>
                    <CardContent className="flex items-center justify-between">
                        <div className="grid h-full flex-1 grid-cols-4 items-center justify-between gap-5">
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.contact_info.email}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.contact_info.phone}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Phone Number</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.type}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">User Type</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{dayjs(user.last_login).fromNow()}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Last login</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.status}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Status</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{plans[Math.floor(Math.random() * plans.length)]}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Plan type</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.last_login.slice(0, 10).replace(/-/g, '/')}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Regestration Date</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">
                                    {user.contact_info.address && user.contact_info.address.split(',').length > 0
                                        ? user.contact_info.address?.split(',')[1]
                                        : user.contact_info.address}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Region or city</span>
                            </div>
                        </div>
                        <div className="flex h-full items-center justify-center px-10">
                            <div className="aspect-square w-32 overflow-hidden rounded-full">
                                <img
                                    src="https://365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex w-full items-center justify-end">
                        <Button variant={'outline'} className="bg-neutral-900 text-gray-200">
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <h1 className="text-3xl font-bold">Activity Summary</h1>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="grid h-full flex-1 grid-cols-4 items-center justify-between gap-5">
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.contact_info.email}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.contact_info.phone}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Phone Number</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.type}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">User Type</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{dayjs(user.last_login).fromNow()}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Last login</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.status}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Status</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{plans[Math.floor(Math.random() * plans.length)]}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Plan type</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">{user.last_login.slice(0, 10).replace(/-/g, '/')}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Regestration Date</span>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span className="font-semibold text-gray-950 dark:text-white">
                                    {user.contact_info.address && user.contact_info.address.split(',').length > 0
                                        ? user.contact_info.address?.split(',')[1]
                                        : user.contact_info.address}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Region or city</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <h1 className="text-3xl font-bold">Notes</h1>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex-1 rounded-sm bg-gray-200 p-2 text-gray-800 dark:bg-neutral-900 dark:text-gray-300">
                            <h1 className="font-semibold">note about this user note about this user</h1>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus mollitia repellendus rem natus odio fugit eaque quam,
                                consectetur tempore sapiente quod, dolorem, libero vel nobis maxime doloribus soluta cum adipisci?
                            </span>
                        </div>
                        <div className="flex-1 rounded-sm bg-gray-200 p-2 text-gray-800 dark:bg-neutral-900 dark:text-gray-300">
                            <h1 className="font-semibold">note about this user note about this user</h1>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus mollitia repellendus rem natus odio fugit eaque quam,
                                consectetur tempore sapiente quod, dolorem, libero vel nobis maxime doloribus soluta cum adipisci?
                            </span>
                        </div>
                        <div className="flex-1 rounded-sm bg-gray-200 p-2 text-gray-800 dark:bg-neutral-900 dark:text-gray-300">
                            <h1 className="font-semibold">note about this user note about this user</h1>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus mollitia repellendus rem natus odio fugit eaque quam,
                                consectetur tempore sapiente quod, dolorem, libero vel nobis maxime doloribus soluta cum adipisci?
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <h1 className="text-3xl font-bold">Wallet</h1>
                    </CardHeader>
                    <div className="flex w-full items-center justify-center gap-20">
                        <CardTitle className="flex flex-col items-center justify-center gap-2">
                            <h1 className="text-4xl">22,000 IQD</h1>
                            <span className="text-sm font-thin text-neutral-500">Total Balance</span>
                        </CardTitle>
                        <button className="flex items-center justify-center gap-3">
                            Add{' '}
                            <Button variant={'secondary'} size={'icon'} className="rounded-full">
                                <Plus />
                            </Button>
                        </button>
                    </div>
                    <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-1 flex-col items-start justify-start gap-5 rounded-sm bg-gray-200 p-2 text-lg text-gray-800 dark:bg-neutral-900 dark:text-gray-300">
                            <div className="flex w-full items-center justify-between">
                                <span>Date & time</span>
                                <span>March 18, 2025 - 09:45 AM</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Transaction ID</span>
                                <span>TXN-20250318-0001</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Type</span>
                                <span>Wallet Deposit (FIB Transfer)</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Amount</span>
                                <span>150,000 IQD</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Status</span>
                                <span>Success</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col items-start justify-start gap-5 rounded-sm bg-gray-200 p-2 text-lg text-gray-800 dark:bg-neutral-900 dark:text-gray-300">
                            <div className="flex w-full items-center justify-between">
                                <span>Date & time</span>
                                <span>March 18, 2025 - 09:45 AM</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Transaction ID</span>
                                <span>TXN-20250318-0001</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Type</span>
                                <span>Wallet Deposit (FIB Transfer)</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Amount</span>
                                <span>150,000 IQD</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Status</span>
                                <span>Success</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col items-start justify-start gap-5 rounded-sm bg-gray-200 p-2 text-lg text-gray-800 dark:bg-neutral-900 dark:text-gray-300">
                            <div className="flex w-full items-center justify-between">
                                <span>Date & time</span>
                                <span>March 18, 2025 - 09:45 AM</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Transaction ID</span>
                                <span>TXN-20250318-0001</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Type</span>
                                <span>Wallet Deposit (FIB Transfer)</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Amount</span>
                                <span>150,000 IQD</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Status</span>
                                <span>Success</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>{' '}
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <h1 className="text-3xl font-bold">Listing Section</h1>
                    </CardHeader>
                    <CardContent>
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
                                {
                                    //@ts-expect-error any
                                    props.cars.map((item, i) => (
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
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="bg-background sticky bottom-0 flex w-full items-center justify-center gap-5 rounded-b-md border-t py-3">
                {footerBtns.map((btn) => (
                    <Button>{btn}</Button>
                ))}
            </div>
        </AppLayout>
    );
}
