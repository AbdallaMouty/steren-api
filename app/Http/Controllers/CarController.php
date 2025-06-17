<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    private function parsePhpArrayString($string)
    {
        // Strip brackets and single quotes
        $string = trim($string, '""');
        $string = str_replace('[', '', $string);
        $string = str_replace(']', '', $string);
        $string = str_replace("'", '', $string);

        return array_map('trim', explode(',', $string));
    }

    public function allCars(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $preferredMakes = $this->parsePhpArrayString($user->preferred_makes);
        $preferredTypes = $this->parsePhpArrayString($user->preferred_types);

        $cars = Car::all();

        $sorted = $cars->sort(function ($a, $b) use ($preferredMakes, $preferredTypes) {
            // Promote promoted cars first
            if ($a->promoted !== $b->promoted) {
                return $a->promoted ? -1 : 1;
            }

            // Calculate preference score
            $scoreA = (in_array($a->make, $preferredMakes) ? 2 : 0) + (in_array($a->body_type, $preferredTypes) ? 1 : 0);
            $scoreB = (in_array($b->make, $preferredMakes) ? 2 : 0) + (in_array($b->body_type, $preferredTypes) ? 1 : 0);

            if ($scoreA !== $scoreB) {
                return $scoreB <=> $scoreA;  // Descending, higher score first
            }

            return 0;
        })->values();

        return response()->json($sorted);
    }

    public function index(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $preferredMakes = $this->parsePhpArrayString($user->preferred_makes);
        $preferredTypes = $this->parsePhpArrayString($user->preferred_types);

        $cars = Car::where('status', 'approved')->get();

        $sorted = $cars->sort(function ($a, $b) use ($preferredMakes, $preferredTypes) {
            // Promote promoted cars first
            if ($a->promoted !== $b->promoted) {
                return $a->promoted ? -1 : 1;
            }

            // Calculate preference score
            $scoreA = (in_array($a->make, $preferredMakes) ? 2 : 0) + (in_array($a->body_type, $preferredTypes) ? 1 : 0);
            $scoreB = (in_array($b->make, $preferredMakes) ? 2 : 0) + (in_array($b->body_type, $preferredTypes) ? 1 : 0);

            if ($scoreA !== $scoreB) {
                return $scoreB <=> $scoreA;  // Descending, higher score first
            }

            return 0;
        })->values();

        return response()->json($sorted);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'seller_id'         => 'nullable|uuid',
            'make'              => 'required|string',
            'model'             => 'required|string',
            'trim'              => 'nullable|string',
            'year'              => 'required|integer',
            'color'             => 'required|string',
            'price'             => 'required|integer',
            'body_type'         => 'nullable|string',
            'wakeel'            => 'nullable|string',
            'wakeel_icon'       => 'nullable|string',
            'status'            => 'nullable|string',
            'promoted'          => 'nullable|boolean',
            'plan'              => 'nullable|string',
            'condition'         => 'nullable|string',
            'owner_id'          => 'nullable|uuid',
            'fuel'              => 'nullable|string',
            'drive'             => 'nullable|string',
            'gear'              => 'nullable|integer',
            'seats'             => 'nullable|integer',
            'engine'            => 'nullable|string',
            'region'            => 'nullable|string',
            'vin'               => 'nullable|string',
            'seller_type'       => 'nullable|string',
            'cylinders'         => 'nullable|string',
            'gcc'               => 'nullable|string',
            'km'                => 'nullable|integer',
            'features'          => 'nullable|string',
            'inspected'         => 'nullable|boolean',
            'inspection_report' => 'nullable|string',
            'damage_report'     => 'nullable|string',
            'description'       => 'nullable|string',
            'location'          => 'nullable|string',
            'warranted'         => 'nullable|boolean',
            'studio'            => 'nullable|boolean',
            'studio_id'         => 'nullable|uuid',
            'package_id'        => 'nullable|uuid',
        ]);

        // $data['carfax_report'] = $request->file('carfax_report')?->get();

        // Upload and store image URLs
        if ($request->hasFile('images')) {
            $imageUrls = [];

            foreach ($request->file('images') as $image) {
                $path        = $image->store('cars', 'public');
                $imageUrls[] = asset("storage/{$path}");
            }

            $data['images'] = $imageUrls;
        }

        $car = Car::create($data);

        return response()->json(['message' => 'Car created successfully', 'car' => $car], 201);
    }

    public function update(Request $request, Car $car)
    {
        $data = $request->validate([
            'seller_id'         => 'nullable|uuid',
            'make'              => 'required|string',
            'model'             => 'required|string',
            'trim'              => 'nullable|string',
            'year'              => 'required|integer',
            'color'             => 'required|string',
            'price'             => 'required|integer',
            'body_type'         => 'nullable|string',
            'wakeel'            => 'nullable|string',
            'wakeel_icon'       => 'nullable|string',
            'status'            => 'nullable|string',
            'promoted'          => 'nullable|boolean',
            'plan'              => 'nullable|string',
            'condition'         => 'nullable|string',
            'owner_id'          => 'nullable|uuid',
            'fuel'              => 'nullable|string',
            'drive'             => 'nullable|string',
            'gear'              => 'nullable|integer',
            'seats'             => 'nullable|integer',
            'engine'            => 'nullable|string',
            'region'            => 'nullable|string',
            'vin'               => 'nullable|string',
            'seller_type'       => 'nullable|string',
            'cylinders'         => 'nullable|string',
            'gcc'               => 'nullable|string',
            'km'                => 'nullable|integer',
            'features'          => 'nullable|string',
            'inspected'         => 'nullable|boolean',
            'inspection_report' => 'nullable|string',
            'damage_report'     => 'nullable|string',
            'description'       => 'nullable|string',
            'location'          => 'nullable|string',
            'warranted'         => 'nullable|boolean',
            'studio'            => 'nullable|boolean',
            'studio_id'         => 'nullable|uuid',
            'package_id'        => 'nullable|uuid',
        ]);

        // $data['carfax_report'] = $request->file('carfax_report')?->get();

        if ($request->hasFile('images')) {
            $imageUrls = [];

            foreach ($request->file('images') as $image) {
                $path        = $image->store('cars', 'public');
                $imageUrls[] = asset("storage/{$path}");
            }

            $data['images'] = $imageUrls;
        }

        $car->update($data);

        return response()->json(['message' => 'Car updated successfully', 'car' => $car]);
    }

    public function destroy(Car $car)
    {
        $car->delete();  // Soft delete if using SoftDeletes

        return response()->json([
            'message' => 'Car deleted successfully',
        ]);
    }

    public function approve(Car $car)
    {
        if ($car->status !== 'pending') {
            return response()->json([
                'message' => 'Car is not in a pending state.'
            ], 400);
        }

        $car->status           = 'approved';
        $car->rejection_reason = '';
        $car->save();

        return response()->json([
            'message' => 'Car approved successfully.',
            'car'     => $car
        ]);
    }

    public function reject(Request $request, Car $car)
    {
        if ($car->status !== 'pending') {
            return response()->json([
                'message' => 'Car is not in a pending state.'
            ], 400);
        }

        $request->validate([
            'rejection_reason' => 'required|string|max:1000',
        ]);

        $car->status           = 'rejected';
        $car->rejection_reason = $request->input('rejection_reason');
        $car->save();

        return response()->json([
            'message' => 'Car rejected successfully.',
            'car'     => $car
        ]);
    }

    public function resetStatus(Request $request, Car $car)
    {
        if ($car->status === 'pending') {
            return response()->json(['message' => 'Car is in pending status'], 400);
        }

        $car->status           = 'pending';
        $car->rejection_reason = '';
        $car->save();

        return response()->json(['message' => 'Car status reset', 'car' => $car]);
    }
}
