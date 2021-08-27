<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Restaurant;
use App\Models\User;
use App\Notifications\OrderNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Restaurant $restaurant)
    {
        $orders = $restaurant
            ->orders()
            ->orderBy('updated_at', 'DESC')
            ->with(['user', 'details'])
            ->paginate(10);

        return Inertia::render('Orders/Index',[
            'orders' => $orders,
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }

    public function storeOrder(StoreOrderRequest $request)
    {

        try {
            $user = Auth::user();

            $orderDetails = collect($request->get('details') ?? []);

            $total = $orderDetails->sum(function ($detail) {
                return ($detail['price'] * $detail['quantity']) + ($detail['drink_price'] * $detail['quantity']);
            });

            $order = new Order();
            $order->user_id = $user->id;
            $order->restaurant_id = $request->restaurant_id;
            $order->payment_method = null;
            $order->status = config('constants.orders.status.pending');
            $order->total = $total;
            $order->comment = $request->comment;

            if (!$order->save())
                throw new \Exception('Error save order');

            $orderDetails->each(function ($detail) use ($order, $total) {
                $orderDetail = new OrderDetail();
                $orderDetail->order_id = $order->id;
                $orderDetail->dish_id = $detail['dish_id'];
                $orderDetail->dish_name = $detail['dish_name'];
                $orderDetail->quantity = $detail['quantity'];
                $orderDetail->price = $detail['price'];
                $orderDetail->drink_id = $detail['drink_id'];
                $orderDetail->drink_price = $detail['drink_price'];
                $orderDetail->drink_name = $detail['drink_name'];
                if (!$orderDetail->save()) {
                    $order->delete();
                    throw new \Exception('Error save order detail');
                }
            });

            $order->load('user', 'restaurant');
            return redirect()->route('checkout', $order);
        } catch (\Exception $e) {
            return response()->json([
               'message' => $e->getMessage()
            ], 500);
        }
    }

    public function checkout(Order $order)
    {
        $order->load('user', 'restaurant');
        return Inertia::render('Orders/Checkout', [
            'order' => $order,
        ]);
    }

    public function confirm(Order $order, Request $request)
    {
        //dd($request->all());
        $epaycoResponse = $request->all();
        return Inertia::render('Orders/Confirm', ['order' => $order, 'epaycoResponse' => $epaycoResponse]);
    }

    public function confirmPost(Order $order, Request $request)
    {
        dd($request->all());
        return Inertia::render('Orders/Confirm', ['order' => $order]);
    }

    public function updateStatus(Order $order, Request $request)
    {
        $user = Auth::user();

        $order->load('user', 'restaurant');

        if ($request->get('status') === 'cash'){
            $order->update(['payment_method' => $request->get('status'), 'status' => $request->get('status')]);
        }

        if ($request->get('status') === 'online'){
            Notification::send($user, new OrderNotification($order));
            $order->update(['payment_method' => $request->get('status'), 'status' => 'paid']);
        }

        return redirect()->route('checkout', $order);
    }

    public function updateStatusAdmin(Order $order, Request $request)
    {
        if ($request->get('status') === 'cooking'){
            $order->update(['status' => $request->get('status')]);
            return redirect()->route('orders', $order->restaurant);
        }

        if ($request->get('status') === 'finished'){
            $order->update(['status' => $request->get('status'), 'finished_at' => now()]);
            return redirect()->route('orders', $order->restaurant);
        }

        if ($request->get('status') === 'canceled_by_restaurant') {
            $order->update(['status' => $request->get('status')]);
            return redirect()->route('orders', $order->restaurant);
        }
    }

    public function userOrders(User $user)
    {
        $auth = Auth::user();
        if ($auth->id !== $user->id) {
            alert()->error('No puedes ver estas ordenes', 'Ups!')
                ->persistent('Entendido');

            return redirect()->route('welcome');
        }
        $orders = $user->orders()->paginate(10);
        return Inertia::render('Orders/User',[
            'orders' => $orders,
        ]);
    }
}
