import { Head, Link } from '@inertiajs/react';
import { Order } from '@/types';
import { Package, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/public/BottomNav';

interface OrdersProps {
    orders: Order[];
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
}

function getStatusBadge(status: Order['status']) {
    switch (status) {
        case 'pending': return { label: 'Pendente', variant: 'secondary', icon: Clock };
        case 'accepted': return { label: 'Aceito', variant: 'default', icon: CheckCircle };
        case 'rejected': return { label: 'Recusado', variant: 'destructive', icon: XCircle };
        default: return { label: status, variant: 'secondary', icon: Clock };
    }
}

export default function Orders({ orders }: OrdersProps) {
    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            <Head title="Meus Pedidos" />
            <header className="bg-primary text-primary-foreground p-6 text-center relative pt-[calc(var(--safe-top)+1.5rem)]">
                    <h1 className="text-3xl font-bold"></h1>
                    <p className="mt-2 opacity-90"></p>
            </header>

            <main className="container mx-auto px-4 py-8 pt-[calc(env(safe-area-inset-top)+1rem)] overflow-y-auto flex-1 pwa-keyboard-avoid">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Meus Pedidos</h1>
                    <p className="text-muted-foreground">Acompanhe o status dos seus pedidos</p>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Package className="size-16 text-muted-foreground/20 mb-4" />
                        <h3 className="text-lg font-medium">Nenhum pedido encontrado</h3>
                        <p className="text-muted-foreground mb-6">Você ainda não fez nenhum pedido.</p>
                        <Button onClick={() => window.location.href = route('menu')} className="gap-2">
                            Fazer primeiro pedido
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {orders.map((order) => {
                            const status = getStatusBadge(order.status);
                            return (
                                <Card key={order.id} className="overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/30">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold">Pedido #{order.id}</span>
                                            <Badge variant={status.variant as any} className="text-[10px] px-2 py-0">
                                                {status.label}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="size-3" />
                                            {new Date(order.created_at).toLocaleDateString('pt-BR')}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Total do pedido</p>
                                                <p className="text-xl font-bold text-primary">
                                                    {formatPrice(order.total)}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm" className="gap-2" onClick={() => window.location.href = route('menu')}>
                                                Pedir novamente
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
