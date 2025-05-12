<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::all();
            return $users;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function checkEmail(Request $req)
    {
        try {
            return User::whereEmail($req->email)->first();
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return null;
        }
    }

    public function checkPassword(Request $req)
    {
        try {
            $user = $this->checkEmail($req);
            if (!$user) {
                return null;
            }
            return Hash::check($req->password, $user->password);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return null;
        }
    }

    // stopped here
    public function register(Request $req)
    {
        try {
            //
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
