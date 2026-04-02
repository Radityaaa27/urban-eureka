<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PosController extends Controller
{
    public function index()
    {
        $categories = Category::with(['items' => function ($query) {
            $query->where('stock', '>', 0);
        }])->get();

        $items = Item::with('category')->where('stock', '>', 0)->get();
        
        return Inertia::render('Cashier/Index', [
            'categories' => $categories,
            'items' => $items
        ]);
    }

    public function cart()
    {
        return Inertia::render('Cart/Index');
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'total' => 'required|numeric|min:0',
            'pay_total' => 'required|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:items,id',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.subtotal' => 'required|numeric|min:0',
        ]);

        if ($validated['pay_total'] < $validated['total']) {
            return back()->withErrors(['pay_total' => 'Payment amount is less than the total.']);
        }

        DB::beginTransaction();
        try {
            // Validate stock and build details
            $details = [];
            foreach ($validated['items'] as $cartItem) {
                $item = Item::lockForUpdate()->findOrFail($cartItem['id']);
                if (!$item || $item->stock < $cartItem['qty']) {
                    throw new \Exception('Stock not sufficient for item: ' . ($item->name ?? $cartItem['id']));
                }

                $details[] = [
                    'item' => $item,
                    'qty' => $cartItem['qty'],
                    'subtotal' => $cartItem['subtotal'],
                ];
            }

            $transaction = Transaction::create([
                'user_id' => $request->user()->id,
                'date' => now(),
                'total' => $validated['total'],
                'pay_total' => $validated['pay_total'],
            ]);

            foreach ($details as $detail) {
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'item_id' => $detail['item']->id,
                    'qty' => $detail['qty'],
                    'subtotal' => $detail['subtotal'],
                ]);

                $detail['item']->decrement('stock', $detail['qty']);
            }

            DB::commit();
            return redirect()->route('transactions.show', $transaction->id)->with('success', 'Transaction completed.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'total' => 'required|numeric|min:0',
            'pay_total' => 'required|numeric|min:0',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:items,id',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.subtotal' => 'required|numeric|min:0',
        ]);

        if ($validated['pay_total'] < $validated['total']) {
            return back()->withErrors(['pay_total' => 'Payment amount is less than the total sum. Please pay full amount.']);
        }

        DB::beginTransaction();
        try {
            $transaction = Transaction::create([
                'user_id' => $request->user()->id,
                'date' => now(),
                'total' => $validated['total'],
                'pay_total' => $validated['pay_total'],
            ]);

            foreach ($validated['items'] as $cartItem) {
                // Ensure stock is available
                $item = Item::find($cartItem['id']);
                if ($item->stock < $cartItem['qty']) {
                    throw new \Exception("Not enough stock for item: " . $item->name);
                }

                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'item_id' => $cartItem['id'],
                    'qty' => $cartItem['qty'],
                    'subtotal' => $cartItem['subtotal'],
                ]);
                
                $item->decrement('stock', $cartItem['qty']);
            }

            DB::commit();
            return redirect()->back()->with('success', 'Transaction completed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
