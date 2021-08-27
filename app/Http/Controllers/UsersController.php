<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Restaurant;
use App\Models\User;
use Doctrine\DBAL\Schema\Visitor\Visitor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request) : Response
    {
        $user = Auth::user();

        $users = User::query()
            ->forUser($user)
            ->with('roles')
            ->search($request->get('search'))
            ->paginate(6);

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(): Response
    {
        $roles = Role::all();
        $rolesSelect = $roles->map(function ($r) {
            return ['value' => $r->id, 'label' => $r->name];
        });

        $restaurants = Restaurant::all();
        $restaurantsSelect = $restaurants->map(function ($r) {
            return ['value' => $r->id, 'label' => $r->name];
        });

        return Inertia::render('Users/Create', [
            'roles' => $rolesSelect,
            'restaurants' => $restaurantsSelect,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $role = $request->get('role_id');
        $restaurants = $request->get('restaurants_id');

        $request->merge([
            'name' => implode(' ', [$request->get('first_name'), $request->get('last_name')]),
            'password' => Hash::make($request->get('phone'))
        ]);

        /**@var User $user*/
        $user = User::query()->create($request->except(['role_id','restaurants_id']));

        if (!empty($role)) {
            $user->syncRoles($role);
        }

        if (!empty($restaurants)) {
            $user->restaurants()->sync($restaurants);
        }
        return redirect()->route('users')->with('successMessage', 'User was successfully created!');
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request)
    {
        $user = User::query()
            ->where('phone', $request->get('phone'))->first();

        $userData = compact('user');

        return response()->json([
            'data' => $userData,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return Response
     */
    public function edit(User $user): Response
    {
        $user->load('roles');
        $user->load('restaurants');

        $roles = Role::all();
        $rolesSelect = $roles->map(function ($r) {
            return ['value' => $r->id, 'label' => $r->name];
        });

        $restaurants = Restaurant::all();
        $restaurantsSelect = $restaurants->map(function ($r) {
            return ['value' => $r->id, 'label' => $r->name];
        });

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $rolesSelect,
            'restaurants' => $restaurantsSelect,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $role = $request->get('role_id');
        $restaurants = $request->get('restaurants_id');

        $user->update([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'phone' => $request->get('phone'),
            'name' => $request->get('name'),
            'password' => Hash::make($request->get('phone')),
        ]);

        if (!empty($role)) {
            $user->syncRoles($role);
        }

        if (!empty($restaurants)) {
            $user->restaurants()->sync($restaurants);
        }
        return redirect()->route('users')->with('successMessage', 'User was successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
