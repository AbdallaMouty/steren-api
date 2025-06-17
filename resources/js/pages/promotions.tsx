import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ad management',
        href: '/ads',
    },
];

const Ads = () => {
    const [index, setIndex] = useState(0);
    const [ads, setAds] = useState<[]>([]);

    const fileRefs = {
        home_top: useRef<HTMLInputElement>(null),
        home_bottom: useRef<HTMLInputElement>(null),
        explore: useRef<HTMLInputElement>(null),
    };

    console.log(ads);

    const positions = [
        { key: 'home_top', title: 'Home Screen - Top Ad' },
        { key: 'home_bottom', title: 'Home Screen - Bottom Ad' },
        { key: 'explore', title: 'Search Results (every 3 cars)' },
    ];

    const handleUpload = async (position: string) => {
        //@ts-expect-error any
        const file = fileRefs[position].current?.files?.[0];
        const url = (document.getElementById(`${position}-url`) as HTMLInputElement).value;
        const isActive = (document.getElementById(`${position}-switch`) as HTMLInputElement)?.getAttribute('aria-checked');

        const formData = new FormData();
        formData.append('position', position);
        formData.append('url', url);
        formData.append('is_active', isActive ? '1' : '0');
        if (file) formData.append('image', file);

        try {
            const res = await axios.post('/api/ads', formData, {
                // ❌ Don't include `Content-Type`
                headers: {
                    Accept: 'application/json',
                },
            });
            setAds((prev) => ({ ...prev, [position]: res.data }));
            toast.success('Saved!', { style: { backgroundColor: 'green' } });
        } catch (e) {
            //@ts-expect-error any
            if (e.response?.status === 422) {
                //@ts-expect-error any
                console.error('Validation errors:', e.response.data.errors);
                //@ts-expect-error any
                toast.error('Validation error: ' + JSON.stringify(e.response.data.errors), { style: { backgroundColor: 'red' } });
            } else {
                console.error(e);
                toast.error('Upload failed.', { style: { backgroundColor: 'red' } });
            }
        }
    };

    useEffect(() => {
        axios.get('/api/ads').then((res) => {
            const adMap: Record<string, unknown> = {};
            res.data.forEach((ad: unknown) => {
                //@ts-expect-error any
                adMap[ad.position] = ad;
            });
            //@ts-expect-error any
            setAds(adMap);
        });
    }, []);

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
                    {
                        //@ts-expect-error any
                        ads.home_top && (
                            <CardContent>
                                {positions.map(({ key, title }) => {
                                    //@ts-expect-error any
                                    const ad = ads[key] || {};
                                    return (
                                        <div key={key} className="mt-5 flex flex-col items-start justify-start gap-3">
                                            <h1 className="text-2xl font-semibold">{title}</h1>

                                            <div className="relative h-fit w-[32rem]">
                                                <img src={ad.image_url || '/ad.png'} className="w-full object-cover" />
                                                <Button
                                                    className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2"
                                                    onClick={
                                                        //@ts-expect-error any
                                                        () => fileRefs[key].current?.click()
                                                    }
                                                >
                                                    Change Ad
                                                    <Plus />
                                                </Button>
                                                <input
                                                    type="file"
                                                    ref={
                                                        //@ts-expect-error any
                                                        fileRefs[key]
                                                    }
                                                    className="hidden"
                                                />
                                            </div>

                                            <span>URL</span>
                                            <Input id={`${key}-url`} defaultValue={ad.url} className="w-[32rem]" />

                                            <div className="flex w-[32rem] items-center justify-between">
                                                <span>{ad.clicks ?? 0} clicks</span>
                                                <Switch id={`${key}-switch`} defaultChecked={ad.is_active.toString() === '1' && true} />
                                                <Button onClick={() => handleUpload(key)}>Save Changes</Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        )
                    }
                </Card>
            </div>
        </AppLayout>
    );
};

export default Ads;
