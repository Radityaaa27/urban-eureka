import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CartIndex({ auth }) {
    const [cart, setCart] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        total: 0,
        pay_total: 0,
        items: [],
    });

    useEffect(() => {
        try {
            const dataCart = JSON.parse(localStorage.getItem('pos_cart')) || [];
            setCart(dataCart);
        } catch {
            setCart([]);
        }
    }, []);

    const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

    useEffect(() => {
        setData('total', total);
        setData('pay_total', total);
        setData('items', cart);
    }, [cart, total]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Cart" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">My Cart</h1>
                    <Link href={route('cashier.index')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Back to POS</Link>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-slate-500">Cart kosong. Tambahkan produk dulu di halaman Cashier.</p>
                    ) : (
                        <>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-2 border-b">Product</th>
                                        <th className="py-2 border-b">Qty</th>
                                        <th className="py-2 border-b">Price</th>
                                        <th className="py-2 border-b">Subtotal</th>
                                        <th className="py-2 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2">{item.name}</td>
                                            <td className="py-2">{item.qty}</td>
                                            <td className="py-2">Rp {Number(item.price).toLocaleString()}</td>
                                            <td className="py-2">Rp {Number(item.subtotal).toLocaleString()}</td>
                                            <td className="py-2">
                                                <button
                                                    onClick={() => {
                                                        const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
                                                        setCart(newCart);
                                                        localStorage.setItem('pos_cart', JSON.stringify(newCart));
                                                    }}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="text-right font-bold text-xl">Total: Rp {Number(total).toLocaleString()}</div>

                            <div className="text-right mt-4 flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        if (cart.length === 0) return;
                                        if (!confirm('Batalkan pesanan saat ini?')) return;
                                        localStorage.removeItem('pos_cart');
                                        setCart([]);
                                        reset();
                                    }}
                                    className="px-5 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                >
                                    Cancel Order
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!cart.length) return;
                                        post(route('cart.checkout'), {
                                            onSuccess: () => {
                                                localStorage.removeItem('pos_cart');
                                                setCart([]);
                                                reset();
                                            },
                                        });
                                    }}
                                    disabled={processing || cart.length === 0}
                                    className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    Checkout
                                </button>
                            </div>

                            {errors.error && <p className="text-red-600 mt-2">{errors.error}</p>}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
