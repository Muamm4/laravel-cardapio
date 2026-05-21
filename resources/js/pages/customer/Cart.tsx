import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/stores/cartStore';
import { BottomNav } from '@/components/public/BottomNav';

function formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
}

export default function Cart() {
    const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [whatsappLink, setWhatsappLink] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setIsSubmitting(true);
        try {
            const payload = {
                customer_name: customerName,
                customer_phone: customerPhone,
                notes,
                items: items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                })),
                total: totalPrice(),
            };

            const response = await fetch('/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Erro ao enviar pedido');

            const data = await response.json();
            setWhatsappLink(data.whatsapp_link);
            setSubmitted(true);
            clearCart();
        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            alert('Ocorreu um erro ao enviar seu pedido. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-sm">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="size-10 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Pedido enviado!</h1>
                    <p className="text-muted-foreground mb-8">
                        Clique no botão abaixo para finalizar seu pedido pelo WhatsApp.
                    </p>
                    <Button
                        className="w-full mb-4 gap-2"
                        size="lg"
                        onClick={() => window.open(whatsappLink, '_blank')}
                    >
                        Falar no WhatsApp
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => window.location.href = route('menu')}
                    >
                        <ArrowLeft className="size-4" />
                        Voltar ao Cardápio
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            <Head title="Carrinho" />
            <header className="bg-primary text-primary-foreground p-6 text-center relative pt-[calc(var(--safe-top)+1.5rem)]">
                    <h1 className="text-3xl font-bold"></h1>
                    <p className="mt-2 opacity-90"></p>
            </header>

            <main className="container mx-auto px-4 py-8 pt-[calc(var(--safe-top)+1rem)] overflow-y-auto flex-1 pwa-keyboard-avoid">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Seu Carrinho</h1>
                    <p className="text-muted-foreground">{items.length} item(ns) adicionados</p>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <ShoppingCart className="size-16 text-muted-foreground/20 mb-4" />
                        <h3 className="text-lg font-medium">Carrinho vazio</h3>
                        <p className="text-muted-foreground mb-6">Adicione itens do cardápio para começar.</p>
                        <Button onClick={() => window.location.href = route('menu')} className="gap-2">
                            Ver Cardápio
                        </Button>
                    </div>
                ) : (
                    <div className="max-w-lg mx-auto space-y-6">
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="size-16 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="size-16 rounded-lg bg-muted flex items-center justify-center">
                                            <ShoppingCart className="size-6 text-muted-foreground/40" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm leading-tight">{item.name}</p>
                                        <p className="text-sm text-primary font-semibold mt-1">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="size-8"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        >
                                            <Minus className="size-4" />
                                        </Button>
                                        <span className="w-8 text-center font-medium text-sm">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="size-8"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 text-destructive"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center p-4 rounded-xl bg-muted/50">
                            <span className="text-base">Total</span>
                            <span className="text-xl font-bold text-primary">{formatPrice(totalPrice())}</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-6 bg-card">
                            <h3 className="font-semibold text-lg">Finalizar Pedido</h3>

                            <div className="space-y-2">
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input
                                    id="name"
                                    placeholder="Seu nome"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                                <Input
                                    id="phone"
                                    placeholder="(11) 99999-9999"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Observações</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Alguma observação sobre o pedido?"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting || items.length === 0}
                                className="w-full gap-2"
                                size="lg"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
                            </Button>
                        </form>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
