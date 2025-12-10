import { useProductStore } from "../Store/product";
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { FaSort, FaSearch } from "react-icons/fa";
import { styles } from '../styles';

const Products = () => {
  const { fetchProducts, products, filteredProducts, searchProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProducts(value);
  };

  // Get products to display
  const displayProducts = filteredProducts || products;

  // Sort products
  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  const productCount = sortedProducts.length;

  return (
    <div className={`${styles.bgGradientPrimary} min-h-screen`}>
      <div className={styles.container}>
        <div className={`${styles.sectionPadding}`}>
          
          {/* Hero Header */}
          <div className="text-center mb-12">
            <h1 className={`${styles.h1} mb-4`}>
              Discover <span className={styles.gradientText}>Amazing</span> Products
            </h1>
            <p className={`${styles.subtitle} max-w-2xl mx-auto`}>
              Browse our curated collection of premium products
            </p>
          </div>

          {/* Search and Controls */}
          <div className={`${styles.card} ${styles.cardPadding} mb-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className={`${styles.iconMd} text-gray-400`} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className={`${styles.input} pl-10`}
                  placeholder="Search products by name or price..."
                />
              </div>

              {/* Stats and Sort */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <span className={`${styles.badge} ${styles.badgePrimary}`}>
                    {productCount} {productCount === 1 ? 'Item' : 'Items'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <FaSort className={`${styles.iconSm} text-gray-500`} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.select}
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

          {/* Loading State */}
          {loading ? (
            <div className={`${styles.flexCenter} min-h-[400px]`}>
              <div className={`${styles.spinner} h-12 w-12`}></div>
            </div>
          ) : productCount > 0 ? (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product._id} className={styles.hoverLift}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Results Summary */}
              <div className={`${styles.flexCenter} mt-12 pt-8 border-t border-gray-200`}>
                <p className={styles.body}>
                  Showing <span className="font-semibold text-indigo-600">{productCount}</span> of{' '}
                  <span className="font-semibold text-gray-900">{products.length}</span> total products
                </p>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className={`${styles.card} ${styles.flexCenter} flex-col py-16`}>
              <div className="text-7xl mb-6 text-gray-300">📦</div>
              <h3 className={`${styles.h3} mb-3`}>
                {searchTerm ? 'No Matching Products Found' : 'Store is Empty'}
              </h3>
              <p className={`${styles.body} text-center max-w-md mb-6`}>
                {searchTerm 
                  ? "We couldn't find any products matching your search. Try different keywords."
                  : "Check back soon! We're adding amazing products to our collection."
                }
              </p>
              
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    searchProducts('');
                  }}
                  className={styles.secondaryButton}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Featured Banner */}
          {!loading && productCount > 0 && (
            <div className={`mt-16 p-6 rounded-2xl ${styles.bgGradientHero} text-white`}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Enjoying our products?</h3>
                  <p className="opacity-90">Sign up to get exclusive deals and updates!</p>
                </div>
                <button className={`${styles.primaryButton} bg-white text-indigo-600 hover:bg-gray-100`}>
                  Join Newsletter
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Products;