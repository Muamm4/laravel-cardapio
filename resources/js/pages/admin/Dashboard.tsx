import { type BreadcrumbItem, type Order } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Clock, ListOrdered, Package, ShoppingBag, Check, X } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardProps {
    totalCategories: number;
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    recentOrders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel Administrativo',
        href: '/admin',
    },
];

function formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

function getStatusBadgeVariant(status: Order['status']): 'default' | 'secondary' | 'destructive' {
    switch (status) {
        case 'pending':
            return 'secondary';
        case 'accepted':
            return 'default';
        case 'rejected':
            return 'destructive';
        default:
            return 'secondary';
    }
}

function getStatusLabel(status: Order['status']): string {
    switch (status) {
        case 'pending':
            return 'Pendente';
        case 'accepted':
            return 'Aceito';
        case 'rejected':
            return 'Recusado';
        default:
            return status;
    }
}

export default function Dashboard({
    totalCategories,
    totalProducts,
    totalOrders,
    pendingOrders,
    recentOrders,
}: DashboardProps) {
    const updateStatus = (id: number, status: 'accepted' | 'rejected') => {
        router.patch(route('admin.orders.update-status', id), {
            status,
        });
    };

    const stats = [
        {
            label: 'Total de Categorias',
            value: totalCategories,
            icon: Package,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
        },
        {
            label: 'Total de Produtos',
            value: totalProducts,
            icon: ShoppingBag,
            color: 'text-green-500',
            bgColor: 'bg-green-50 dark:bg-green-950',
        },
        {
            label: 'Total de Pedidos',
            value: totalOrders,
            icon: ListOrdered,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
        },
        {
            label: 'Pedidos Pendentes',
            value: pendingOrders,
            icon: Clock,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-50 dark:bg-yellow-950',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Painel Administrativo" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Painel Administrativo</h1>
                    <p className="text-muted-foreground">
                        Visão geral do seu restaurante
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="border-l-4 border-l-primary">
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className={`flex size-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`size-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Orders */}
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Pedidos Recentes</h2>
                            <Link
                                href={route('admin.orders.index')}
                                className="text-sm text-primary hover:underline"
                            >
                                Ver todos
                            </Link>
                        </div>

                        {recentOrders.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                                Nenhum pedido encontrado
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">ID</th>
                                            <th className="pb-3 font-medium">Cliente</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Data</th>
                                            <th className="pb-3 font-medium">Total</th>
                                            <th className="pb-3 font-medium">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="border-b last:border-0">
                                                <td className="py-3">#{order.id}</td>
                                                <td className="py-3">{order.customer_name}</td>
                                                <td className="py-3">
                                                    <Badge variant={getStatusBadgeVariant(order.status)}>
                                                        {getStatusLabel(order.status)}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 text-sm text-muted-foreground">
                                                    {formatDate(order.created_at)}
                                                </td>
                                                <td className="py-3 font-medium">
                                                    {formatPrice(order.total)}
                                                </td>
                                             <td className="py-3">
                                                 <div className="flex items-center gap-2">
                                                     <Link
                                                         href={route('admin.orders.show', order.id)}
                                                         className="text-sm text-primary hover:underline"
                                                     >
                                                         Ver
                                                     </Link>
                                                     {order.status === 'pending' && (
                                                         <div className="flex items-center gap-1 ml-2 border-l pl-2">
                                                             <Button
                                                                 size="icon"
                                                                 variant="ghost"
                                                                 className="size-7 h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                                 onClick={() => updateStatus(order.id, 'accepted')}
                                                                 title="Aceitar Pedido"
                                                             >
                                                                 <Check className="size-3.5" />
                                                             </Button>
                                                             <Button
                                                                 size="icon"
                                                                 variant="ghost"
                                                                 className="size-7 h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                 onClick={() => updateStatus(order.id, 'rejected')}
                                                                 title="Recusar Pedido"
                                                             >
                                                                 <X className="size-3.5" />
                                                             </Button>
                                                         </div>
                                                     )}
                                                 </div>
                                             </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}