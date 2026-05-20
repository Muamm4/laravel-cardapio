import { type BreadcrumbItem, type Order, type PaginatedResponse } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ClipboardList, MessageSquare, ExternalLink } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OrdersIndexProps {
    orders: PaginatedResponse<Order>;
    filterStatus?: string;
}

const FILTER_TABS = [
    { label: 'Todos', value: '' },
    { label: 'Pendentes', value: 'pending' },
    { label: 'Aceitos', value: 'accepted' },
    { label: 'Recusados', value: 'rejected' },
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Pedidos', href: '/admin/orders' },
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

export default function OrdersIndex({ orders, filterStatus }: OrdersIndexProps) {
    const handleFilterChange = (status: string) => {
        if (status === '') {
            router.get(route('admin.orders.index'));
        } else {
            router.get(route('admin.orders.index', { status }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pedidos" />
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Pedidos</h1>
                        <p className="text-muted-foreground">
                            Gerencie os pedidos dos clientes
                        </p>
                    </div>
                </div>

                {/* Status filter tabs */}
                <div className="flex items-center gap-2 mb-6">
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => handleFilterChange(tab.value)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                (filterStatus || '') === tab.value
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <Card>
                    <CardContent className="p-0">
                        {orders.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <ClipboardList className="mb-4 size-12 text-muted-foreground/40" />
                                <p className="text-lg font-medium">Nenhum pedido encontrado</p>
                                <p className="text-sm text-muted-foreground">
                                    {filterStatus
                                        ? 'Nenhum pedido com este status'
                                        : 'Ainda não há pedidos'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b bg-muted/50">
                                        <tr>
                                            <th className="p-4 text-left font-medium">ID</th>
                                            <th className="p-4 text-left font-medium">Cliente</th>
                                            <th className="p-4 text-left font-medium">Telefone</th>
                                            <th className="p-4 text-left font-medium">Itens</th>
                                            <th className="p-4 text-left font-medium">Total</th>
                                            <th className="p-4 text-left font-medium">Status</th>
                                            <th className="p-4 text-left font-medium">Data</th>
                                            <th className="p-4 text-left font-medium">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.data.map((order) => (
                                            <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 font-medium">#{order.id}</td>
                                                <td className="p-4">{order.customer_name}</td>
                                                <td className="p-4">
                                                    <a
                                                        href={`https://wa.me/55${order.customer_phone.replace(/\D/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-primary hover:underline"
                                                    >
                                                        <MessageSquare className="size-3" />
                                                        {order.customer_phone}
                                                    </a>
                                                </td>
                                                <td className="p-4">{order.items.length}</td>
                                                <td className="p-4 font-medium">{formatPrice(order.total)}</td>
                                                <td className="p-4">
                                                    <Badge variant={getStatusBadgeVariant(order.status)}>
                                                        {getStatusLabel(order.status)}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 text-muted-foreground">
                                                    {formatDate(order.created_at)}
                                                </td>
                                                <td className="p-4">
                                                    <Link
                                                        href={route('admin.orders.show', order.id)}
                                                        className="inline-flex items-center gap-1 text-primary hover:underline"
                                                    >
                                                        <ExternalLink className="size-3" />
                                                        Detalhes
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {orders.links && orders.links.length > 3 && (
                            <div className="flex items-center justify-center gap-1 border-t p-4">
                                {orders.links.map((link, index) => {
                                    if (index === 0 || index === orders.links.length - 1) {
                                        return null;
                                    }
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`flex size-8 items-center justify-center rounded text-sm ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-muted'
                                            }`}
                                            preserveScroll
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}