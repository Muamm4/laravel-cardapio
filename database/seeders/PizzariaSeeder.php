<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class PizzariaSeeder extends Seeder
{
    public function run(): void
    {
        $pizzas = Category::create(['name' => 'Pizzas Salgadas', 'slug' => 'pizzas-salgadas', 'description' => 'Pizzas tradicionais assadas no forno à lenha', 'is_active' => true, 'sort_order' => 1]);
        $doces = Category::create(['name' => 'Pizzas Doces', 'slug' => 'pizzas-doces', 'description' => 'Pizzas doces para sobremesa', 'is_active' => true, 'sort_order' => 2]);
        $bebidas = Category::create(['name' => 'Bebidas', 'slug' => 'bebidas', 'description' => 'Refrigerantes, sucos e cervejas', 'is_active' => true, 'sort_order' => 3]);
        $porcoes = Category::create(['name' => 'Porções', 'slug' => 'porcoes', 'description' => 'Porções para compartilhar', 'is_active' => true, 'sort_order' => 4]);
        $promocoes = Category::create(['name' => 'Promoções', 'slug' => 'promocoes', 'description' => 'Ofertas especiais imperdíveis', 'is_active' => true, 'sort_order' => 0]);

        Product::create(['category_id' => $pizzas->id, 'name' => 'Mussarela', 'description' => 'Molho de tomate, mussarela, orégano', 'price' => 39.90, 'is_active' => true, 'sort_order' => 1]);
        Product::create(['category_id' => $pizzas->id, 'name' => 'Calabresa', 'description' => 'Molho de tomate, calabresa fatiada, cebola, mussarela', 'price' => 42.90, 'is_active' => true, 'sort_order' => 2]);
        Product::create(['category_id' => $pizzas->id, 'name' => 'Margherita', 'description' => 'Molho de tomate, mussarela, tomate, manjericão', 'price' => 44.90, 'is_active' => true, 'sort_order' => 3]);
        Product::create(['category_id' => $pizzas->id, 'name' => 'Portuguesa', 'description' => 'Molho de tomate, presunto, mussarela, ovo, cebola, pimentão, azeitona', 'price' => 45.90, 'is_active' => true, 'sort_order' => 4]);
        Product::create(['category_id' => $pizzas->id, 'name' => 'Frango com Catupiry', 'description' => 'Molho de tomate, frango desfiado, catupiry, mussarela', 'price' => 46.90, 'is_active' => true, 'sort_order' => 5]);
        Product::create(['category_id' => $pizzas->id, 'name' => 'Pepperoni', 'description' => 'Molho de tomate, pepperoni, mussarela, orégano', 'price' => 48.90, 'is_active' => true, 'sort_order' => 6]);
        Product::create(['category_id' => $pizzas->id, 'name' => 'Quatro Queijos', 'description' => 'Molho de tomate, mussarela, provolone, gorgonzola, parmesão', 'price' => 49.90, 'is_active' => true, 'sort_order' => 7]);
        Product::create(['category_id' => $pizzas->id, 'name' => 'Napolitana', 'description' => 'Molho de tomate, mussarela, tomate, parmesão, manjericão', 'price' => 43.90, 'is_active' => true, 'sort_order' => 8]);

        Product::create(['category_id' => $doces->id, 'name' => 'Chocolate com Morango', 'description' => 'Chocolate ao leite, morangos frescos, leite condensado', 'price' => 49.90, 'is_active' => true, 'sort_order' => 1]);
        Product::create(['category_id' => $doces->id, 'name' => 'Banana com Canela', 'description' => 'Banana caramelizada, canela, leite condensado, açúcar mascavo', 'price' => 44.90, 'is_active' => true, 'sort_order' => 2]);
        Product::create(['category_id' => $doces->id, 'name' => 'Brigadeiro', 'description' => 'Chocolate, granulado, leite condensado, creme de leite', 'price' => 46.90, 'is_active' => true, 'sort_order' => 3]);

        Product::create(['category_id' => $bebidas->id, 'name' => 'Coca-Cola 2L', 'description' => 'Coca-Cola gelada 2 litros', 'price' => 12.00, 'is_active' => true, 'sort_order' => 1]);
        Product::create(['category_id' => $bebidas->id, 'name' => 'Coca-Cola Lata', 'description' => 'Coca-Cola em lata 350ml', 'price' => 6.00, 'is_active' => true, 'sort_order' => 2]);
        Product::create(['category_id' => $bebidas->id, 'name' => 'Guaraná Antarctica 2L', 'description' => 'Guaraná Antarctica 2 litros', 'price' => 10.00, 'is_active' => true, 'sort_order' => 3]);
        Product::create(['category_id' => $bebidas->id, 'name' => 'Suco de Laranja Natural', 'description' => 'Suco de laranja natural 500ml', 'price' => 8.00, 'is_active' => true, 'sort_order' => 4]);
        Product::create(['category_id' => $bebidas->id, 'name' => 'Água Mineral 500ml', 'description' => 'Água mineral sem gás 500ml', 'price' => 4.00, 'is_active' => true, 'sort_order' => 5]);

        Product::create(['category_id' => $porcoes->id, 'name' => 'Batata Frita', 'description' => 'Batata frita crocante servida com ketchup e mostarda', 'price' => 25.90, 'is_active' => true, 'sort_order' => 1]);
        Product::create(['category_id' => $porcoes->id, 'name' => 'Anéis de Cebola', 'description' => 'Anéis de cebola empanados e fritos', 'price' => 22.90, 'is_active' => true, 'sort_order' => 2]);
        Product::create(['category_id' => $porcoes->id, 'name' => 'Frango a Passarinho', 'description' => 'Pedacinhos de frango temperados e fritos', 'price' => 32.90, 'is_active' => true, 'sort_order' => 3]);

        Product::create(['category_id' => $promocoes->id, 'name' => 'Combo Pizza + Refri 2L', 'description' => 'Pizza mussarela grande + Coca-Cola 2L', 'price' => 59.90, 'promotional_price' => 49.90, 'is_active' => true, 'sort_order' => 1]);
        Product::create(['category_id' => $promocoes->id, 'name' => 'Combo Pizza + Batata', 'description' => 'Pizza calabresa grande + batata frita crocante', 'price' => 74.90, 'promotional_price' => 59.90, 'is_active' => true, 'sort_order' => 2]);
        Product::create(['category_id' => $promocoes->id, 'name' => '2 Pizzas pelo Preço de 1', 'description' => 'Duas pizzas grandes de mussarela ou calabresa', 'price' => 79.80, 'promotional_price' => 49.90, 'is_active' => true, 'sort_order' => 3]);
        Product::create(['category_id' => $promocoes->id, 'name' => 'Refrigerante 2L + Batata', 'description' => 'Refrigerante 2L + porção de batata frita', 'price' => 37.90, 'promotional_price' => 29.90, 'is_active' => true, 'sort_order' => 4]);
    }
}

