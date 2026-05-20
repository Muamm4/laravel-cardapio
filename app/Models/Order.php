<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_phone',
        'items',
        'total',
        'status',
        'whatsapp_sent',
        'notes',
    ];

    protected $appends = [
        'formatted_total',
    ];

    protected function casts(): array
    {
        return [
            'items' => 'array',
            'total' => 'float',
            'whatsapp_sent' => 'boolean',
        ];
    }

    public function getFormattedTotalAttribute(): string
    {
        return 'R$ ' . number_format($this->total, 2, ',', '.');
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
