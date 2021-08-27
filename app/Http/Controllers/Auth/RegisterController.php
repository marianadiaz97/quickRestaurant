<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\VerificationCode;
use App\Notifications\CodeNotification;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application registration form.
     *
     * @return Response
     */
    public function showRegistrationForm(): Response
    {
        return Inertia::render('Register');
    }

    protected function registerValidationMessages (): array
    {
        return [
            'first_name.required' => 'Tus Nombre es requerido para continuar!',
            'last_name.required' => 'Tus Apellido son requeridos para continuar!',
            'phone.required' => 'Tu teléfono es requerido para continuar!',
            'email.required' => 'Tu correo electronico es requerido para continuar!',
        ];
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ], $this->registerValidationMessages());
    }

    protected function validatorRestaurant(array $data)
    {
        return Validator::make($data, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ], $this->registerValidationMessages());
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function create(array $data)
    {
        return User::create([
            'first_name'    => $data['first_name'],
            'last_name'     => $data['last_name'],
            'name'          => implode(' ', [$data['first_name'], $data['last_name']]),
            'phone'         => $data['phone'],
            'email'         => $data['email'],
            'password'      => Hash::make($data['phone']),
            'restaurant_redirect' => $data['restaurant_id']
        ]);
    }

    public function register(Request $request)
    {
        $this->validator($request->all())->validate();
        event(new Registered($user = $this->create($request->all())));

        return $this->registered($request, $user)
            ?: redirect($this->redirectPath());
    }

    protected function registered(Request $request, $user)
    {
        /**@var User $user*/
        $user->assignRole(['client']);

        $code = sprintf("%04d", random_int(1, 9999));
        //$user->notify(new UserRegister($user, $code, $appName));
        if(env('SEND_SMS')){
            Notification::send($user, new CodeNotification($code));
        }

        $verificationInfo = [
            'email'      => $user->email,
            'code'       => $code,
            'expires_at' => now()->addMinutes(config('constants.sms_time_minutes')),
        ];

        VerificationCode::query()->create($verificationInfo);
        return Inertia::render('VerifyRegister', ['successMessage' => 'Código enviado a tu teléfono móvil']);

    }

    public function registerValidate(): Response
    {
        return Inertia::render('VerifyRegister');
    }

    public function registerVerify(Request $request)
    {
        /**@var User $user*/
        $user  = User::query()->whereEmail($request->get('email'))->first();

        $vCode = VerificationCode::query()
            ->where('email',$request->get('email'))
            ->where('code', $request->get('code'))
            ->first();

        $now = now();

        if (!$user or !$vCode) {
            $errorMessage = 'Correo electrónico o código inválido';
            return Inertia::render('VerifyRegister', [
                'errorMessage' => $errorMessage,
            ]);
        }

        if ($vCode->isExpired($now)) {
            $errorMessage = 'El código ha expirado';
            return Inertia::render('VerifyRegister', [
                'errorMessage' => $errorMessage,
            ]);
        }

        (new VerificationCode)->deleteExpiredCodes();
        $user->email_verified_at = $now;
        $user->save();

        Auth::attempt(['email' => $user->email, 'password' => $user->phone]);

        $authUser = Auth::user();
        if ($authUser->restaurant_redirect !== null){
            $restaurant = Restaurant::query()->findOrFail($user->restaurant_redirect);
           return redirect()->route('restaurant-menu', ['qrCode' => $restaurant->qr_code]);
        }

        return redirect($this->redirectPath());
    }

    public function showRegistrationRestaurantForm(Restaurant $restaurant): Response
    {
        return Inertia::render('Auth/RegisterRestaurant', [
            'restaurant_id' => $restaurant->id,
        ]);
    }

    public function registerRestaurant(Restaurant $restaurant, Request $request)
    {
        $request->merge(['restaurant_id' => $restaurant->id]);
        $this->validatorRestaurant($request->all())->validate();
        event(new Registered($user = $this->create($request->all())));

        return $this->registered($request, $user)
            ?: redirect($this->redirectPath());
    }
}
