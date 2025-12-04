import { styles } from '../styles';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../Store/product';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const formattedPrice = product.price 
    ? `$${parseFloat(product.price).toFixed(2)}`
    : '$0.00';

  const {deleteProduct} = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const {success, message} = await deleteProduct(pid);

    if(!success) { toast.error(message)}
    else { toast.success(message)}
  }
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      
      {/* Product Image Container */}
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        <img
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
           
        />
      </div>

      {/* Product Information Section */}
      <div className="p-5">
        
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h2>
        
        {/* Product Price */}
        <p className="text-2xl font-bold text-gray-900 mb-6">
          {formattedPrice}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          
          {/* Edit Button */}
          <button className={`
            ${styles.secondaryButton}
            flex items-center space-x-1
            text-gray-600 hover:text-indigo-600
            border border-gray-300 hover:border-indigo-400
          `}>
            <FaRegEdit className={styles.iconSize} />
            <span className="text-sm font-medium">Edit</span>
          </button>

          {/* Delete Button */}
          <button className={`
            ${styles.primaryButton}
            flex items-center space-x-1
            bg-red-600 hover:bg-red-700
            text-white
          `}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDelete className={styles.iconSize} />
            <span className="text-sm font-medium">Delete</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;