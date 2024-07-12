import React from 'react';
import { Link } from 'react-router-dom';

const AllProductsPage = ({ products }) => {
  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-800 transform transition hover:scale-105 hover:bg-gray-700 hover:text-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-4">{product.productName}</h2>
            <p className="mb-2"><strong>Company:</strong> {product.company}</p>
            <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
            <p className="mb-2"><strong>Rating:</strong> {product.rating}</p>
            <p className="mb-2"><strong>Discount:</strong> {product.discount}%</p>
            <p className="mb-4"><strong>Availability:</strong> {product.availability}</p>
            <Link
              to={`/product/${product.id}`}
              className="block w-full text-center py-2 border border-blue-500 rounded-lg text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transform transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
