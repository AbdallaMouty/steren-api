<?php

// app/Models/Ad.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    protected $fillable = ['position', 'image_path', 'url', 'is_active'];
}
