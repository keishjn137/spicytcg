import React, { useState, useEffect } from 'react';
import { product } from '../../assets/data/product';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, image: '', category: '' });

    useEffect(() => {

        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts) {
            setProducts(storedProducts);
        } else {
            setProducts(product);
        }
    }, []);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setNewProduct({ name: '', price: 0, image: '', category: '' });
        setShowModal(true);
    };

    const handleSaveProduct = () => {
        let updatedProducts;
        if (editingProduct) {

            updatedProducts = products.map((prod) =>
                prod.id === editingProduct.id ? newProduct : prod
            );
        } else {

            updatedProducts = [
                ...products,
                { id: products.length + 1, ...newProduct }
            ];
        }
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setShowModal(false);
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter((prod) => prod.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const handleEditProduct = (prod) => {
        setEditingProduct(prod);
        setNewProduct(prod);
        setShowModal(true);
    };

    return (

        <div className="bg-,container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddProduct}
            >
                Add Product
            </button>
            <div className="mt-4">
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-lg w-1/3">
                            <span className="cursor-pointer text-red-500 float-right" onClick={() => setShowModal(false)}>&times;</span>
                            <h2 className="text-xl font-semibold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                            <form>
                                <label className="block mb-2">
                                    Name:
                                    <input
                                        type="text"
                                        value={newProduct.name}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, name: e.target.value })
                                        }
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </label>
                                <label className="block mb-2">
                                    Price:
                                    <input
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, price: parseInt(e.target.value) })
                                        }
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </label>
                                <label className="block mb-2">
                                    Image URL:
                                    <input
                                        type="text"
                                        value={newProduct.image}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, image: e.target.value })
                                        }
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </label>
                                <label className="block mb-4">
                                    Category:
                                    <input
                                        type="text"
                                        value={newProduct.category}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, category: e.target.value })
                                        }
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={handleSaveProduct}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-slate-300">
                    {products.map((prod) => (
                        <div key={prod.id} className="bg-white rounded shadow p-4">
                            <img src={'/assets/' + prod.image} alt={prod.name} className="w-full h-80 object-cover mb-2 rounded" />
                            <h3 className="text-lg font-semibold">{prod.name}</h3>
                            <p>Price: {prod.price} VND</p>
                            <p>Category: {prod.category}</p>
                            <div className="mt-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    onClick={() => handleEditProduct(prod)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDeleteProduct(prod.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;