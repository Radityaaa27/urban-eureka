import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState, useMemo, useEffect } from 'react';

export default function CashierIndex({ auth, items, categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('pos_cart')) || [];
        } catch {
            return [];
        }
    });
    const [cartCount, setCartCount] = useState(0);
    const [itemQty, setItemQty] = useState({});
    
    // Total calculation
    const total = useMemo(() => cart.reduce((acc, item) => acc + item.subtotal, 0), [cart]);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        total: 0,
        pay_total: '',
        items: []
    });

    // Sync state to Inertia form
    useMemo(() => {
        setData('total', total);
        setData('items', cart);
    }, [cart, total]);

    useEffect(() => {
        localStorage.setItem('pos_cart', JSON.stringify(cart));
        setCartCount(cart.reduce((acc, item) => acc + item.qty, 0));
    }, [cart]);

    const filteredItems = selectedCategory 
        ? items.filter(i => i.category_id === selectedCategory) 
        : items;

    const addToCart = (item, quantity = 1) => {
        const qty = Math.max(1, Math.min(Number(quantity) || 1, item.stock));
        if (qty <= 0 || item.stock <= 0) return;

        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                const newQty = Math.min(existing.qty + qty, item.stock);
                return prev.map(i => i.id === item.id ? { ...i, qty: newQty, subtotal: newQty * i.price } : i);
            }
            return [...prev, { id: item.id, name: item.name, price: item.price, qty, subtotal: qty * item.price, maxStock: item.stock }];
        });

        setItemQty(prev => ({ ...prev, [item.id]: 1 }));
    };

    const increaseQty = (id) => {
        setCart(prev => prev.map(i => {
            if (i.id === id && i.qty < i.maxStock) {
                return { ...i, qty: i.qty + 1, subtotal: (i.qty + 1) * i.price };
            }
            return i;
        }));
    };

    const decreaseQty = (id) => {
        setCart(prev => prev.map(i => {
            if (i.id === id && i.qty > 1) {
                return { ...i, qty: i.qty - 1, subtotal: (i.qty - 1) * i.price };
            }
            return i;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert('Cart is empty!');
        clearErrors();
        post(route('cashier.store'), {
            onSuccess: () => {
                setCart([]);
                reset();
                alert('Checkout successful! Change given properly.');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Cashier POS" />

            <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-slate-50 font-sans">
                {/* Left Side: Products Grid */}
                <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                    <div className="space-y-8">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Products</h2>
                        <Link href={route('cart.index')} className="relative inline-flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 2.25h1.5l1.485 9.14a2.25 2.25 0 002.237 1.985h10.777a2.25 2.25 0 002.236-1.834l1.24-6.197a.75.75 0 00-.74-.902H5.21" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.25 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            <span>Cart</span>
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[0.65rem] font-bold">{cartCount}</span>}
                        </Link>
                    </div>

                    {/* Categories Filter */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <button 
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all ${selectedCategory === null ? 'bg-blue-600 text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            All Items
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all ${selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-24">
                        {filteredItems.map(item => (
                            <div 
                                key={item.id} 
                                className={`bg-white rounded-3xl p-5 border border-slate-100 shadow-sm transition-all duration-300 ${item.stock > 0 ? 'group' : 'opacity-40 grayscale'}`}
                            >
                                <div className="h-32 mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-[1.03] overflow-hidden">
                                    {item.image ? (
                                        <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl drop-shadow-sm">🥪</span>
                                    )}
                                </div>
                                <h4 className="font-bold text-slate-800 truncate text-lg">{item.name}</h4>
                                <div className="flex justify-between items-end mt-2">
                                    <p className="font-extrabold text-blue-600">Rp {Number(item.price).toLocaleString()}</p>
                                    <p className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-1 rounded-md">{item.stock > 0 ? `${item.stock} left` : 'Out of stock'}</p>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max={item.stock}
                                        value={itemQty[item.id] || 1}
                                        onChange={e => setItemQty(prev => ({ ...prev, [item.id]: Math.max(1, Math.min(item.stock, Number(e.target.value) || 1)) }))}
                                        className="w-20 py-2 px-3 border border-slate-300 rounded-lg text-center"
                                        disabled={item.stock <= 0}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addToCart(item, itemQty[item.id] || 1)}
                                        disabled={item.stock <= 0}
                                        className="flex-1 rounded-lg py-2 px-3 text-white font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredItems.length === 0 && (
                            <div className="col-span-full py-12 text-center text-slate-500 font-medium">No products found in this category.</div>
                        )}
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-8">
                        <h3 className="text-xl font-bold text-slate-800">Filter Options</h3>
                        <p className="text-sm text-slate-500 mt-2">Tambah filter produk di bawah ini sesuai kebutuhan (kategori, harga, stok).</p>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => setSelectedCategory(null)} className="border border-slate-300 rounded-lg py-2 px-3 text-sm font-semibold hover:bg-slate-100">All Items</button>
                            {categories.map(cat => (
                                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className="border border-slate-300 rounded-lg py-2 px-3 text-sm font-semibold hover:bg-slate-100">{cat.name}</button>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
