<?php

// app/Http/Controllers/Api/AdController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdController extends Controller
{
    public function index()
    {
        $ads = Ad::all()->map(function ($ad) {
            return [
                'id'        => $ad->id,
                'position'  => $ad->position,
                'url'       => $ad->url,
                'is_active' => $ad->is_active,
                'clicks'    => $ad->clicks,
                'image_url' => $ad->image_path ? Storage::url($ad->image_path) : null,
            ];
        });

        return response()->json($ads);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'position'  => 'required|string',
            'url'       => 'required',
            'is_active' => 'boolean',
            'image'     => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('ads', 'public');
        }

        $ad = Ad::updateOrCreate(
            ['position' => $data['position']],
            $data
        );

        return response()->json([
            'id'        => $ad->id,
            'position'  => $ad->position,
            'url'       => $ad->url,
            'is_active' => $ad->is_active,
            'clicks'    => $ad->clicks,
            'image_url' => $ad->image_path ? Storage::url($ad->image_path) : null,
        ]);
    }
}
