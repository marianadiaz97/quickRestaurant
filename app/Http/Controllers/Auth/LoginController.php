<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;
use Inertia\Response;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function logout(Request $request)
    {
        auth()->logout();
        return response()->json([
            'data' => 'logout',
        ], 200);

        //return Inertia::render('Home');
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);

        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();

            if (!$user->email_verified_at) {
                $errorMessage = 'Pendiente código de verificación';
                Auth::logout();
                return Inertia::render('Auth/Login', [
                    'errorMessage' => $errorMessage,
                ]);
            }
            if ($user->hasRole(['client'])){
                $restaurant = Restaurant::query()->find($user->restaurant_redirect);
                if ($restaurant){
                    return redirect()->route('restaurant-menu', ['qrCode' => $restaurant->qr_code]);
                }
            }
           return redirect()->intended($this->redirectPath());
        } else {
            $errorMessage = 'Por favor revisa tus credenciales';
            return Inertia::render('Auth/Login', [
                'errorMessage' => $errorMessage,
            ]);
        }
    }

}
