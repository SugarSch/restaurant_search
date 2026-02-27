<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SearchCache extends Model
{
    use HasFactory;
    protected $fillable = [
        'keyword',
        'results'
    ];

    protected $casts = [
        'results' => 'array',
    ];
}
