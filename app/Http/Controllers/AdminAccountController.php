<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAccountController extends Controller
{
    // List all admin users
    public function index()
    {
        $admins = User::all();

        return response()->json($admins);
    }

    // Create a new admin
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $admin = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json(['message' => 'Admin created successfully', 'admin' => $admin]);
    }

    // Update an admin
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'     => 'nullable|string|max:255',
            'email'    => 'nullable|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'active'   => 'nullable|boolean',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json(['message' => 'Admin updated successfully', 'admin' => $user]);
    }

    // Delete an admin
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Admin deleted successfully']);
    }

    // Suspend an admin (set active = false)
    public function suspend(User $user)
    {
        $user->active = false;
        $user->save();

        return response()->json(['message' => 'Admin suspended']);
    }

    // Restore an admin (set active = true)
    public function restore(User $user)
    {
        $user->active = true;
        $user->save();

        return response()->json(['message' => 'Admin restored']);
    }
}
