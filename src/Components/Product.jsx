import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts, getCategories, setFilter, clearFilter } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import Toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';


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
    return (
      <div className="flex flex-wrap justify-center">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="w-64 p-4 m-2 border border-gray-300 rounded">
            <Skeleton variant="rectangular" width="100%" height={210} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rectangular" width="80%" height={36} />
          </div>
        ))}
      </div>
    );
  }

  if (status === StatusCode.ERROR) {
    return <label className='m-auto'>Error in fetching the data </label>;
  }

  return (
    <div className='flex flex-col '>
      <Toaster />
      <div className='flex flex-col'>
        <div className="flex justify-center flex-col md:flex-row md:gap-x-3 px-10  py-4 md:py-4 md:gap-y-4 gap-y-4">
          {categories.map(category => (
            <Button
              size='small'
              variant='contained'
              key={category}
              onClick={() => dispatch(setFilter(category))}
              >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
          <Button
            variant='contained'
            onClick={() => dispatch(clearFilter())}
            className="text-white  bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-4 py-2"
          >
            Clear Filter
          </Button>
        </div>

        <div className="flex flex-wrap justify-center  gap-x-8 gap-y-8 ">
          {products.map(product => (
            <div className="w-64 p-4   transform transition-transform    border border-gray-300 rounded hover:scale-105 duration-500 hover:shadow-lg hover:shadow-slate-500" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  className="h-52 w-full object-constai mb-2 overflow-hidden hover:scale-105 transition-all duration-700  border"
                  alt={product.title}
                />  
                <h1 className="font-bold mt-2 text-lg">{product.title}</h1>
                <p className="text-lg font-semibold mt-2">Price: ${product.price}</p>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="text-white bg-gray-800  shadow-red-900	 hover:bg-gray-900 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
                  >
                    View Details
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
