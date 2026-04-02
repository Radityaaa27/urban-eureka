import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TransactionsIndex({ auth, transactions }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Transaction History" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">History Transaksi</h1>
                    <Link href={route('cashier.index')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Back to POS</Link>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    {transactions.data.length === 0 ? (
                        <p className="text-slate-500">Belum ada transaksi.</p>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2 border-b">No</th>
                                    <th className="py-2 border-b">Tanggal</th>
                                    <th className="py-2 border-b">Kasir</th>
                                    <th className="py-2 border-b">Total</th>
                                    <th className="py-2 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.data.map((tx) => (
                                    <tr key={tx.id} className="border-b">
                                        <td className="py-2">{tx.id}</td>
                                        <td className="py-2">{new Date(tx.date).toLocaleString()}</td>
                                        <td className="py-2">{tx.user?.name ?? '-'}</td>
                                        <td className="py-2">Rp {Number(tx.total).toLocaleString()}</td>
                                        <td className="py-2">
                                            <Link href={route('transactions.show', tx.id)} className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">Struk</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                    {transactions.links?.map((link, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.preventDefault();
                                if (!link.url) return;
                                Inertia.visit(link.url);
                            }}
                            disabled={!link.url}
                            className={`px-3 py-1 rounded-lg border ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300'} disabled:cursor-not-allowed disabled:opacity-40`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </button>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
