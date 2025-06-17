<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AppUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;

class AppAuthController extends Controller
{
    /**
     * Send OTP to email or phone.
     */
    public function requestOtp(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string',
        ]);

        $identifier = $request->input('identifier');
        $otp        = rand(100000, 999999);

        $key = $this->otpCacheKey($identifier);
        Cache::put($key, $otp, now()->addMinutes(5));

        // Replace this with actual SMS/email notification
        Log::info("OTP for {$identifier}: {$otp}");

        return response()->json(['message' => 'OTP sent successfully', 'otp' => $otp]);
    }

    /**
     * Verify OTP and login user (no password).
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'identifier'      => 'required|string',
            'otp'             => 'required|digits:6',
            'preferred_makes' => 'required|string',
            'preferred_types' => 'required|string',
            'city'            => 'required|string',
        ]);

        $identifier      = $request->input('identifier');
        $otp             = $request->input('otp');
        $username        = 'New Steren User';
        $preferred_makes = $request->input('preferred_makes');
        $preferred_types = $request->input('preferred_types');
        $city            = $request->input('city');

        $key       = $this->otpCacheKey($identifier);
        $cachedOtp = Cache::get($key);

        if (!$cachedOtp || $cachedOtp != $otp) {
            throw ValidationException::withMessages([
                'otp' => ['The provided OTP is invalid or expired.'],
            ]);
        }

        $isEmail = filter_var($identifier, FILTER_VALIDATE_EMAIL);

        // Only store the identifier (no password ever)
        $user = AppUser::firstOrCreate(
            [$isEmail ? 'email' : 'phone_number' => $identifier],
            ['name' => 'Guest', 'preferred_makes' => $preferred_makes, 'preferred_types' => $preferred_types, 'city' => $city, 'last_login' => date('Y-m-d H:i')]  // Optional: customize name logic
        );

        Cache::forget($key);

        $token = $user->createToken(name: 'api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => $user,
        ]);
    }

    /**
     * Logout and revoke token.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Get OTP cache key.
     */
    protected function otpCacheKey(string $identifier): string
    {
        return 'otp_' . md5($identifier);
    }

    public function editUser(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'birthday' => 'required|date',
            'image'    => 'required|string',
            'city'     => 'required|string',
        ]);
    }
}
