import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings & Employment Roles',
        href: '/emp-settings',
    },
];

interface User {
    id: number;
    name: string;
    role: string;
    active: number;
    email: string;
    password: string;
}

interface Props {
    data: User[];
}

export default function EmpSettings(props: Props) {
    //const languages = ['English', 'كوردى', 'العربية'];
    //const [langIndex, setLangIndex] = useState(0);

    //const currencies = ['USD', 'IQD'];
    //const [curIndex, setCurIndex] = useState(0);

    const [addModal, setAddModal] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [active, setActive] = useState(true);
    const [selectedEmp, setSelectedEmp] = useState(0);
    const [edit, setEdit] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleNewEmp = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        formData.append('password', password);
        router.post('/admins', formData, {
            onError: (errors) => {
                // Laravel puts custom errors under `errors.message`
                if (errors.message) {
                    toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                } else {
                    toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                }
                console.log(errors);
            },
            onSuccess: () => {
                toast.success('User created successfully.', { style: { backgroundColor: 'green', color: 'white' } });
            },
        });
    };

    const handleEditEmp = (id: number | string) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        router.post(`/admins/${id}`, formData, {
            onError: (errors) => {
                // Laravel puts custom errors under `errors.message`
                if (errors.message) {
                    toast.error(errors.message, { style: { backgroundColor: 'red', color: 'white' } });
                } else {
                    toast.error('Something went wrong.', { className: 'bg-red-600 text-white' });
                }
            },
            onSuccess: () => {
                toast.success('User updated successfully.', { style: { backgroundColor: 'green', color: 'white' } });
            },
        });
    };

    const handleDelete = (id: number | string) => {
        router.delete(`/admins/${id}`, {
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
            <Head title="Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="relative overflow-hidden rounded-xl p-4">
                    <CardHeader>
                        <CardTitle>Platform Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/*                        <div className="flex w-full items-center justify-start gap-20">
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h1>Language</h1>
                                <Button variant={'outline'} className="hover:bg-background flex items-center justify-center gap-2 px-0 py-2">
                                    {languages.map((l, i) => (
                                        <Button
                                            variant={'link'}
                                            onClick={() => setLangIndex(i)}
                                            className={`${langIndex === i ? 'bg-neutral-700 text-white' : 'bg-transparent'}`}
                                        >
                                            {l}
                                        </Button>
                                    ))}
                                </Button>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h1>Currency</h1>
                                <Button variant={'outline'} className="hover:bg-background flex items-center justify-center gap-2 px-0 py-2">
                                    {currencies.map((c, i) => (
                                        <Button
                                            variant={'link'}
                                            onClick={() => setCurIndex(i)}
                                            className={`${curIndex === i ? 'bg-neutral-700 text-white' : 'bg-transparent'}`}
                                        >
                                            {c}
                                        </Button>
                                    ))}
                                </Button>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-2 items-center justify-start gap-5 lg:w-1/2">
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h1>Sponsored Cost</h1>
                                <Input value={`30,000 ${currencies[curIndex]}`} />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h1>Sponsored Duration</h1>
                                <Input value={`30 days`} />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h1>Free Cost</h1>
                                <Input value={`0 ${currencies[curIndex]}`} />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h1>Free Duration</h1>
                                <Input value={`30 days`} />
                            </div>
                                </div>*/}
                        <div className="mt-10">
                            <div className="flex w-full items-center justify-between">
                                <h1>Employee Role Management</h1>
                                <Button onClick={() => setAddModal(true)}>Add New Admin</Button>
                            </div>
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative mt-3 h-fit overflow-hidden rounded-xl border md:min-h-min">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-10">Name</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {props.data.map((emp) => (
                                            <TableRow>
                                                <TableCell className="pl-10">{emp.name}</TableCell>
                                                <TableCell>{emp.role}</TableCell>
                                                <TableCell className="flex items-center justify-start gap-1 pt-4">
                                                    <div className={`aspect-square h-5 w-5 rounded-full bg-green-500`} /> Active
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center justify-start gap-7">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Button
                                                                onClick={() => handleDelete(emp.id)}
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
                                                                onClick={() => {
                                                                    setSelectedEmp(emp.id);
                                                                    setName(emp.name);
                                                                    setRole(emp.role);
                                                                    //setActive(emp.active);
                                                                    setAddModal(true);
                                                                    setEmail(emp.email);
                                                                    setEdit(true);
                                                                }}
                                                                variant={'outline'}
                                                                size={'icon'}
                                                                className="rounded-xl border-0 text-green-500 shadow-none hover:bg-green-500 hover:text-white"
                                                            >
                                                                <Pen />
                                                            </Button>{' '}
                                                            Edit
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {addModal && (
                    <div
                        className="fixed top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-sm"
                        onClick={() => setAddModal(false)}
                    >
                        <Card onClick={(e) => e.stopPropagation()} className="min-w-96">
                            <CardHeader>
                                <CardTitle>Add New Admin</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex w-full flex-col items-start justify-start">
                                    <h1>Name</h1>
                                    <Input required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex w-full flex-col items-start justify-start">
                                    <h1>Email</h1>
                                    <Input required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                {!edit && (
                                    <div className="flex w-full flex-col items-start justify-start">
                                        <h1>Password</h1>
                                        <Input required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                )}
                                <div className="mt-3 flex w-full flex-col items-start justify-start">
                                    <h1>Role</h1>
                                    <Input required value={role} onChange={(e) => setRole(e.target.value)} />
                                </div>
                                <div className="mt-3 flex w-full flex-col items-start justify-start">
                                    <h1>Active</h1>
                                    <Switch checked={active} onCheckedChange={() => setActive(!active)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex w-full items-center justify-end">
                                    <Button
                                        onClick={() => {
                                            if (edit) {
                                                handleEditEmp(selectedEmp);
                                            } else {
                                                handleNewEmp();
                                            }
                                            setAddModal(false);
                                            setName('');
                                            setRole('');
                                            setEdit(false);
                                        }}
                                        variant={'outline'}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
