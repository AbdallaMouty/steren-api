import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ad management',
        href: '/ads',
    },
];

const Ads = () => {
    const [index, setIndex] = useState(0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ads" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Ads Management</CardTitle>
                        <div className="mt-2 flex w-full items-center justify-start">
                            <Button variant={'outline'} className="hover:bg-background flex items-center justify-center gap-2 px-0 py-2">
                                <Button
                                    variant={'link'}
                                    onClick={() => setIndex(0)}
                                    className={`${index === 0 ? 'bg-neutral-700 text-white' : 'bg-transparent'}`}
                                >
                                    App Ads
                                </Button>
                                <Button
                                    variant={'link'}
                                    onClick={() => setIndex(1)}
                                    className={`${index === 1 ? 'bg-neutral-700 text-white' : 'bg-transparent'}`}
                                >
                                    Website Ads
                                </Button>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-start justify-start gap-3">
                            <h1 className="text-2xl font-semibold">Home Screen</h1>
                            <span>top ad</span>
                            <div className="relative h-fit w-[32rem]">
                                <img src="/ad.png" className="w-full object-cover" />
                                <Button className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2">
                                    Change Ad
                                    <Plus />
                                </Button>
                            </div>
                            <span>URL</span>
                            <Input value={'www.google.com'} className="w-[32rem]" />
                            <div className="flex w-[32rem] items-center justify-between">
                                <span>12 clicks</span>
                                <Switch />
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col items-start justify-start gap-3">
                            <h1 className="text-2xl font-semibold">Home Screen</h1>
                            <span>bottom ad</span>
                            <div className="relative h-fit w-[32rem]">
                                <img src="/ad.png" className="w-full object-cover" />
                                <Button className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2">
                                    Change Ad
                                    <Plus />
                                </Button>
                            </div>
                            <span>URL</span>
                            <Input value={'www.google.com'} className="w-[32rem]" />
                            <div className="flex w-[32rem] items-center justify-between">
                                <span>12 clicks</span>
                                <Switch />
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col items-start justify-start gap-3">
                            <h1 className="text-2xl font-semibold">Search Results (explore)</h1>
                            <span>show every 3 cars</span>
                            <div className="relative h-fit w-[32rem]">
                                <img src="/ad.png" className="w-full object-cover" />
                                <Button className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2">
                                    Change Ad
                                    <Plus />
                                </Button>
                            </div>
                            <span>URL</span>
                            <Input value={'www.google.com'} className="w-[32rem]" />
                            <div className="flex w-[32rem] items-center justify-between">
                                <span>12 clicks</span>
                                <Switch />
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Ads;
