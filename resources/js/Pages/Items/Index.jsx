import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Index({ auth, items, categories }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, delete: destroy, processing, reset, errors, setError, clearErrors } = useForm({
        category_id: categories.length > 0 ? categories[0].id : '',
        name: '',
        price: '',
        stock: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (editing) {
            // Use FormData for PUT request with file upload
            const formData = new FormData();
            formData.append('category_id', data.category_id);
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('stock', data.stock);
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }
            formData.append('_method', 'PUT');

            fetch(route('items.update', editing.id), {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.errors) {
                    Object.keys(response.errors).forEach(key => {
                        setError(key, response.errors[key][0]);
                    });
                } else {
                    setEditing(null);
                    reset();
                    router.visit(route('items.index'));
                }
            })
            .catch(err => console.error('Error:', err));
        } else {
            post(route('items.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (item) => {
        setEditing(item);
        setData({
            category_id: item.category_id,
            name: item.name,
            price: item.price,
            stock: item.stock,
            image: null,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            destroy(route('items.destroy', id));
        }
    };

    const cancelEdit = () => {
        setEditing(null);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Items Dashboard</h2>}
        >
            <Head title="Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Form Card */}
                    <div className="bg-white p-6 shadow sm:rounded-lg border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {editing ? 'Edit Item' : 'Add New Item'}
                        </h3>
                        <form onSubmit={submit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div>
                                <InputLabel htmlFor="category_id" value="Category" />
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                                    required
                                >
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="name" value="Item Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="price" value="Price (Rp)" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full"
                                    required min="0"
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="stock" value="Stock Qty" />
                                <TextInput
                                    id="stock"
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) => setData('stock', e.target.value)}
                                    className="mt-1 block w-full"
                                    required min="0"
                                />
                                <InputError message={errors.stock} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="image" value="Image" />
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="md:col-span-5 mt-2 flex gap-2 justify-end">
                                <PrimaryButton disabled={processing} className="px-6">
                                    {editing ? 'Update' : 'Save'}
                                </PrimaryButton>
                                {editing && (
                                    <button type="button" onClick={cancelEdit} className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold text-sm">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {item.image ? (
                                                <img src={`/storage/${item.image}`} alt={item.name} className="h-10 w-10 object-cover rounded" />
                                            ) : (
                                                <span className="text-gray-400">No image</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp {Number(item.price).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {item.stock} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-4 transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {items.length === 0 && (
                            <div className="p-12 text-center text-gray-500 italic">No items found. Make sure you have a category first.</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
