// HomePage.jsx
import { useProductStore } from "../Store/product";
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { FaFilter, FaSort } from "react-icons/fa";

const HomePage = () => {
  const { fetchProducts, products, filteredProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchProducts]);

  // Get products to display - use filteredProducts if search is active
  const displayProducts = (filteredProducts && filteredProducts.length >= 0) 
    ? filteredProducts 
    : products;

  // Sort products based on selected option
  const getSortedProducts = () => {
    const productsToSort = [...displayProducts];
    
    switch (sortBy) {
      case 'price-low':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsToSort.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return productsToSort.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
      default:
        return productsToSort;
    }
  };

  const sortedProducts = getSortedProducts();
  const productCount = sortedProducts.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
              Find exactly what you're looking for in our curated collection
            </p>
          </div>
          
          {/* Main Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <SearchBar />
          </div>
          
          {/* Search Stats */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-6 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <div className="text-center">
                <div className="text-2xl font-bold">{productCount}</div>
                <div className="text-sm text-indigo-100">Products</div>
              </div>
              <div className="h-8 w-px bg-indigo-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  ${Math.min(...sortedProducts.map(p => p.price || 0)).toFixed(2) || '0.00'}
                </div>
                <div className="text-sm text-indigo-100">Lowest Price</div>
              </div>
              <div className="h-8 w-px bg-indigo-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  ${Math.max(...sortedProducts.map(p => p.price || 0)).toFixed(2) || '0.00'}
                </div>
                <div className="text-sm text-indigo-100">Highest Price</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters and Sort Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600">
              Showing <span className="font-semibold text-indigo-600">{productCount}</span> amazing products
            </p>
          </div>
          
          {/* Sort and Filter Controls */}
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <FaSort className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="md:hidden bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {/* Add filter options here if needed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
          </div>
        ) : productCount > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
            
            {/* Load More Section (Optional) */}
            {/* <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                Load More Products
              </button>
            </div> */}
          </>
        ) : (
          /* Empty/No Results State */
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="text-6xl mb-4 opacity-20">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {products.length === 0 
                  ? "Our store is currently empty. Check back soon for amazing products!"
                  : "We couldn't find any products matching your search. Try different keywords."
                }
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Try searching for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {products.slice(0, 3).map(p => (
                  <button
                    key={p._id}
                    onClick={() => useProductStore.getState().searchProducts(p.name.split(' ')[0])}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-sm"
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && productCount > 0 && (
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-6">
                Sign up to get notified when we add new products to our collection!
              </p>
              <div className="max-w-md mx-auto flex gap-3">
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
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;