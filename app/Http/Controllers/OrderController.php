<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();

        // items comes from JSON body already decoded
        $items = is_string($data['items']) ? json_decode($data['items'], true) : $data['items'];

        $order = Order::create([
            'customer_name' => $data['customer_name'],
            'customer_phone' => $data['customer_phone'],
            'items' => $items,
            'total' => $data['total'],
            'notes' => $data['notes'] ?? null,
            'status' => 'pending',
            'whatsapp_sent' => false,
        ]);

        $itemsFormatted = '';
        foreach ($items as $item) {
            $itemName = $item['name'] ?? $item['product_name'] ?? 'Item';
            $itemQty = $item['quantity'] ?? 1;
            $itemPrice = $item['price'] ?? 0;
            $itemsFormatted .= $itemName . ' (x' . $itemQty . ') - R$ ' . number_format((float) $itemPrice, 2, ',', '.') . '%0a';
        }

        $message = '*Novo Pedido*%0a%0a';
        $message .= '*Cliente:* ' . $data['customer_name'] . '%0a';
        $message .= '*Telefone:* ' . $data['customer_phone'] . '%0a%0a';
        $message .= '*Itens:*%0a' . $itemsFormatted . '%0a';
        $message .= '*Total:* R$ ' . number_format((float) $data['total'], 2, ',', '.') . '%0a';

        if (!empty($data['notes'])) {
            $message .= '*Observações:* ' . $data['notes'];
        }

        $adminWhatsApp = env('ADMIN_WHATSAPP');
        $whatsappLink = 'https://wa.me/' . $adminWhatsApp . '?text=' . $message;

        return response()->json([
            'success' => true,
            'order_id' => $order->id,
            'whatsapp_link' => $whatsappLink,
        ]);
    }
}
