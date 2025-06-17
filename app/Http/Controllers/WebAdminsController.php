<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class WebAdminsController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role'     => 'required|string'
        ]);

        $data['password'] = Hash::make($data['password']);

        User::create($data);

        return redirect()->route('emp-settings')->with('success', 'User created successfully.');
    }

    // Update a specific user
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'  => 'nullable|string',
            'email' => 'nullable|email|unique:app_users,email,' . $user->id,
            'role'  => 'string|required'
        ]);

        $user->update($data);

        return redirect()->route('emp-settings')->with('success', 'User updated successfully.');
    }

    // Delete a user (soft delete if you're using it; otherwise, hard delete)
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route(route: 'emp-settings')->with('success', 'User deleted successfully.');
    }
}
