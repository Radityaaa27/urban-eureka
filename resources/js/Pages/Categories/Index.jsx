import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Index({ auth, categories }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('categories.update', editing.id), {
                onSuccess: () => { setEditing(null); reset(); },
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (category) => {
        setEditing(category);
        setData('name', category.name);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('categories.destroy', id));
        }
    };

    const cancelEdit = () => {
        setEditing(null);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories Dashboard</h2>}
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Form Card */}
                    <div className="bg-white p-6 shadow sm:rounded-lg border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {editing ? 'Edit Category' : 'Add New Category'}
                        </h3>
                        <form onSubmit={submit} className="flex gap-4 items-start">
                            <div className="flex-1">
                                <InputLabel htmlFor="name" value="Category Name" />
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
                            <div className="mt-6 flex gap-2">
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
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items Count</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{category.items_count} items</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-900 mr-4 transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {categories.length === 0 && (
                            <div className="p-12 text-center text-gray-500 italic">No categories found. Start by adding one above.</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
