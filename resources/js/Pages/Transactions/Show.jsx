import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TransactionsShow({ auth, transaction }) {
    const total = Number(transaction.total);
    const payTotal = Number(transaction.pay_total);
    const change = payTotal - total;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Struk Transaksi" />

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Struk Pembelian</h1>
                    <Link href={route('transactions.index')} className="px-3 py-1 bg-slate-200 rounded-lg">History</Link>
                </div>

                <div className="mb-4">
                    <p>No. Transaksi: <span className="font-bold">{transaction.id}</span></p>
                    <p>Tanggal: <span className="font-bold">{new Date(transaction.date).toLocaleString()}</span></p>
                    <p>Kasir: <span className="font-bold">{transaction.user?.name ?? '-'}</span></p>
                </div>

                <table className="w-full text-left border-collapse mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 border-b">Produk</th>
                            <th className="py-2 border-b">Qty</th>
                            <th className="py-2 border-b">Harga</th>
                            <th className="py-2 border-b">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction.details.map((detail) => (
                            <tr key={detail.id} className="border-b">
                                <td className="py-2">{detail.item?.name}</td>
                                <td className="py-2">{detail.qty}</td>
                                <td className="py-2">Rp {Number(detail.item?.price ?? 0).toLocaleString()}</td>
                                <td className="py-2">Rp {Number(detail.subtotal).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right font-bold text-xl">
                    <div>Total: Rp {total.toLocaleString()}</div>
                    <div>Dibayar: Rp {payTotal.toLocaleString()}</div>
                    <div>Kembali: Rp {change.toLocaleString()}</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
