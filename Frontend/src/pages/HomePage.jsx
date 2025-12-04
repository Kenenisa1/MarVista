import { useProductStore } from "../Store/product";
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await fetchProducts();
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen The class `bg-gradient-to-b` can be written as `bg-linear-to-b` from-gray-50 to-white">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">Product Store</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Discover amazing products at unbeatable prices. Quality you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={loadProducts}
                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Refresh Products
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300">
                View Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-700">Loading Products</h3>
              <p className="text-gray-500">Please wait while we fetch amazing products for you...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-lg">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={loadProducts}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-600 mt-2">
                  Showing <span className="font-semibold text-indigo-600">{products.length}</span> amazing products
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                  <div className="text-sm text-gray-500">Total Products</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${Math.min(...products.map(p => p.price)).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">Lowest Price</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard 
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            {/* Load More Button (optional) */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                Load More Products
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
            <div className="mb-8">
              <div className="text-8xl mb-6 opacity-20">🛍️</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Products Found</h3>
              <p className="text-gray-600 text-lg max-w-md mb-8">
                It looks like our store is empty right now. Products will appear here once they're added.
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={loadProducts}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Refresh Store
              </button>
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                Add Product
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {!isLoading && products.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly adding new products to our collection. Sign up to be notified when we add new items!
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                Notify Me
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;