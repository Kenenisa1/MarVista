import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    
    setProducts: (products) => set({ products }),
    
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please provide all required fields." };
        }
        
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { success: false, message: data.message || 'Failed to create product' };
            }
            
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully!" };
        } catch (error) {
            console.error('Error creating product:', error);
            return { success: false, message: "Network error. Please try again." };
        }
    },
    
    fetchProducts: async () => {
        try {
            const res = await fetch('/api/products');
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            
            if (data.success) {
                set({ products: data.data });
            } else {
                set({ products: [] });
                console.error('API returned error:', data.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            set({ products: [] });
        }
    },
    
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: 'DELETE',
            });
            
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                return { success: false, message: data.message || 'Failed to delete product' };
            }
            
            set(state => ({ 
                products: state.products.filter(product => product._id !== pid) 
            }));
            
            return { success: true, message: data.message || 'Product deleted successfully' };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, message: "Network error. Please try again." };
        }
    }
}));