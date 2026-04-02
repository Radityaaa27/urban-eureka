<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class PosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Setup Test categories
        $food = Category::create(['name' => 'Food']);
        $drinks = Category::create(['name' => 'Drinks']);
        $snacks = Category::create(['name' => 'Snacks']);

        // Items for food
        Item::create(['category_id' => $food->id, 'name' => 'Burger', 'price' => 50000, 'stock' => 100]);
        Item::create(['category_id' => $food->id, 'name' => 'Pizza', 'price' => 80000, 'stock' => 50]);
        Item::create(['category_id' => $food->id, 'name' => 'Fried Rice', 'price' => 30000, 'stock' => 80]);

        // Items for drinks
        Item::create(['category_id' => $drinks->id, 'name' => 'Cola', 'price' => 10000, 'stock' => 200]);
        Item::create(['category_id' => $drinks->id, 'name' => 'Iced Tea', 'price' => 8000, 'stock' => 150]);
        Item::create(['category_id' => $drinks->id, 'name' => 'Mineral Water', 'price' => 5000, 'stock' => 300]);

        // Items for snacks
        Item::create(['category_id' => $snacks->id, 'name' => 'Potato Chips', 'price' => 15000, 'stock' => 120]);
        Item::create(['category_id' => $snacks->id, 'name' => 'Chocolate Bar', 'price' => 20000, 'stock' => 90]);

        // Default admin user if not exists
        if(!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'name' => 'Admin Cashier',
                'email' => 'admin@example.com',
                'password' => Hash::make('password')
            ]);
        }
    }
}
