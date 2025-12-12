import { useProductStore } from "../Store/product";
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { styles } from '../styles';
import { FaSort } from "react-icons/fa";

const HomePage = () => {
  const { fetchProducts, products, filteredProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

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
  const lowestPrice = sortedProducts.length > 0 
    ? Math.min(...sortedProducts.map(p => p.price || 0)).toFixed(2)
    : '0.00';
  const highestPrice = sortedProducts.length > 0 
    ? Math.max(...sortedProducts.map(p => p.price || 0)).toFixed(2)
    : '0.00';

  return (
    <div className={`min-h-screen ${styles.bgGradientPrimary}`}>
      
      {/* Hero Section */}
      <div className={styles.bgGradientHero}>
        <div className={`${styles.container} py-12 md:py-16 text-white`}>
          <div className="text-center mb-8">
            <h1 className={`${styles.h1} mb-6`}>
              Discover <span className="text-white">Amazing</span> Products
            </h1>
            <p className={`${styles.subtitle} text-white/90 max-w-2xl mx-auto`}>
              Find exactly what you're looking for in our curated collection
            </p>
          </div>

          {/* Stats Section */}
          <div className={`${styles.flexCenter} mb-8`}>
            <div className={`${styles.flexCenter} space-x-6 bg-white/20 backdrop-blur-sm ${styles.roundedFull} px-6 py-3`}>
              <div className="text-center">
                <div className="text-2xl font-bold">{productCount}</div>
                <div className="text-sm text-white/90">Products</div>
              </div>
              <div className="h-8 w-px bg-white/40"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">${lowestPrice}</div>
                <div className="text-sm text-white/90">From</div>
              </div>
              <div className="h-8 w-px bg-white/40"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">${highestPrice}</div>
                <div className="text-sm text-white/90">To</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={`${styles.sectionPadding}`}>
          
          {/* Header with Controls */}
          <div className={`${styles.card} ${styles.cardPadding} mb-8`}>
            <div className={`${styles.flexBetween}`}>
              <div>
                <h2 className={styles.h2}>Featured Products</h2>
                <p className={styles.subtitle}>
                  Showing <span className="font-semibold text-indigo-600">{productCount}</span> amazing products
                </p>
              </div>
              
              {/* Sort Dropdown */}
              <div className={`${styles.flexStart} space-x-2`}>
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

          {/* Loading State */}
          {loading ? (
            <div className={`${styles.flexCenter} min-h-[400px]`}>
              <div className={`${styles.spinner} h-12 w-12`}></div>
              <p className={`${styles.body} ml-4 text-gray-600`}>Loading products...</p>
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
                <div className={`${styles.flexCenter} space-x-4`}>
                  <span className={`${styles.badge} ${styles.badgePrimary}`}>
                    {productCount} Items
                  </span>
                  <p className={styles.body}>
                    Price range: <span className="font-semibold">${lowestPrice} - ${highestPrice}</span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className={`${styles.card} ${styles.cardElevated} ${styles.flexCenter} flex-col py-16`}>
              <div className="text-7xl mb-6 text-gray-300">📦</div>
              <h3 className={`${styles.h3} mb-3`}>
                {products.length === 0 ? 'Store is Empty' : 'No Products Found'}
              </h3>
              <p className={`${styles.body} text-center max-w-md mb-6`}>
                {products.length === 0 
                  ? "Our store is currently empty. Check back soon for amazing products!"
                  : "We couldn't find any products matching your search. Try different keywords."
                }
              </p>
              
              {products.length > 0 && (
                <div className="mt-6">
                  <p className={`${styles.small} mb-3`}>Try searching for:</p>
                  <div className={`${styles.flexCenter} flex-wrap gap-2`}>
                    {products.slice(0, 3).map(p => (
                      <button
                        key={p._id}
                        onClick={() => useProductStore.getState().searchProducts(p.name.split(' ')[0])}
                        className={`${styles.badge} ${styles.badgePrimary} hover:opacity-90 ${styles.transition} cursor-pointer`}
                      >
                        {p.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Featured Banner */}
          {!loading && productCount > 0 && (
            <div className={`mt-16 p-8 ${styles.rounded2xl} ${styles.bgGradientHero} text-white`}>
              <div className={`${styles.flexBetween} flex-col md:flex-row items-center`}>
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
                  <p className="opacity-90">Sign up to get notified about new arrivals!</p>
                </div>
                <button className={styles.primaryButton}>
                  Get Notified
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default HomePage;