import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Check, Pause, Rocket, Trash2, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile Overview',
        href: '/users/edit',
    },
];

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

interface Props {
    cars: Car[];
}

const Car = (props: Props) => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const { cars } = props;
    const car = cars.filter((c) => c.id === Number(id))[0];

    const buttons = [
        {
            en: 'Print window sticker',
            color: null,
            icon: null,
        },
        {
            en: 'Share',
            color: null,
            icon: null,
        },
        {
            en: 'Pause',
            color: 'bg-orange-500',
            icon: 'pause',
        },
        {
            en: 'Boost',
            color: 'bg-[#BF1F49]',
            icon: 'rocket',
        },
        {
            en: 'Delete',
            color: 'bg-gray-700 dark:bg-gray-800',
            icon: 'trash',
        },
        {
            en: 'Sold',
            color: 'bg-green-500',
            icon: null,
        },
        {
            en: 'Decline',
            color: 'bg-red-500',
            icon: 'x',
        },
        {
            en: 'Approve',
            color: 'bg-blue-500',
            icon: 'check',
        },
    ];

    const IconMap = {
        pause: <Pause />,
        rocket: <Rocket />,
        trash: <Trash2 />,
        x: <X />,
        check: <Check />,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Car Details" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Car Images</CardTitle>
                        <div className="flex items-center justify-center gap-3">
                            <h1>Rejection Reason</h1>
                            <Button variant={'outline'}>2 different cars</Button>
                        </div>
                        <div></div>
                    </CardHeader>
                    <CardContent className="grid w-full grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
                        {car.images.map((c) => (
                            <div className="aspect-video w-full border">
                                <img src={c} className="h-full w-full object-contain" alt="" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Car Details</CardTitle>
                        <div className="flex items-center justify-center gap-3">
                            <h1>Rejection Reason</h1>
                            <Button variant={'outline'}>Specs don't match</Button>
                        </div>
                        <div></div>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Description</CardTitle>
                        <div className="flex items-center justify-center gap-3">
                            <h1>Rejection Reason</h1>
                            <Button variant={'outline'}>Details don't match</Button>
                        </div>
                        <div></div>
                    </CardHeader>
                    <CardContent>
                        {Array.from({ length: 4 }).map(() => (
                            <span>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit est cupiditate sunt aut vel dolor eaque natus molestias
                                molestiae, eligendi expedita corrupti illo delectus, tempore, sequi distinctio quas necessitatibus dignissimos!
                            </span>
                        ))}
                        {Array.from({ length: 10 }).map(() => (
                            <p className="flex items-center gap-2 py-2">
                                <Check color="green" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quis laboriosam
                                consectetur dicta ex laudantium adipisci, atque sequi nulla voluptate accusantium. Quod, fugit ipsa eveniet ea error
                                quia magnam libero!
                            </p>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="sticky bottom-0 flex w-full items-center justify-center gap-3 border-t py-2">
                {buttons.map((b) => (
                    <Button variant={'outline'} className={`${b.color} ${b.color ? 'text-white' : ''} min-w-32`}>
                        {
                            //@ts-expect-error any
                            IconMap[b.icon]
                        }{' '}
                        {b.en}
                    </Button>
                ))}
            </div>
        </AppLayout>
    );
};

export default Car;
