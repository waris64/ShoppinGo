import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
import { add } from '../store/cartSlice';
import Toast, { Toaster } from 'react-hot-toast';
import { Rating } from '@mui/material';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.data.find((product) => product.id === parseInt(id))
  );

  // console.log("SingleProduct:", product);
  const status = useSelector((state) => state.products.status);
  const addToCart = () => {
    dispatch(add(product));
    Toast.success("Added to cart");
  };

  useEffect(() => {
    if (!product) {
      dispatch(getProducts());
    }
  }, [dispatch, product]);

  if (status === StatusCode.LOADING) {
    return <div className='flex justify-center text-center items-center'>Loading...</div>;
  }

  if (status === StatusCode.ERROR) {
    return <>Error loading product details.</>;
  }

  if (!product) {
    return <div className='text-5xl'>No product found</div>;
  }

  return (
    <div className="flex items-center py-24">
      <Toaster />
      <img src={product.image} alt={product.title} className='size-96 cursor-pointer' />
      <section className='flex-col w-3/5 pl-16'>
        <h1 className='font-semibold text-4xl pb-5 '>{product.title}

          &nbsp;
        </h1>
        <p className='pb-2'>{product.description}</p>
          <Rating name="read-only" value={5} readOnly />
        <p className='font-semibold text-xl '>Price: ${product.price}</p>
        <section className='flex '>
          <button
            type="button"
            onClick={addToCart}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
          >
            Buy Now
          </button>
        </section>
      </section>
    </div>
  );
};

export default SingleProduct;
