import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Category } from '@/types';
import { ProductCard } from '@/components/public/ProductCard';
import { CartDrawer } from '@/components/public/CartDrawer';
import { ToastProvider } from '@/components/ui/Toast';
import { Button } from '@/components/ui/button';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

interface MenuIndexProps {
    categories: Category[];
}

export default function MenuIndex({ categories }: MenuIndexProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCartStore();

    return (
        <ToastProvider>
            <Head title="Cardápio" />
            <div className="min-h-screen bg-background">
                <header className="bg-primary text-primary-foreground p-6 text-center relative">
                    <h1 className="text-3xl font-bold">Cardápio</h1>
                    <p className="mt-2 opacity-90">Escolha seus produtos favoritos</p>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <AppearanceToggleDropdown />
                    </div>
                </header>

                <main className="container mx-auto p-6 space-y-12">
                    {categories.map((category) => (
                        <section key={category.id} id={category.slug}>
                            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">{category.name}</h2>
                            {category.description && <p className="text-muted-foreground mb-6">{category.description}</p>}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    ))}
                </main>

                <Button 
                    className="fixed bottom-6 right-6 rounded-full size-14 shadow-lg"
                    onClick={() => setIsCartOpen(true)}
                >
                    <ShoppingCart />
                    <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full size-6 flex items-center justify-center text-xs">
                        {totalItems()}
                    </span>
                </Button>

                <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
            </div>
        </ToastProvider>
    );
}
