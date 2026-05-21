import React from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/Toast';
import { Tag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addItem } = useCartStore();
    const { addToast } = useToast();

    const handleAddToCart = () => {
        addItem(product);
        addToast(`${product.name} adicionado ao carrinho!`, 'success');
    };

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-row">
            <div className="aspect-square bg-muted relative max-w-32 object-cover">
                {product.image ? (
                    <img
                        src={`/storage/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Sem imagem
                    </div>
                )}
                {product.has_promotion && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Tag className="size-3" /> PROMOÇÃO
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg leading-tight mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        {product.has_promotion ? (
                            <>
                                <span className="text-sm text-muted-foreground line-through">
                                    {product.formatted_price}
                                </span>
                                <span className="font-bold text-lg text-red-500">
                                    {product.formatted_promotional_price}
                                </span>
                            </>
                        ) : (
                            <span className="font-bold text-lg">{product.formatted_price}</span>
                        )}
                    </div>
                    <Button onClick={handleAddToCart} size="sm">
                        Adicionar
                    </Button>
                </div>
            </div>
        </div>
    );
};
