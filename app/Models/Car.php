<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Car extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    protected $keyType   = 'string';

    protected $fillable = [
        'id',
        'seller_id',
        'make',
        'model',
        'trim',
        'year',
        'color',
        'price',
        'body_type',
        'wakeel',
        'wakeel_icon',
        'images',
        'status',
        'promoted',
        'plan',
        'condition',
        'owner_id',
        'fuel',
        'drive',
        'gear',
        'seats',
        'engine',
        'region',
        'vin',
        'seller_type',
        'cylinders',
        'gcc',
        'km',
        'features',
        'inspected',
        'inspection_report',
        'damage_report',
        'carfax_report',
        'description',
        'location',
        'warranted',
        'studio',
        'studio_id',
        'package_id',
        'images'            => 'array',
        'features'          => 'array',
        'inspection_report' => 'binary',
        'damage_report'     => 'binary',
        'carfax_report'     => 'binary',
        'promoted'          => 'boolean',
        'inspected'         => 'boolean',
        'warranted'         => 'boolean',
        'studio'            => 'boolean',
        'year'              => 'integer',
        'price'             => 'integer',
        'km'                => 'integer',
        'gear'              => 'integer',
        'seats'             => 'integer',
        'rejection_reason',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}
