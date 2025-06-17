<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    // Get all users
    public function index()
    {
        return response()->json(AppUser::all());
    }

    // Update a specific user
    public function update(Request $request, AppUser $app_user)
    {
        $data = $request->validate([
            'name'            => 'nullable|string',
            'email'           => 'nullable|email|unique:app_users,email,' . $app_user->id,
            'phone_number'    => 'nullable|string|unique:app_users,phone_number,' . $app_user->id,
            'image'           => 'nullable|string',
            'birthday'        => 'nullable|date',
            'preferred_makes' => 'nullable|string',
            'preferred_types' => 'nullable|string',
            'city'            => 'nullable|string',
            'active'          => 'nullable|boolean',
        ]);

        $app_user->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'user'    => $app_user
        ]);
    }

    // Delete a user (soft delete if you're using it; otherwise, hard delete)
    public function destroy(AppUser $app_user)
    {
        $app_user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    // Suspend a user (set active = false)
    public function suspend(AppUser $app_user)
    {
        $app_user->active = false;
        $app_user->save();

        return response()->json(['message' => 'User suspended successfully']);
    }

    // Restore a user (set active = true)
    public function restore(AppUser $app_user)
    {
        $app_user->active = true;
        $app_user->save();

        return response()->json(['message' => 'User restored successfully']);
    }
}
