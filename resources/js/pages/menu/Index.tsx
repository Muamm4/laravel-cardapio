import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Category } from '@/types';
import { ProductCard } from '@/components/public/ProductCard';
import { ToastProvider } from '@/components/ui/Toast';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { BottomNav } from '@/components/public/BottomNav';

interface MenuIndexProps {
    categories: Category[];
}

export default function MenuIndex({ categories }: MenuIndexProps) {
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            for (const category of categories) {
                const element = document.getElementById(category.slug);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop - 100) {
                        setActiveCategory(category.slug);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories]);

    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <ToastProvider>
            <Head title="Cardápio" />
            <div className="min-h-screen bg-background">
                <header className="bg-primary text-primary-foreground p-6 text-center relative pt-[calc(var(--safe-top)+1.5rem)]">
                    <h1 className="text-3xl font-bold">Cardápio</h1>
                    <p className="mt-2 opacity-90">Escolha seus produtos favoritos</p>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <AppearanceToggleDropdown />
                    </div>
                </header>

                <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b overflow-x-auto no-scrollbar py-3 px-4 flex gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => scrollToCategory(category.slug)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                activeCategory === category.slug 
                                ? 'bg-primary text-primary-foreground shadow-sm' 
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </nav>

                <main className="container mx-auto px-4 py-8 space-y-12 pb-[calc(var(--safe-bottom)+6rem)]">
                    {categories.map((category) => (
                        <section key={category.id} id={category.slug} className="scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-8 border-b pb-2">{category.name}</h2>
                            {category.description && <p className="text-muted-foreground mb-8">{category.description}</p>}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    ))}
                </main>

                <BottomNav />
            </div>
        </ToastProvider>
    );
}
