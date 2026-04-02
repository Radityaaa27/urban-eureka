<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('user')->orderBy('date', 'desc')->paginate(10);

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function show(Transaction $transaction)
    {
        $transaction->load('user', 'details.item');

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction,
        ]);
    }
}
