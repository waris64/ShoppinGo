import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { add } from '../store/cartSlice';
import { getProducts, getCategories, setFilter, clearFilter } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import Toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status, filter, categories } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (filter) {
      dispatch(getProducts(filter));
    } else {
      dispatch(getProducts());
    }
  }, [filter, dispatch]);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  if (status === StatusCode.LOADING) {
    return <BarLoader className='m-auto top-44' />;
  }

  if (status === StatusCode.ERROR) {
    return <label className='m-auto'>Error in fetching the data </label>;
  }

  return (
    <div className='flex flex-col xl:flex-row'>
      {/* <h1 className="text-center text-2xl font-bold my-6">Shop</h1> */}
      <Toaster />
      <div className='flex flex-col'>
      <div className="flex justify-center space-x-2  py-4 gap-y-44  ">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => dispatch(setFilter(category))}
            className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-2"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
        <button
          onClick={() => dispatch(clearFilter())}
          className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-4 py-2"
        >
          Clear Filter
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {products.map(product => (
          <div className="w-64 p-4 m-2 border border-gray-300 rounded" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                className="h-52 w-full object-cover mb-2"
                alt={product.title}
              />
              <h1 className="font-bold mt-2 text-lg">{product.title}</h1>
              <p className="text-lg font-semibold mt-2">Price: ${product.price}</p>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-2 text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-4 py-2"
              >
                Product Details
              </button>
            </Link>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Product;
