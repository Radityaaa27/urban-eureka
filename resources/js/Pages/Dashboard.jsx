import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    FolderIcon,
    CubeIcon,
    DocumentTextIcon,
    CurrencyDollarIcon,
    CreditCardIcon,
    ArchiveBoxIcon,
    FolderOpenIcon,
    ClockIcon,
    BoltIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function Dashboard({ categoryCount, itemCount, transactionCount, totalSales }) {
    const user = usePage().props.auth.user;

    const stats = [
        {
            title: 'Total Categories',
            value: categoryCount,
            icon: <FolderIcon className="w-8 h-8 text-white" />,
            gradient: 'from-indigo-500 to-purple-600',
            link: route('categories.index'),
        },
        {
            title: 'Total Items',
            value: itemCount,
            icon: <CubeIcon className="w-8 h-8 text-white" />,
            gradient: 'from-emerald-400 to-teal-500',
            link: route('items.index'),
        },
        {
            title: 'Total Transactions',
            value: transactionCount,
            icon: <DocumentTextIcon className="w-8 h-8 text-white" />,
            gradient: 'from-rose-400 to-red-500',
            link: route('transactions.index'),
        },
        {
            title: 'Total Revenue',
            value: `Rp ${Number(totalSales).toLocaleString('id-ID')}`,
            icon: <CurrencyDollarIcon className="w-8 h-8 text-white" />,
            gradient: 'from-amber-400 to-orange-500',
            link: route('transactions.index'),
        },
    ];

    const quickLinks = [
        { name: 'Cashier POS', href: route('cashier.index'), icon: <CreditCardIcon className="w-6 h-6" />, bg: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200' },
        { name: 'Manage Items', href: route('items.index'), icon: <ArchiveBoxIcon className="w-6 h-6" />, bg: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200' },
        { name: 'Categories', href: route('categories.index'), icon: <FolderOpenIcon className="w-6 h-6" />, bg: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200' },
        { name: 'History', href: route('transactions.index'), icon: <ClockIcon className="w-6 h-6" />, bg: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800 tracking-tight">
                    Dashboard Overview
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2 flex items-center gap-2">
                                Welcome back, {user.name}! 
                                <SparklesIcon className="w-8 h-8 text-yellow-400" />
                            </h3>
                            <p className="text-gray-500 text-lg">
                                Here's what's happening with your store today.
                            </p>
                        </div>
                        <div className="hidden md:block absolute right-0 top-0 h-full opacity-5 pointer-events-none">
                             <SparklesIcon className="w-64 h-64 -mr-16 -mt-8" />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <Link
                                key={idx}
                                href={stat.link}
                                className={`group relative bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                            >
                                <div className="absolute right-0 top-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-8 -mt-8 transform group-hover:scale-150 transition-transform duration-500 ease-in-out"></div>
                                <div className="absolute left-0 bottom-0 w-16 h-16 bg-white opacity-10 rounded-full -ml-4 -mb-4"></div>
                                
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
                                        {stat.icon}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white/80 text-sm font-medium tracking-wide uppercase">{stat.title}</p>
                                        <p className="text-3xl font-bold text-white mt-1 drop-shadow-sm">{stat.value}</p>
                                    </div>
                                </div>
                                <div className="relative z-10 mt-4 flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                                    <span>View Details</span>
                                    <ArrowRightIcon className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Quick Access List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                <BoltIcon className="w-6 h-6 mr-2 text-indigo-500" />
                                Quick Actions
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Easily navigate to important sections of your POS system.</p>
                        </div>
                        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {quickLinks.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className={`flex items-center p-4 rounded-xl border ${link.bg} transition-colors duration-200 group`}
                                >
                                    <span className="mr-3 transform group-hover:scale-110 transition-transform">{link.icon}</span>
                                    <span className="font-semibold">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
