<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected $firebaseUpload;

    public function __construct()
    {
        $this->firebaseUpload = app('firebase.upload');
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

    public function register(Request $req)
    {
        try {
            $rules = $req->validate([
                'name' => 'required|min:3|max:30',
                'email' => 'required|email|min:3|max:40',
                'password' => 'required|min:6|max:30',
                'phone' => 'numeric|digits_between:6,30',
            ]);

            if ($this->checkEmail($req)) {
                return response()->json(['message' => 'Email Already Exists'], 400);
            }

            $user = User::create($rules);
            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;

            return response()->json(
                [
                    'message' => 'User Registered Successfully',
                    'access_token' => $token
                ],
                201
            );
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $req)
    {
        try {
            $req->validate([
                'email' => 'required|email|min:3|max:40',
                'password' => 'required|min:6|max:30',
            ]);

            $user = $this->checkEmail($req);
            if (!$user || !$this->checkPassword($req)) {
                return response()->json(['message' => 'Invalid Email or Password'], 400);
            }

            $user->tokens()->delete();
            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;

            return response()->json(
                [
                    'message' => 'Loggedin Successfully',
                    'access_token' => $token
                ],
                200
            );
        } catch (Exception $e) {
            log::error($e->getMessage());
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $req)
    {
        try {
            $user = Auth::user();

            $rules = $req->validate([
                'name' => 'string|min:3|max:30',
                'email' => 'email|min:3|max:40',
                'phone' => 'numeric|digits_between:6,30',
            ]);

            if ($req->hasFile('img')) {
                $img = $this->firebaseUpload->upload($req->file('img'));
                $rules['img'] = $img;
            }

            User::whereId($user->id)->update($rules);

            return response()->json([
                'message' => 'User Updated Successfully',
            ], 200);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function googleLogin(Request $req)
    {
        try {
            $user = $this->checkEmail($req);

            if ($user) {
                $user->tokens()->delete();
                $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;

                return response()->json(['message' => 'Loggedin Successfully', 'access_token' => $token], 200);
            } else {
                $newUser = User::create([
                    'name' => $req->name,
                    'email' => $req->email,
                    'img' => $req->picture,
                    'password' => Hash::make('no access'),
                    'phone' => '0000',
                ]);
                $token = $newUser->createToken('token', ['*'], now()->addHours(6))->plainTextToken;

                return response()->json(['message' => 'User Added Successfully', 'access_token' => $token], 201);
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    // add show (id),index (all), destroy, forgetPassword, resetPassword
}
