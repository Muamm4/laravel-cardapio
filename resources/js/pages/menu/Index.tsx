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
        const mainElement = document.querySelector('main');
        const handleScroll = () => {
            if (!mainElement) return;
            const scrollPosition = mainElement.scrollTop;
            for (const category of categories) {
                const element = document.getElementById(category.slug);
                if (element) {
                    const offsetTop = element.offsetTop;
                    if (scrollPosition >= offsetTop - 100) {
                        setActiveCategory(category.slug);
                    }
                }
            }
        };

        mainElement?.addEventListener('scroll', handleScroll);
        return () => mainElement?.removeEventListener('scroll', handleScroll);
    }, [categories]);

    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        const mainElement = document.querySelector('main');
        if (element && mainElement) {
            const offset = 100;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - offset;

            mainElement.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <ToastProvider>
            <Head title="Cardápio" />
            <div className="h-screen bg-background flex flex-col overflow-hidden">
                <header className="bg-primary text-primary-foreground p-6 text-center relative pt-[calc(var(--safe-top)+1.5rem)]">
                    <h1 className="text-3xl font-bold">Cardápio</h1>
                    <p className="mt-2 opacity-90">Escolha seus produtos favoritos</p>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <AppearanceToggleDropdown />
                    </div>
                </header>

                <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b py-3 px-4 flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => scrollToCategory(category.slug)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === category.slug
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </nav>

                <main className="container mx-auto px-4 py-8 space-y-12 pb-[calc(var(--safe-bottom)+6rem)] overflow-y-auto flex-1 pwa-keyboard-avoid">
                    <div className="h-full">
                        {categories.map((category) => (
                            <section key={category.id} id={category.slug} >
                                <h2 className="text-2xl font-semibold mb-8 border-b pb-2">{category.name}</h2>
                                {category.description && <p className="text-muted-foreground mb-8">{category.description}</p>}

                                <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                    {category.products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </section>
                        ))}
                        <div className="h-24 flex justify-center">
                            <span className="text-muted-foreground text-sm">Isso é tudo por hoje!</span>
                        </div>
                    </div>
                </main>

                <BottomNav />
            </div>
        </ToastProvider>
    );
}
